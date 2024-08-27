import prisma from '../models/prismaClient';

interface UserData {
  email: string;
  name: string;
}

export const createUser = async (data: UserData) => {
  return await prisma.user.create({ data });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

