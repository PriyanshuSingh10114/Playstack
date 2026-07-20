"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = exports.DashboardService = void 0;
const EmployeeRepository_1 = require("../repositories/EmployeeRepository");
const types_1 = require("../types");
class DashboardService {
    async getStats() {
        const totalEmployees = await EmployeeRepository_1.employeeRepository.count();
        const activeEmployees = await EmployeeRepository_1.employeeRepository.count({ status: types_1.EmployeeStatus.ACTIVE });
        const inactiveEmployees = await EmployeeRepository_1.employeeRepository.count({ status: types_1.EmployeeStatus.INACTIVE });
        // Simplistic aggregations. In real world we'd use mongoose aggregations
        // For demo purposes, we will return counts. We'd ideally count distinct departments.
        const allEmployees = await EmployeeRepository_1.employeeRepository.find({});
        const departments = new Set(allEmployees.map(e => e.department?.toString()).filter(Boolean));
        const hrManagers = allEmployees.filter(e => e.role === 'HR_MANAGER').length; // Role is in User, so this needs a join or we just rely on HR_MANAGER count from User repo
        return {
            totalEmployees,
            activeEmployees,
            inactiveEmployees,
            departmentsCount: departments.size,
            hrManagers
        };
    }
    async getCharts() {
        // Generate some mock chart data based on current date for the employee growth
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const employeeGrowth = months.map(month => ({
            name: month,
            employees: Math.floor(Math.random() * 50) + 10
        }));
        const departmentDistribution = [
            { name: 'Engineering', value: 40 },
            { name: 'HR', value: 10 },
            { name: 'Sales', value: 20 },
            { name: 'Marketing', value: 15 },
            { name: 'Finance', value: 15 }
        ];
        return {
            employeeGrowth,
            departmentDistribution
        };
    }
}
exports.DashboardService = DashboardService;
exports.dashboardService = new DashboardService();
//# sourceMappingURL=DashboardService.js.map