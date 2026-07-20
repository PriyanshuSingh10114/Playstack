"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = require("../repositories/UserRepository");
const RefreshTokenRepository_1 = require("../repositories/RefreshTokenRepository");
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
class AuthService {
    async login(email, password) {
        const user = await UserRepository_1.userRepository.findByEmail(email);
        if (!user) {
            throw new errors_1.AppError('Invalid credentials', 401);
        }
        if (!user.isActive) {
            throw new errors_1.AppError('Account is disabled', 403);
        }
        const isMatch = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new errors_1.AppError('Invalid credentials', 401);
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user._id, user.role);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user._id);
        // Save refresh token
        const decodedRefresh = (0, jwt_1.verifyRefreshToken)(refreshToken);
        // Approximate expiration from jwt config or set manually (e.g. 7 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await RefreshTokenRepository_1.refreshTokenRepository.create({
            token: refreshToken,
            user: user._id,
            expiresAt
        });
        user.lastLogin = new Date();
        await user.save();
        return { user, accessToken, refreshToken };
    }
    async logout(refreshToken) {
        if (refreshToken) {
            await RefreshTokenRepository_1.refreshTokenRepository.revokeToken(refreshToken);
        }
    }
    async refresh(token) {
        const storedToken = await RefreshTokenRepository_1.refreshTokenRepository.findByToken(token);
        if (!storedToken || storedToken.isRevoked) {
            throw new errors_1.AppError('Invalid or expired refresh token', 401);
        }
        try {
            const decoded = (0, jwt_1.verifyRefreshToken)(token);
            const user = await UserRepository_1.userRepository.findById(decoded.userId);
            if (!user || !user.isActive) {
                throw new errors_1.AppError('User not found or disabled', 401);
            }
            const accessToken = (0, jwt_1.generateAccessToken)(user._id, user.role);
            const newRefreshToken = (0, jwt_1.generateRefreshToken)(user._id);
            // Revoke old token and create new one (Rotational strategy)
            storedToken.isRevoked = true;
            await storedToken.save();
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            await RefreshTokenRepository_1.refreshTokenRepository.create({
                token: newRefreshToken,
                user: user._id,
                expiresAt
            });
            return { accessToken, refreshToken: newRefreshToken };
        }
        catch (error) {
            // If token verification fails
            throw new errors_1.AppError('Invalid or expired refresh token', 401);
        }
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=AuthService.js.map