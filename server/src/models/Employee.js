"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("../types");
const EmployeeSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true, index: true },
    profileImage: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Department' },
    designation: { type: String },
    salary: { type: Number },
    joiningDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(types_1.EmployeeStatus), default: types_1.EmployeeStatus.ACTIVE },
    reportingManager: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Employee' },
    address: { type: String },
    emergencyContact: { type: String },
    deletedAt: { type: Date, default: null },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
// Indexes for searching and filtering
EmployeeSchema.index({ name: 'text', email: 'text', employeeId: 'text' });
EmployeeSchema.index({ department: 1, status: 1 }); // Compound index for filtering
EmployeeSchema.index({ reportingManager: 1 });
EmployeeSchema.index({ createdAt: -1 }); // Useful for default sorting
exports.default = mongoose_1.default.model('Employee', EmployeeSchema);
//# sourceMappingURL=Employee.js.map