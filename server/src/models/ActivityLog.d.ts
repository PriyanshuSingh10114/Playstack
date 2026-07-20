import mongoose, { Document } from 'mongoose';
export interface IActivityLog extends Document {
    action: string;
    entity: string;
    entityId: mongoose.Types.ObjectId;
    performedBy: mongoose.Types.ObjectId;
    details?: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IActivityLog, {}, {}, {}, mongoose.Document<unknown, {}, IActivityLog, {}, mongoose.DefaultSchemaOptions> & IActivityLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivityLog>;
export default _default;
//# sourceMappingURL=ActivityLog.d.ts.map