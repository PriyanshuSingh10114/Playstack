"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// @ts-ignore
const express_xss_sanitizer_1 = require("express-xss-sanitizer");
const app = (0, express_1.default)();
// Security Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.env.CLIENT_URL,
    credentials: true,
}));
// Sanitization
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, express_xss_sanitizer_1.xss)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);
// Parsing Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const organization_routes_1 = __importDefault(require("./routes/organization.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../../server/swagger.yaml'));
// Routes
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/employees', employee_routes_1.default);
app.use('/api/organization', organization_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/upload', upload_routes_1.default);
// Error Handling Middleware (must be at the end)
app.use(error_middleware_1.errorHandler);
// Start server
const start = async () => {
    try {
        await (0, db_1.connectDB)();
        app.listen(env_1.env.PORT, () => {
            console.log(`Server running on port ${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map