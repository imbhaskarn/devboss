import * as dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Request, Response } from 'express';
import prisma from '../.prisma';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).json({
        result: 'error',
        message: 'user not found',
        data: {},
      });
    }
    return res.status(200).json({
      result: 'success',
      data: {
        user,
      },
    });
  } catch (e) {
    next(e);
  }
};
export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(404).json({
        result: 'error',
        message: 'user not found',
        data: {},
      });
    }
    return res.status(200).json({
      result: 'success',
      data: {
        user,
      },
    });
  } catch (e) {
    next(e);
  }
};
