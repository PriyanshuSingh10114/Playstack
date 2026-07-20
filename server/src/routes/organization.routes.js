"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrganizationController_1 = require("../controllers/OrganizationController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/tree', OrganizationController_1.organizationController.getTree);
router.get('/:id/reportees', OrganizationController_1.organizationController.getDirectReports);
exports.default = router;
//# sourceMappingURL=organization.routes.js.map