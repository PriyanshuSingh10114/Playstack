import { Router } from 'express';
import { dashboardController } from '../controllers/DashboardController';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/stats', dashboardController.getStats);
router.get('/charts', dashboardController.getCharts);

export default router;
