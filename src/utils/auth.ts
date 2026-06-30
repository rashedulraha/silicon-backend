import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types/db';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-signing-key-change-in-production';
const COOKIE_NAME = 'token';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateJWT = (userId: string, email: string, role: UserRole): string => {
  const payload = {
    sub: userId,
    email,
    role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: '/',
  });
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
};
