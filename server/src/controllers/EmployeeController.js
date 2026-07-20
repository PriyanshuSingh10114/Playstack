"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = exports.EmployeeController = void 0;
const EmployeeService_1 = require("../services/EmployeeService");
class EmployeeController {
    async create(req, res, next) {
        try {
            const creatorId = req.user.userId;
            const employee = await EmployeeService_1.employeeService.createEmployee(req.body, creatorId);
            res.status(201).json({ success: true, data: employee });
        }
        catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        try {
            const result = await EmployeeService_1.employeeService.getEmployees(req.query);
            res.status(200).json({ success: true, ...result });
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const employee = await EmployeeService_1.employeeService.getEmployeeById(req.params.id);
            res.status(200).json({ success: true, data: employee });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const updaterId = req.user.userId;
            const employee = await EmployeeService_1.employeeService.updateEmployee(req.params.id, req.body, updaterId);
            res.status(200).json({ success: true, data: employee });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await EmployeeService_1.employeeService.softDeleteEmployee(req.params.id);
            res.status(200).json({ success: true, message: 'Employee deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.EmployeeController = EmployeeController;
exports.employeeController = new EmployeeController();
//# sourceMappingURL=EmployeeController.js.map