"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationService = exports.OrganizationService = void 0;
const EmployeeRepository_1 = require("../repositories/EmployeeRepository");
const types_1 = require("../types");
class OrganizationService {
    async getOrganizationTree() {
        // Fetch all active employees
        const employees = await EmployeeRepository_1.employeeRepository.find({ status: types_1.EmployeeStatus.ACTIVE });
        // Convert to plain objects and create a map
        const empMap = new Map();
        employees.forEach(emp => {
            const e = emp.toObject();
            empMap.set(e._id.toString(), { ...e, children: [] });
        });
        const tree = [];
        // Build the tree
        empMap.forEach(emp => {
            if (emp.reportingManager) {
                const managerId = emp.reportingManager.toString();
                const manager = empMap.get(managerId);
                if (manager) {
                    manager.children.push(emp);
                }
                else {
                    // If manager not found (e.g., deleted), treat as root
                    tree.push(emp);
                }
            }
            else {
                // No manager = root node
                tree.push(emp);
            }
        });
        return tree;
    }
    async getDirectReports(managerId) {
        return await EmployeeRepository_1.employeeRepository.find({ reportingManager: managerId, status: types_1.EmployeeStatus.ACTIVE });
    }
    async getAllDescendants(employeeId) {
        const descendants = [];
        const queue = [employeeId];
        while (queue.length > 0) {
            const currentId = queue.shift();
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
exports.OrganizationService = OrganizationService;
exports.organizationService = new OrganizationService();
//# sourceMappingURL=OrganizationService.js.map