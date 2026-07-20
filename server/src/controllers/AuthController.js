"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await AuthService_1.authService.login(email, password);
            // Set HTTP Only cookies
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            res.status(200).json({
                success: true,
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                        employeeId: user.employeeId
                    }
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken) {
                await AuthService_1.authService.logout(refreshToken);
            }
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(200).json({ success: true, message: 'Logged out successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                return res.status(401).json({ success: false, message: 'No refresh token provided' });
            }
            const { accessToken, refreshToken } = await AuthService_1.authService.refresh(token);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({ success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async me(req, res, next) {
        try {
            // Logic for getting current user's profile
            // Normally we fetch user details + employee details
            res.status(200).json({ success: true, data: req.user });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=AuthController.js.map