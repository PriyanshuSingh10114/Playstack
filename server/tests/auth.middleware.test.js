"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../src/middlewares/auth.middleware");
const types_1 = require("../src/types");
describe('Auth Middleware', () => {
    it('should call next with error if no token provided', () => {
        const req = { cookies: {}, headers: {} };
        const res = {};
        const next = jest.fn();
        (0, auth_middleware_1.authenticate)(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 401,
            message: 'Invalid or expired token'
        }));
    });
    it('should authorize correct roles', () => {
        const req = { user: { role: types_1.Role.HR_MANAGER } };
        const res = {};
        const next = jest.fn();
        const middleware = (0, auth_middleware_1.authorize)(types_1.Role.SUPER_ADMIN, types_1.Role.HR_MANAGER);
        middleware(req, res, next);
        expect(next).toHaveBeenCalledWith();
    });
    it('should forbid incorrect roles', () => {
        const req = { user: { role: types_1.Role.EMPLOYEE } };
        const res = {};
        const next = jest.fn();
        const middleware = (0, auth_middleware_1.authorize)(types_1.Role.SUPER_ADMIN, types_1.Role.HR_MANAGER);
        middleware(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 403,
            message: 'Forbidden: Insufficient permissions'
        }));
    });
});
//# sourceMappingURL=auth.middleware.test.js.map