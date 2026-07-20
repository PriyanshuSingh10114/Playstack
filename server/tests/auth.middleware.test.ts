import { authenticate, authorize } from '../src/middlewares/auth.middleware';
import { Role } from '../src/types';

describe('Auth Middleware', () => {
  it('should call next with error if no token provided', () => {
    const req: any = { cookies: {}, headers: {} };
    const res: any = {};
    const next = jest.fn();

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      statusCode: 401,
      message: 'Invalid or expired token'
    }));
  });

  it('should authorize correct roles', () => {
    const req: any = { user: { role: Role.HR_MANAGER } };
    const res: any = {};
    const next = jest.fn();

    const middleware = authorize(Role.SUPER_ADMIN, Role.HR_MANAGER);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should forbid incorrect roles', () => {
    const req: any = { user: { role: Role.EMPLOYEE } };
    const res: any = {};
    const next = jest.fn();

    const middleware = authorize(Role.SUPER_ADMIN, Role.HR_MANAGER);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      statusCode: 403,
      message: 'Forbidden: Insufficient permissions'
    }));
  });
});
