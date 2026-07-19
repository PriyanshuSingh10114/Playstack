import { Router } from 'express';
import { organizationController } from '../controllers/OrganizationController';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/tree', organizationController.getTree);
router.get('/:id/reportees', organizationController.getDirectReports);

export default router;
