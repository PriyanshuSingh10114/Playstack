"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = exports.EmployeeService = void 0;
const EmployeeRepository_1 = require("../repositories/EmployeeRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const errors_1 = require("../utils/errors");
const types_1 = require("../types");
const bcrypt_1 = __importDefault(require("bcrypt"));
const OrganizationService_1 = require("./OrganizationService");
class EmployeeService {
    async createEmployee(data, creatorId) {
        if (!data.employeeId) {
            throw new errors_1.AppError('Employee ID is required', 400);
        }
        const existingEmployee = await EmployeeRepository_1.employeeRepository.findOne({ employeeId: data.employeeId });
        if (existingEmployee) {
            throw new errors_1.AppError('Employee ID already exists', 400);
        }
        const existingUser = await UserRepository_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new errors_1.AppError('Email already in use', 400);
        }
        // Hash password
        const passwordHash = await bcrypt_1.default.hash(data.password || 'PeopleFlow@123', 10);
        // Create User
        const user = await UserRepository_1.userRepository.create({
            email: data.email,
            passwordHash,
            role: data.role || types_1.Role.EMPLOYEE,
        });
        // Create Employee
        const employeeData = {
            ...data,
            userId: user._id,
            createdBy: creatorId,
        };
        const employee = await EmployeeRepository_1.employeeRepository.create(employeeData);
        // Link employee to user
        user.employeeId = employee._id;
        await user.save();
        return employee;
    }
    async getEmployeeById(id) {
        const employee = await EmployeeRepository_1.employeeRepository.findWithDetails(id);
        if (!employee) {
            throw new errors_1.AppError('Employee not found', 404);
        }
        return employee;
    }
    async getEmployees(query) {
        const { page = 1, limit = 10, search, department, status, role } = query;
        const skip = (Number(page) - 1) * Number(limit);
        const filter = {};
        if (search) {
            filter.$text = { $search: search };
        }
        if (department)
            filter.department = department;
        if (status)
            filter.status = status;
        // To filter by role we'd need to lookup user, but for simplicity assuming role is in filter or fetched separately
        const employees = await EmployeeRepository_1.employeeRepository.find(filter, { skip, limit: Number(limit) });
        const total = await EmployeeRepository_1.employeeRepository.count(filter);
        return { employees, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) };
    }
    async updateEmployee(id, data, updaterId) {
        const employee = await EmployeeRepository_1.employeeRepository.findById(id);
        if (!employee)
            throw new errors_1.AppError('Employee not found', 404);
        if (data.reportingManager) {
            if (data.reportingManager.toString() === id) {
                throw new errors_1.AppError('An employee cannot report to themselves', 400);
            }
            const descendants = await OrganizationService_1.organizationService.getAllDescendants(id);
            if (descendants.includes(data.reportingManager.toString())) {
                throw new errors_1.AppError('Circular reporting dependency detected', 400);
            }
        }
        const updatedData = { ...data, updatedBy: updaterId };
        return await EmployeeRepository_1.employeeRepository.update(id, updatedData);
    }
    async softDeleteEmployee(id) {
        const employee = await EmployeeRepository_1.employeeRepository.softDelete(id);
        if (employee) {
            await UserRepository_1.userRepository.softDelete(employee.userId.toString());
        }
        return employee;
    }
}
exports.EmployeeService = EmployeeService;
exports.employeeService = new EmployeeService();
//# sourceMappingURL=EmployeeService.js.map