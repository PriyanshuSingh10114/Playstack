import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../services/EmployeeService';
import { AuthRequest } from '../middlewares/auth.middleware';

export class EmployeeController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const creatorId = req.user!.userId;
      const employee = await employeeService.createEmployee(req.body, creatorId);
      res.status(201).json({ success: true, data: employee });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await employeeService.getEmployees(req.query);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const employee = await employeeService.getEmployeeById(req.params.id);
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest & { params: { id: string } }, res: Response, next: NextFunction) {
    try {
      const updaterId = req.user!.userId;
      const employee = await employeeService.updateEmployee(req.params.id, req.body, updaterId);
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      await employeeService.softDeleteEmployee(req.params.id);
      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export const employeeController = new EmployeeController();
