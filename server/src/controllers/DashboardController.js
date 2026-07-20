"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = exports.DashboardController = void 0;
const DashboardService_1 = require("../services/DashboardService");
class DashboardController {
    async getStats(req, res, next) {
        try {
            const stats = await DashboardService_1.dashboardService.getStats();
            res.status(200).json({ success: true, data: stats });
        }
        catch (error) {
            next(error);
        }
    }
    async getCharts(req, res, next) {
        try {
            const charts = await DashboardService_1.dashboardService.getCharts();
            res.status(200).json({ success: true, data: charts });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DashboardController = DashboardController;
exports.dashboardController = new DashboardController();
//# sourceMappingURL=DashboardController.js.map