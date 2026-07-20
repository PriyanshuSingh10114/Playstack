"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRepository = exports.EmployeeRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Employee_1 = __importDefault(require("../models/Employee"));
class EmployeeRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Employee_1.default);
    }
    async findWithDetails(id) {
        return this.model
            .findOne({ _id: id, deletedAt: null })
            .populate('department', 'name')
            .populate('reportingManager', 'name email profileImage')
            .exec();
    }
}
exports.EmployeeRepository = EmployeeRepository;
exports.employeeRepository = new EmployeeRepository();
//# sourceMappingURL=EmployeeRepository.js.map