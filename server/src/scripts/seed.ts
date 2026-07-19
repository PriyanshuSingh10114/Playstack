import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User';
import Employee from '../models/Employee';
import Department from '../models/Department';
import { Role, EmployeeStatus } from '../types';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/peopleflow');
    console.log('Connected to DB...');

    // Clear existing
    await User.deleteMany();
    await Employee.deleteMany();
    await Department.deleteMany();

    // Departments
    const engineering = await Department.create({ name: 'Engineering' });
    const hr = await Department.create({ name: 'Human Resources' });

    // Super Admin
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const superAdminUser = await User.create({
      email: 'admin@peopleflow.com',
      passwordHash: adminPassword,
      role: Role.SUPER_ADMIN,
    });

    const superAdminEmployee = await Employee.create({
      userId: superAdminUser._id,
      employeeId: 'EMP001',
      name: 'System Admin',
      email: 'admin@peopleflow.com',
      department: engineering._id,
      designation: 'Chief Technology Officer',
      salary: 150000,
      joiningDate: new Date(),
      status: EmployeeStatus.ACTIVE,
    });

    superAdminUser.employeeId = superAdminEmployee._id;
    await superAdminUser.save();

    // HR Manager
    const hrPassword = await bcrypt.hash('Hr@123', 10);
    const hrUser = await User.create({
      email: 'hr@peopleflow.com',
      passwordHash: hrPassword,
      role: Role.HR_MANAGER,
    });

    const hrEmployee = await Employee.create({
      userId: hrUser._id,
      employeeId: 'EMP002',
      name: 'HR Manager',
      email: 'hr@peopleflow.com',
      department: hr._id,
      designation: 'HR Lead',
      salary: 90000,
      joiningDate: new Date(),
      status: EmployeeStatus.ACTIVE,
      reportingManager: superAdminEmployee._id,
    });

    hrUser.employeeId = hrEmployee._id;
    await hrUser.save();

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
