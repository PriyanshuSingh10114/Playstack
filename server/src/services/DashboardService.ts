import { employeeRepository } from '../repositories/EmployeeRepository';

export class DashboardService {
  async getStats() {
    const totalEmployees = await employeeRepository.count();
    const activeEmployees = await employeeRepository.count({ status: 'ACTIVE' });
    const inactiveEmployees = await employeeRepository.count({ status: 'INACTIVE' });
    
    // Simplistic aggregations. In real world we'd use mongoose aggregations
    // For demo purposes, we will return counts. We'd ideally count distinct departments.
    const allEmployees = await employeeRepository.find({});
    const departments = new Set(allEmployees.map(e => e.department?.toString()).filter(Boolean));
    const hrManagers = allEmployees.filter(e => (e as any).role === 'HR_MANAGER').length; // Role is in User, so this needs a join or we just rely on HR_MANAGER count from User repo
    
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

export const dashboardService = new DashboardService();
