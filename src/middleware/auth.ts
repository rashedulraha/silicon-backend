import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/db';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-signing-key-change-in-production';

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // 1. Read token from HTTP-only cookie
  let token = req.cookies?.token;

  // 2. Fallback to Authorization header if cookies are not present
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access Denied: Insufficient Permissions' });
    }

    next();
  };
};
