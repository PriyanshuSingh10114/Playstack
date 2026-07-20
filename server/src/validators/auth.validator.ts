import { body } from 'express-validator';
import { validate } from '../middlewares/validate.middleware';

export const loginValidator = validate([
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]);
