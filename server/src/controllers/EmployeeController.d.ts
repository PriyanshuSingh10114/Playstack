import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
export declare class EmployeeController {
    create(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request<{
        id: string;
    }>, res: Response, next: NextFunction): Promise<void>;
    update(req: AuthRequest & {
        params: {
            id: string;
        };
    }, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request<{
        id: string;
    }>, res: Response, next: NextFunction): Promise<void>;
}
export declare const employeeController: EmployeeController;
//# sourceMappingURL=EmployeeController.d.ts.map