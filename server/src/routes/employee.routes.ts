import { Router } from 'express';
import { employeeController } from '../controllers/EmployeeController';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '../types';

const router = Router();

// Protect all employee routes
router.use(authenticate);

// Specific routes
router.get('/', authorize(Role.SUPER_ADMIN, Role.HR_MANAGER), employeeController.getAll);
router.get('/:id', authorize(Role.SUPER_ADMIN, Role.HR_MANAGER), employeeController.getById);

// Super Admin & HR Manager can create/update
router.post('/', authorize(Role.SUPER_ADMIN, Role.HR_MANAGER), employeeController.create);
router.put('/:id', authorize(Role.SUPER_ADMIN, Role.HR_MANAGER), employeeController.update);

// Only Super Admin can delete
router.delete('/:id', authorize(Role.SUPER_ADMIN), employeeController.delete);

export default router;
