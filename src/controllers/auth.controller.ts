import * as dotenv from 'dotenv';
import crypto from 'crypto';
import { User } from '@prisma/client';
dotenv.config();
import { NextFunction, Request, Response } from 'express';
import prisma from '../.prisma';
import ejs from 'ejs';
import path from 'path';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redis from '../redis';
import sendMail from '../utils/mailing';
import { user } from 'typings/custom';
import { generateFromEmail } from 'unique-username-generator';
interface ExtendedRequest extends Request {
  user: user;
}

export const userSignUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const findExistingUserWithEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (findExistingUserWithEmail) {
      return res.status(409).json({
        result: 'error',
        message: 'Email is already registered.',
      });
    }

    const username = generateFromEmail(email, 3);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    const refreshToken = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    const accessToken = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 60, //
      }
    );
    const verificationToken = crypto.randomBytes(64).toString('hex');
    if (newUser) {
      const templatePath = path.join(
        __dirname,
        '../templates/email-verification.ejs'
      );
      console.log(templatePath, 'templatePath');
      const html = await ejs.renderFile(templatePath, {
        name: newUser.username,
        url: `${process.env.API_URL}/api/v1/auth/verify-email?token=${verificationToken}&email=${newUser.email}`,
      });

      redis.setex(newUser.email, 60 * 60 * 24 * 7, accessToken);
      redis.setex(`vt${newUser.email}`, 60 * 10, verificationToken);
      sendMail(newUser.email, 'Verify your email', html);
      return res.status(201).json({
        result: 'success',
        message: 'Check your email to verify your account.',
        data: {
          accessToken,
          refreshToken,
          user: {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            isVerified: newUser.isVerified,
          },
        },
      });
    }
  } catch (e) {
    console.log(e)
    console.log('Error:\n', e instanceof Error);
    // next(e);
  }
};

export const userSignInController = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findFirst({
      where: {
        username: email,
      },
    });

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials.',
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match
    if (!passwordMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials.',
      });
    }
    //generate jwt refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    //generate jwt access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d', //
      }
    );
    // Successful login

    return res.status(200).json({
      status: 'success',
      message: 'Login successfull.',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          profileImage: user.profileImage,
          bio: user.bio,
          location: user.location,
          website: user.website,
          phoneNumber: user.phoneNumber,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

export const verifyEmailController = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    const { token, email }: any = req.query;
    if (!token || !email) {
      return res.status(404).json({
        result: 'failed',
        message: 'Email not found',
      });
    }
    const verificationToken = await redis.get(`vt${email}`);
    if (verificationToken != token) {
      return res.status(400).json({
        result: 'failed',
        message: 'Invalid or expired veritication link',
      });
    }
    const verifiedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        isVerified: true,
      },
    });
    console.log(verifiedUser);
    return res.status(201).json({
      result: 'success',
      message: 'email verified successfully',
    });
  } catch (e) {
    console.log(e);
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(403).json({
        result: 'error',
        message: 'Access denied, token missing!',
      });
    }
    const { id } = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as any;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(403).json({
        result: 'error',
        message: 'User not found',
      });
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '15min', //
      }
    );
    console.log(accessToken, 'accessToken');
    redis.setex(user.email, 60 * 60, accessToken);
    return res.status(200).json({
      result: 'success',
      message: 'Token refreshed successfully.',
      data: {
        accessToken,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const fpToken = crypto.randomBytes(64).toString('hex');

    if (!email) {
      return res.status(400).json({
        result: 'error',
        message: 'User not found.',
      });
    }

    redis.setex(`${email} + fp` as string, 60 * 60, fpToken);
    const passwordResetLink = `${process.env.API_URL}/api/v1/auth/verify-forgot-password?token=${fpToken}&email=${email}`;
    const templatePath = path.join(
      __dirname,
      '../templates/forgot-password.ejs'
    );
    const html = await ejs.renderFile(templatePath, {
      name: email,
      url: passwordResetLink,
    });
    sendMail(email, 'Password reset link', html);
    return res.status(200).json({
      result: 'success',
      message: 'Password reset link sent successfully.',
      data: {},
    });
  } catch (e) {
    console.log(e);
  }
};

export const forgotPasswordVerify = async (req: Request, res: Response) => {
  try {
    const { token, email } = req.query as { token?: string; email?: string };
    if (!token || !email) {
      return res.status(400).json({
        result: 'error',
        message: 'Invalid token or email',
      });
    }
    const fpToken = await redis.get(`${email} + fp` as string);
    if (token === fpToken) {
      const user = prisma.user.findUnique({
        where: {
          email: email,
        },
      }) as unknown as User;
      console.log(fpToken, 'fpToken');
      const accessToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '15min', //
        }
      );

      return res.status(200).json({
        result: 'success',
        message: 'Password reset link sent successfully.',
        data: { accessToken },
      });
    }
  } catch (e) {
    console.log(e);
  }
};
