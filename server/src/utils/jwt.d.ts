import { Role } from '../types';
import { Types } from 'mongoose';
export interface JwtPayload {
    userId: string;
    role: Role;
}
export declare const generateAccessToken: (userId: Types.ObjectId | string, role: Role) => string;
export declare const generateRefreshToken: (userId: Types.ObjectId | string) => string;
export declare const verifyAccessToken: (token: string) => JwtPayload;
export declare const verifyRefreshToken: (token: string) => {
    userId: string;
};
//# sourceMappingURL=jwt.d.ts.map