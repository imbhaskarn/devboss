import * as dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();
import { NextFunction, Request, Response } from 'express';
import prisma from '../.prisma';
import ejs from 'ejs';
import path from 'path';
import {
  checkIfEmailExists,
  checkIfUsernameExists,
  createUser,
} from '../services/user/';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Handlebars from 'handlebars';
import redis from '../redis';
import sendMail from '../utils/mailing';

export const userSignUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the provided email already exists
    const userWithEmail = await checkIfEmailExists(email);
    if (userWithEmail) {
      return res.status(409).json({
        result: 'error',
        message: 'Email is already registered.',
      });
    }

    // Check if a user with the provided username already exists
    const userWithUsername = await checkIfUsernameExists(username);
    if (userWithUsername) {
      return res.status(409).json({
        result: 'error',
        message: 'Username is already in use.',
      });
    }

    // Hash the provided password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the hashed password
    const newUser = await createUser(email, username, hashedPassword);
    const accessToken = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
      process.env.SECRET as string,
      {
        expiresIn: '1d', //
      }
    );
    const verificationToken = crypto.randomBytes(64).toString('hex');
    if (newUser) {
      const templatePath = path.join(
        __dirname,
        '../templates/email-verification.ejs'
      );
      const html = await ejs.renderFile(templatePath, {
        name: newUser.username,
        url: `http://localhost:5000/api/v1/auth/verify-email?token=${verificationToken}&email=${newUser.email}`,
      });

      //send email
      redis.setex(newUser.email, 60 * 60, accessToken);

      sendMail(newUser.email, 'Verify your email', html);

      return res.status(201).json({
        result: 'success',
        message: 'Check your email to verify your account.',
        data: {
          accessToken,
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
    next(e);
  }
};

export const userSignInController = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }, // Note: This is not recommended for security reasons
        ],
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
    //generate jwt access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      process.env.SECRET as string,
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
        user: {
          id: user.id,
          email: user.email,
          username: user.username,

          // Other user fields you want to include
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

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const { token, email }: any = req.query;
    const accessToken = await redis.get(email);
    console.log(accessToken, 'token');
    if (token === accessToken) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      console.log({ user });
      if (user) {
        const updatedUser = await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            isVerified: true,
          },
        });
        console.log(updatedUser, 'updatedUser');
        return res.status(200).json({
          result: 'success',
          message: 'Email verified successfully.',
          data: {
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
              isVerified: user.isVerified,
            },
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
