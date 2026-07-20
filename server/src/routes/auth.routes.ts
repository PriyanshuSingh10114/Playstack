import { Router } from 'express';
import { authController } from '../controllers/AuthController';
import { authenticate } from '../middlewares/auth.middleware';
import { loginValidator } from '../validators/auth.validator';

const router = Router();

router.post('/login', loginValidator, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/me', authenticate, authController.me);

export default router;
