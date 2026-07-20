"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmployeeController_1 = require("../controllers/EmployeeController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const types_1 = require("../types");
const employee_validator_1 = require("../validators/employee.validator");
const router = (0, express_1.Router)();
// Protect all employee routes
router.use(auth_middleware_1.authenticate);
// Specific routes
router.get('/', (0, auth_middleware_1.authorize)(types_1.Role.SUPER_ADMIN, types_1.Role.HR_MANAGER), EmployeeController_1.employeeController.getAll);
router.get('/:id', (0, auth_middleware_1.authorize)(types_1.Role.SUPER_ADMIN, types_1.Role.HR_MANAGER), EmployeeController_1.employeeController.getById);
// Super Admin & HR Manager can create/update
router.post('/', (0, auth_middleware_1.authorize)(types_1.Role.SUPER_ADMIN, types_1.Role.HR_MANAGER), employee_validator_1.createEmployeeValidator, EmployeeController_1.employeeController.create);
router.put('/:id', (0, auth_middleware_1.authorize)(types_1.Role.SUPER_ADMIN, types_1.Role.HR_MANAGER), employee_validator_1.updateEmployeeValidator, EmployeeController_1.employeeController.update);
// Only Super Admin can delete
router.delete('/:id', (0, auth_middleware_1.authorize)(types_1.Role.SUPER_ADMIN), EmployeeController_1.employeeController.delete);
exports.default = router;
//# sourceMappingURL=employee.routes.js.map