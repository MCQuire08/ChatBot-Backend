import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../models/prismaClient';

const JWT_SECRET_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNDkxMTc5MywiaWF0IjoxNzI0OTExNzkzfQ.QwFKNAoC1Wf92N6vMRODLp2v-xtm3o6vy3hnjq5eylw';  // Clave secreta aquí

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData): Promise<{ token: string }> => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error('Email and password must be provided');
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user || !user.password) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );

  return { token };
};