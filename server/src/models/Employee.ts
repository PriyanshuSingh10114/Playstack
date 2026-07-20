import mongoose, { Schema, Document } from 'mongoose';
import { EmployeeStatus } from '../types';

export interface IEmployee extends Document {
  userId: mongoose.Types.ObjectId; // Reference to User model
  employeeId: string;
  profileImage?: string;
  name: string;
  email: string;
  phone: string;
  department?: mongoose.Types.ObjectId; // Reference to Department
  designation: string;
  salary: number;
  joiningDate: Date;
  status: EmployeeStatus;
  reportingManager?: mongoose.Types.ObjectId; // Reference to another Employee
  address?: string;
  emergencyContact?: string;
  
  deletedAt?: Date | null;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const EmployeeSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true, index: true },
    profileImage: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    designation: { type: String },
    salary: { type: Number },
    joiningDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(EmployeeStatus), default: EmployeeStatus.ACTIVE },
    reportingManager: { type: Schema.Types.ObjectId, ref: 'Employee' },
    address: { type: String },
    emergencyContact: { type: String },
    
    deletedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Indexes for searching and filtering
EmployeeSchema.index({ name: 'text', email: 'text', employeeId: 'text' });
EmployeeSchema.index({ department: 1, status: 1 }); // Compound index for filtering
EmployeeSchema.index({ reportingManager: 1 });
EmployeeSchema.index({ createdAt: -1 }); // Useful for default sorting

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
