import prisma from '../../prisma';

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
    }, )
};
