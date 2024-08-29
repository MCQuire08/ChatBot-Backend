import bcrypt from 'bcryptjs';
import prisma from '../models/prismaClient';

interface UserData {
  email: string;
  name: string;
  password: string;
}

export const createUser = async (data: UserData) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed on the fields:')) {
        throw new Error('User with this email already exists');
      }
    }
    throw error;
  }
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

