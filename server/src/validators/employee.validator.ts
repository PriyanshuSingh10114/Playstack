import { body } from 'express-validator';
import { validate } from '../middlewares/validate.middleware';
import { Role, EmployeeStatus } from '../types';

export const createEmployeeValidator = validate([
  body('employeeId').notEmpty().withMessage('Employee ID is required').trim(),
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional().isString().trim(),
  body('department').optional().isMongoId().withMessage('Invalid department ID'),
  body('designation').notEmpty().withMessage('Designation is required').trim(),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('joiningDate').isISO8601().toDate().withMessage('Valid joining date is required'),
  body('status').optional().isIn(Object.values(EmployeeStatus)).withMessage('Invalid status'),
  body('role').optional().isIn(Object.values(Role)).withMessage('Invalid role'),
  body('reportingManager').optional().isMongoId().withMessage('Invalid reporting manager ID'),
]);

export const updateEmployeeValidator = validate([
  body('employeeId').optional().notEmpty().withMessage('Employee ID cannot be empty').trim(),
  body('name').optional().notEmpty().withMessage('Name cannot be empty').trim(),
  body('email').optional().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional().isString().trim(),
  body('department').optional().isMongoId().withMessage('Invalid department ID'),
  body('designation').optional().notEmpty().withMessage('Designation cannot be empty').trim(),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('joiningDate').optional().isISO8601().toDate().withMessage('Valid joining date is required'),
  body('status').optional().isIn(Object.values(EmployeeStatus)).withMessage('Invalid status'),
  body('role').optional().isIn(Object.values(Role)).withMessage('Invalid role'),
  body('reportingManager').optional().isMongoId().withMessage('Invalid reporting manager ID'),
]);
