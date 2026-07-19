import { employeeRepository } from '../repositories/EmployeeRepository';
import { userRepository } from '../repositories/UserRepository';
import { AppError } from '../utils/errors';
import { IEmployee } from '../models/Employee';
import { Role } from '../types';
import bcrypt from 'bcrypt';

export class EmployeeService {
  async createEmployee(data: Partial<IEmployee> & { password?: string, role?: Role }, creatorId: string) {
    const existingEmployee = await employeeRepository.findOne({ employeeId: data.employeeId });
    if (existingEmployee) {
      throw new AppError('Employee ID already exists', 400);
    }

    const existingUser = await userRepository.findByEmail(data.email!);
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password || 'PeopleFlow@123', 10);

    // Create User
    const user = await userRepository.create({
      email: data.email!,
      passwordHash,
      role: data.role || Role.EMPLOYEE,
    });

    // Create Employee
    const employeeData = {
      ...data,
      userId: user._id,
      createdBy: creatorId,
    };
    
    const employee = await employeeRepository.create(employeeData as any);

    // Link employee to user
    user.employeeId = employee._id;
    await user.save();

    return employee;
  }

  async getEmployeeById(id: string) {
    const employee = await employeeRepository.findWithDetails(id);
    if (!employee) {
      throw new AppError('Employee not found', 404);
    }
    return employee;
  }

  async getEmployees(query: any) {
    const { page = 1, limit = 10, search, department, status, role } = query;
    const skip = (Number(page) - 1) * Number(limit);
    
    const filter: any = {};
    if (search) {
      filter.$text = { $search: search };
    }
    if (department) filter.department = department;
    if (status) filter.status = status;

    // To filter by role we'd need to lookup user, but for simplicity assuming role is in filter or fetched separately
    
    const employees = await employeeRepository.find(filter, { skip, limit: Number(limit) });
    const total = await employeeRepository.count(filter);

    return { employees, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) };
  }

  async updateEmployee(id: string, data: Partial<IEmployee>, updaterId: string) {
    const employee = await employeeRepository.findById(id);
    if (!employee) throw new AppError('Employee not found', 404);

    const updatedData = { ...data, updatedBy: updaterId };
    return await employeeRepository.update(id, updatedData as any);
  }

  async softDeleteEmployee(id: string) {
    const employee = await employeeRepository.softDelete(id);
    if (employee) {
      await userRepository.softDelete(employee.userId.toString());
    }
    return employee;
  }
}

export const employeeService = new EmployeeService();
