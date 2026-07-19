import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '../types';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: Role;
  employeeId?: mongoose.Types.ObjectId; // Reference to Employee model
  isActive: boolean;
  lastLogin?: Date;
  deletedAt?: Date | null;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.EMPLOYEE },
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default mongoose.model<IUser>('User', UserSchema);
