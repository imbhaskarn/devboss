import { Request, Response } from 'express';
import prisma from '../prisma';

export const userSignUpController = (req: Request, res: Response) => {
    const { username, email, password } = req.body;
};

export const userSignInController = (req: Request, res: Response) => {};
