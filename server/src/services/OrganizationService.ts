import { employeeRepository } from '../repositories/EmployeeRepository';
import { IEmployee } from '../models/Employee';
import { EmployeeStatus } from '../types';

export class OrganizationService {
  async getOrganizationTree() {
    // Fetch all active employees
    const employees = await employeeRepository.find({ status: EmployeeStatus.ACTIVE });
    
    // Convert to plain objects and create a map
    const empMap = new Map<string, any>();
    employees.forEach(emp => {
      const e = emp.toObject();
      empMap.set(e._id.toString(), { ...e, children: [] });
    });

    const tree: any[] = [];

    // Build the tree
    empMap.forEach(emp => {
      if (emp.reportingManager) {
        const managerId = emp.reportingManager.toString();
        const manager = empMap.get(managerId);
        if (manager) {
          manager.children.push(emp);
        } else {
          // If manager not found (e.g., deleted), treat as root
          tree.push(emp);
        }
      } else {
        // No manager = root node
        tree.push(emp);
      }
    });

    return tree;
  }

  async getDirectReports(managerId: string) {
    return await employeeRepository.find({ reportingManager: managerId, status: EmployeeStatus.ACTIVE });
  }

  async getAllDescendants(employeeId: string): Promise<string[]> {
    const descendants: string[] = [];
    const queue = [employeeId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const reports = await this.getDirectReports(currentId);
      
      for (const report of reports) {
        const reportId = report._id.toString();
        descendants.push(reportId);
        queue.push(reportId);
      }
    }

    return descendants;
  }
}

export const organizationService = new OrganizationService();
