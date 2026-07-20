"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeValidator = exports.createEmployeeValidator = void 0;
const express_validator_1 = require("express-validator");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const types_1 = require("../types");
exports.createEmployeeValidator = (0, validate_middleware_1.validate)([
    (0, express_validator_1.body)('employeeId').notEmpty().withMessage('Employee ID is required').trim(),
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required').trim(),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    (0, express_validator_1.body)('phone').optional().isString().trim(),
    (0, express_validator_1.body)('department').optional().isMongoId().withMessage('Invalid department ID'),
    (0, express_validator_1.body)('designation').notEmpty().withMessage('Designation is required').trim(),
    (0, express_validator_1.body)('salary').isNumeric().withMessage('Salary must be a number'),
    (0, express_validator_1.body)('joiningDate').isISO8601().toDate().withMessage('Valid joining date is required'),
    (0, express_validator_1.body)('status').optional().isIn(Object.values(types_1.EmployeeStatus)).withMessage('Invalid status'),
    (0, express_validator_1.body)('role').optional().isIn(Object.values(types_1.Role)).withMessage('Invalid role'),
    (0, express_validator_1.body)('reportingManager').optional().isMongoId().withMessage('Invalid reporting manager ID'),
]);
exports.updateEmployeeValidator = (0, validate_middleware_1.validate)([
    (0, express_validator_1.body)('employeeId').optional().notEmpty().withMessage('Employee ID cannot be empty').trim(),
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Name cannot be empty').trim(),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Valid email is required').normalizeEmail(),
    (0, express_validator_1.body)('phone').optional().isString().trim(),
    (0, express_validator_1.body)('department').optional().isMongoId().withMessage('Invalid department ID'),
    (0, express_validator_1.body)('designation').optional().notEmpty().withMessage('Designation cannot be empty').trim(),
    (0, express_validator_1.body)('salary').optional().isNumeric().withMessage('Salary must be a number'),
    (0, express_validator_1.body)('joiningDate').optional().isISO8601().toDate().withMessage('Valid joining date is required'),
    (0, express_validator_1.body)('status').optional().isIn(Object.values(types_1.EmployeeStatus)).withMessage('Invalid status'),
    (0, express_validator_1.body)('role').optional().isIn(Object.values(types_1.Role)).withMessage('Invalid role'),
    (0, express_validator_1.body)('reportingManager').optional().isMongoId().withMessage('Invalid reporting manager ID'),
]);
//# sourceMappingURL=employee.validator.js.map