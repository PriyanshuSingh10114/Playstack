import mongoose, { Document } from 'mongoose';
export interface IRefreshToken extends Document {
    token: string;
    user: mongoose.Types.ObjectId;
    expiresAt: Date;
    isRevoked: boolean;
    createdAt: Date;
}
declare const _default: mongoose.Model<IRefreshToken, {}, {}, {}, mongoose.Document<unknown, {}, IRefreshToken, {}, mongoose.DefaultSchemaOptions> & IRefreshToken & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRefreshToken>;
export default _default;
//# sourceMappingURL=RefreshToken.d.ts.map