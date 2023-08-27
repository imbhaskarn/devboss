import prisma from '../../prisma';

export const checkIfUserWithEmailExists = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
};

export const checkIfUserWithUsernameExists = async (username: string) => {
    return await prisma.user.findFirst({
        where: {
            username: username,
        },
    });
};
