import { employeeRepository } from '../repositories/EmployeeRepository';
import { IEmployee } from '../models/Employee';

export class OrganizationService {
  async getOrganizationTree() {
    // Fetch all active employees
    const employees = await employeeRepository.find({ status: 'ACTIVE' });
    
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
    return await employeeRepository.find({ reportingManager: managerId, status: 'ACTIVE' });
  }
}

export const organizationService = new OrganizationService();
