import mongoose, { Document } from 'mongoose';
import { EmployeeStatus } from '../types';
export interface IEmployee extends Document {
    userId: mongoose.Types.ObjectId;
    employeeId: string;
    profileImage?: string;
    name: string;
    email: string;
    phone: string;
    department?: mongoose.Types.ObjectId;
    designation: string;
    salary: number;
    joiningDate: Date;
    status: EmployeeStatus;
    reportingManager?: mongoose.Types.ObjectId;
    address?: string;
    emergencyContact?: string;
    deletedAt?: Date | null;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
}
declare const _default: mongoose.Model<IEmployee, {}, {}, {}, mongoose.Document<unknown, {}, IEmployee, {}, mongoose.DefaultSchemaOptions> & IEmployee & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IEmployee>;
export default _default;
//# sourceMappingURL=Employee.d.ts.map