import { Request, Response } from 'express';
import prisma from '../prisma';
import { checkIfUserExists } from '../services/user/userExists';
import bcrypt from 'bcrypt';
import { createUser } from '../services/user/createUser';

export const userSignUpController = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log(username, email, password )
    if (!username || !email || !password) {
      return res.status(409).json({
        result: 'error',
        message: 'Username, Email and Password are required fields!',
    });
    }
    const existingUser = await checkIfUserExists(username, email);

    if (existingUser)
        return res.status(409).json({
            status: 'error',
            message: 'Username or Email already registered.',
        });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, username, hashedPassword);
    if (newUser)
        return res.json({
            result: 'success',
            message: 'user created succefully!',
        });
};

export const userSignInController = (req: Request, res: Response) => {};
