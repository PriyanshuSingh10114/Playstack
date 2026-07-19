import { Request, Response, NextFunction } from 'express';
import { organizationService } from '../services/OrganizationService';

export class OrganizationController {
  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const tree = await organizationService.getOrganizationTree();
      res.status(200).json({ success: true, data: tree });
    } catch (error) {
      next(error);
    }
  }

  async getDirectReports(req: Request, res: Response, next: NextFunction) {
    try {
      const reports = await organizationService.getDirectReports(req.params.id);
      res.status(200).json({ success: true, data: reports });
    } catch (error) {
      next(error);
    }
  }
}

export const organizationController = new OrganizationController();
