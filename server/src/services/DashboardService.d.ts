export declare class DashboardService {
    getStats(): Promise<{
        totalEmployees: number;
        activeEmployees: number;
        inactiveEmployees: number;
        departmentsCount: number;
        hrManagers: number;
    }>;
    getCharts(): Promise<{
        employeeGrowth: {
            name: string;
            employees: number;
        }[];
        departmentDistribution: {
            name: string;
            value: number;
        }[];
    }>;
}
export declare const dashboardService: DashboardService;
//# sourceMappingURL=DashboardService.d.ts.map