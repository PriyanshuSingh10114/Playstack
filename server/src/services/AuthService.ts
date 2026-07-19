import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/UserRepository';
import { refreshTokenRepository } from '../repositories/RefreshTokenRepository';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../utils/errors';
import { Types } from 'mongoose';

export class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
    if (!user.isActive) {
      throw new AppError('Account is disabled', 403);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const accessToken = generateAccessToken(user._id as Types.ObjectId, user.role);
    const refreshToken = generateRefreshToken(user._id as Types.ObjectId);

    // Save refresh token
    const decodedRefresh = verifyRefreshToken(refreshToken);
    // Approximate expiration from jwt config or set manually (e.g. 7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await refreshTokenRepository.create({
      token: refreshToken,
      user: user._id as Types.ObjectId,
      expiresAt
    });

    user.lastLogin = new Date();
    await user.save();

    return { user, accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    if (refreshToken) {
      await refreshTokenRepository.revokeToken(refreshToken);
    }
  }

  async refresh(token: string) {
    const storedToken = await refreshTokenRepository.findByToken(token);
    if (!storedToken || storedToken.isRevoked) {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    try {
      const decoded = verifyRefreshToken(token);
      const user = await userRepository.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        throw new AppError('User not found or disabled', 401);
      }

      const accessToken = generateAccessToken(user._id as Types.ObjectId, user.role);
      const newRefreshToken = generateRefreshToken(user._id as Types.ObjectId);

      // Revoke old token and create new one (Rotational strategy)
      storedToken.isRevoked = true;
      await storedToken.save();

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await refreshTokenRepository.create({
        token: newRefreshToken,
        user: user._id as Types.ObjectId,
        expiresAt
      });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      // If token verification fails
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }
}

export const authService = new AuthService();
