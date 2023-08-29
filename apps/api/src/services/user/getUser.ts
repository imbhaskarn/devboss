import prisma from '../../prisma';

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
