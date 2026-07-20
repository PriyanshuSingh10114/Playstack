import { Request, Response, NextFunction } from 'express';
export declare class OrganizationController {
    getTree(req: Request, res: Response, next: NextFunction): Promise<void>;
    getDirectReports(req: Request<{
        id: string;
    }>, res: Response, next: NextFunction): Promise<void>;
}
export declare const organizationController: OrganizationController;
//# sourceMappingURL=OrganizationController.d.ts.map