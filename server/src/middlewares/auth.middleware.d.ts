import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../utils/jwt';
import { Role } from '../types';
export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const authorize: (...roles: Role[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map