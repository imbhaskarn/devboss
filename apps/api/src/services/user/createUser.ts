import { date } from 'joi';
import prisma from '../../prisma';

export const createUser = async (
    email: string,
    username: string,
    hashedPassword: string
) => {
    try {
        return await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('An error occurred while creating the user.');
    }
};
