import prisma from "../../prisma";


export const checkIfUserExists = async (email: string, username: string) => {
    return await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username },
            ],
        },
    });
}