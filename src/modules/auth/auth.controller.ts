import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import {
  comparePassword,
  generateJWT,
  setAuthCookie,
  clearAuthCookie,
} from '../../utils/auth';
import { mapPrismaUserToIUser } from '../../utils/mappers';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const newUser = await authService.createUser({ name, email, password });
    const token = generateJWT(newUser.id, newUser.email, newUser.role as any);
    
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: mapPrismaUserToIUser(newUser),
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateJWT(user.id, user.email, user.role as any);
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: mapPrismaUserToIUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    clearAuthCookie(res);
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const user = await authService.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user: mapPrismaUserToIUser(user),
    });
  } catch (error) {
    return next(error);
  }
};
