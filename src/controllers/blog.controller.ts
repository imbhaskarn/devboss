import * as dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Request, Response } from 'express';
import prisma from '../.prisma';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { user } from '@types';

interface ExtendedRequest extends Request {
  user: user
}

export const createPostController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = req.user.id;
    const { title, meta, description, status, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        meta,
        description,
        status,
        content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.send({ result: 'success', data: post });
  } catch (error) {
    next(error);
  }
};

export const getBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    return res.status(200).send({
      result: 'success',
      data: post,
    });
  } catch (e) {
    next(e);
  }
};

export const updateBlogController = async (req: Request, res: Response) => {
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
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
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
