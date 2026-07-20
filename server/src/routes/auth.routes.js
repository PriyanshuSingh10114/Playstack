"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
router.post('/login', auth_validator_1.loginValidator, AuthController_1.authController.login);
router.post('/logout', AuthController_1.authController.logout);
router.post('/refresh', AuthController_1.authController.refresh);
router.get('/me', auth_middleware_1.authenticate, AuthController_1.authController.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map