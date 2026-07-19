export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
}

export interface User {
  id: string;
  email: string;
  role: Role;
  employeeId?: string;
}

export interface Employee {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department?: { _id: string, name: string } | string;
  designation: string;
  salary: number;
  joiningDate: string;
  status: EmployeeStatus;
  reportingManager?: { _id: string, name: string } | string;
  profileImage?: string;
}
