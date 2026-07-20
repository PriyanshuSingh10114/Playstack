import { IEmployee } from '../models/Employee';
export declare class OrganizationService {
    getOrganizationTree(): Promise<any[]>;
    getDirectReports(managerId: string): Promise<IEmployee[]>;
    getAllDescendants(employeeId: string): Promise<string[]>;
}
export declare const organizationService: OrganizationService;
//# sourceMappingURL=OrganizationService.d.ts.map