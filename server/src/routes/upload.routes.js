"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinary_1 = require("../config/cloudinary");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/profile', auth_middleware_1.authenticate, cloudinary_1.upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.status(200).json({
        success: true,
        data: {
            url: req.file.path
        }
    });
});
exports.default = router;
//# sourceMappingURL=upload.routes.js.map