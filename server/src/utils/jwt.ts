import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Types } from 'mongoose';
import { Role } from '../types';

export interface JwtPayload {
  userId: string;
  role: Role;
}

export const generateAccessToken = (userId: Types.ObjectId | string, role: Role): string => {
  return jwt.sign(
    { userId: userId.toString(), role },
    env.JWT_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY }
  );
};

export const generateRefreshToken = (userId: Types.ObjectId | string): string => {
  return jwt.sign(
    { userId: userId.toString() },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRY }
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
};
