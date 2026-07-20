export declare enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    HR_MANAGER = "HR_MANAGER",
    EMPLOYEE = "EMPLOYEE"
}
export declare enum EmployeeStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ON_LEAVE = "ON_LEAVE"
}
export interface IBaseDocument {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    createdBy?: string;
    updatedBy?: string;
}
//# sourceMappingURL=index.d.ts.map