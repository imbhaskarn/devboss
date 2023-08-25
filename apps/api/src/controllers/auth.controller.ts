import { Request, Response } from 'express';
import prisma from '../prisma';

export const userSignUpController = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
            { username: password },
          ],
        },
      });

    if (user)
        return res.status(409).json({
            status: 'error',
            message: 'Email already registered.',
        });
        
};

export const userSignInController = (req: Request, res: Response) => {};
