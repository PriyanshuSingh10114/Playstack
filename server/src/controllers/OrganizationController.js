"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationController = exports.OrganizationController = void 0;
const OrganizationService_1 = require("../services/OrganizationService");
class OrganizationController {
    async getTree(req, res, next) {
        try {
            const tree = await OrganizationService_1.organizationService.getOrganizationTree();
            res.status(200).json({ success: true, data: tree });
        }
        catch (error) {
            next(error);
        }
    }
    async getDirectReports(req, res, next) {
        try {
            const reports = await OrganizationService_1.organizationService.getDirectReports(req.params.id);
            res.status(200).json({ success: true, data: reports });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrganizationController = OrganizationController;
exports.organizationController = new OrganizationController();
//# sourceMappingURL=OrganizationController.js.map