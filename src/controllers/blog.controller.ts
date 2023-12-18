import * as dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Request, Response } from 'express';
import prisma from '../.prisma';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { user } from 'typings/custom';
interface ExtendedRequest extends Request {
  user: user;
}

export const createArticleController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = req.user.id;
    const { title, meta, description, status, content } = req.body;
    const post = await prisma.article.create({
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
    return res.status(201).send({ result: 'success', data: post });
  } catch (error) {
    next(error);
  }
};

export const getArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = parseInt(req.params.id);
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        comments: true,
        author: true,
      },
    });
    console.log(article);
    return res.status(200).send({
      result: 'success',
      data: article,
    });
  } catch (e) {
    next(e);
  }
};

export const updateBlogController = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    return res.status(201).json({
      result: 'success',
      message: 'article updated successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};
