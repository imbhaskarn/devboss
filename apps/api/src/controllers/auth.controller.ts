import { Request, Response } from 'express';
import prisma from '../prisma';
import {
    checkIfUserWithEmailExists,
    checkIfUserWithUsernameExists,
} from '../services/user/userExists';
import bcrypt from 'bcrypt';
import { createUser } from '../services/user/createUser';

export const userSignUpController = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Check if a user with the provided email already exists
    const userWithEmail = await checkIfUserWithEmailExists(email);
    if (userWithEmail) {
        return res.status(409).json({
            result: 'error',
            message: 'Email is already registered.',
        });
    }

    // Check if a user with the provided username already exists
    const userWithUsername = await checkIfUserWithUsernameExists(username);
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
    if (newUser) {
        return res.json({
            result: 'success',
            message: 'User created successfully!',
        });
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

        // Successful login
        return res.status(200).json({
            status: 'success',
            message: 'Login successfull.',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
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
