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



export const checkIfEmailExists = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
};

export const checkIfUsernameExists = async (username: string) => {
    return prisma.user.findFirst({
        where: {
            username: username,
        },
    });
};



export const GetUser = async (username: string) => {
    return await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            profileImage: true,
            bio: true,
            location: true,
            website: true,
            phoneNumber: true,
            createdAt: true,
            updatedAt: true,
            lastLogin: true,
        },
    });
};
