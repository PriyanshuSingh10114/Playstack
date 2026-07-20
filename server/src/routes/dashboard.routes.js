"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DashboardController_1 = require("../controllers/DashboardController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/stats', DashboardController_1.dashboardController.getStats);
router.get('/charts', DashboardController_1.dashboardController.getCharts);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map