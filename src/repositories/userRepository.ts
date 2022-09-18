import { prisma } from "../database";
import { IUserData } from "../types/userType";

export async function createUser(data: IUserData) {

    await prisma.user.create({data});
};

export async function getUser(email: string) {

    const user = await prisma.user.findUnique({where: {email}});
    return user;
};
