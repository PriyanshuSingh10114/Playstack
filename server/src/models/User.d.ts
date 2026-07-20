import mongoose, { Document } from 'mongoose';
import { Role } from '../types';
export interface IUser extends Document {
    email: string;
    passwordHash: string;
    role: Role;
    employeeId?: mongoose.Types.ObjectId;
    isActive: boolean;
    lastLogin?: Date;
    deletedAt?: Date | null;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default _default;
//# sourceMappingURL=User.d.ts.map