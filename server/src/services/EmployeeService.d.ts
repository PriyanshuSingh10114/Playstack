import { IEmployee } from '../models/Employee';
import { Role } from '../types';
export declare class EmployeeService {
    createEmployee(data: Partial<IEmployee> & {
        password?: string;
        role?: Role;
    }, creatorId: string): Promise<IEmployee>;
    getEmployeeById(id: string): Promise<IEmployee>;
    getEmployees(query: any): Promise<{
        employees: IEmployee[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    updateEmployee(id: string, data: Partial<IEmployee>, updaterId: string): Promise<IEmployee | null>;
    softDeleteEmployee(id: string): Promise<IEmployee | null>;
}
export declare const employeeService: EmployeeService;
//# sourceMappingURL=EmployeeService.d.ts.map