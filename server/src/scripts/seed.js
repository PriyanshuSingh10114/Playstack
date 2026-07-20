"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Employee_1 = __importDefault(require("../models/Employee"));
const Department_1 = __importDefault(require("../models/Department"));
const types_1 = require("../types");
dotenv_1.default.config();
const seedData = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/peopleflow');
        console.log('Connected to DB...');
        // Clear existing
        await User_1.default.deleteMany();
        await Employee_1.default.deleteMany();
        await Department_1.default.deleteMany();
        // Departments
        const engineering = await Department_1.default.create({ name: 'Engineering' });
        const hr = await Department_1.default.create({ name: 'Human Resources' });
        // Super Admin
        const adminPassword = await bcrypt_1.default.hash('Admin@123', 10);
        const superAdminUser = await User_1.default.create({
            email: 'admin@peopleflow.com',
            passwordHash: adminPassword,
            role: types_1.Role.SUPER_ADMIN,
        });
        const superAdminEmployee = await Employee_1.default.create({
            userId: superAdminUser._id,
            employeeId: 'EMP001',
            name: 'System Admin',
            email: 'admin@peopleflow.com',
            department: engineering._id,
            designation: 'Chief Technology Officer',
            salary: 150000,
            joiningDate: new Date(),
            status: types_1.EmployeeStatus.ACTIVE,
        });
        superAdminUser.employeeId = superAdminEmployee._id;
        await superAdminUser.save();
        // HR Manager
        const hrPassword = await bcrypt_1.default.hash('Hr@123', 10);
        const hrUser = await User_1.default.create({
            email: 'hr@peopleflow.com',
            passwordHash: hrPassword,
            role: types_1.Role.HR_MANAGER,
        });
        const hrEmployee = await Employee_1.default.create({
            userId: hrUser._id,
            employeeId: 'EMP002',
            name: 'HR Manager',
            email: 'hr@peopleflow.com',
            department: hr._id,
            designation: 'HR Lead',
            salary: 90000,
            joiningDate: new Date(),
            status: types_1.EmployeeStatus.ACTIVE,
            reportingManager: superAdminEmployee._id,
        });
        hrUser.employeeId = hrEmployee._id;
        await hrUser.save();
        console.log('Database seeded successfully!');
        process.exit();
    }
    catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};
seedData();
//# sourceMappingURL=seed.js.map