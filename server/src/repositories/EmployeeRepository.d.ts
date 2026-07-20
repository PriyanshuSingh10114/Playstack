import { BaseRepository } from './BaseRepository';
import { IEmployee } from '../models/Employee';
export declare class EmployeeRepository extends BaseRepository<IEmployee> {
    constructor();
    findWithDetails(id: string): Promise<IEmployee | null>;
}
export declare const employeeRepository: EmployeeRepository;
//# sourceMappingURL=EmployeeRepository.d.ts.map