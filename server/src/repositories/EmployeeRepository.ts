import { BaseRepository } from './BaseRepository';
import Employee, { IEmployee } from '../models/Employee';

export class EmployeeRepository extends BaseRepository<IEmployee> {
  constructor() {
    super(Employee);
  }

  async findWithDetails(id: string): Promise<IEmployee | null> {
    return this.model
      .findOne({ _id: id, deletedAt: null })
      .populate('department', 'name')
      .populate('reportingManager', 'name email profileImage')
      .exec();
  }
}

export const employeeRepository = new EmployeeRepository();
