import prisma from '../../config/db';
import { hashPassword } from '../../utils/auth';
import { z } from 'zod';
import { registerSchema } from './auth.validation';

type RegisterInput = z.infer<typeof registerSchema>;

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (input: RegisterInput) => {
  const hashedPassword = await hashPassword(input.password);
  
  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      password: hashedPassword,
      role: 'user', // Default role is user
    },
  });
};
