"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const jobSeeker_routes_1 = __importDefault(require("./routes/jobSeeker.routes"));
const employer_routes_1 = __importDefault(require("./routes/employer.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: config_1.default.clientUrl,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/applications', application_routes_1.default);
app.use('/api/jobs', job_routes_1.default);
app.use('/api/job-seekers', jobSeeker_routes_1.default);
app.use('/api/employers', employer_routes_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        environment: config_1.default.nodeEnv,
        timestamp: new Date().toISOString()
    });
});
// 404 handler for unknown routes
app.use(error_middleware_1.notFound);
// Error handling middleware
app.use(error_middleware_1.errorHandler);
// Start server
app.listen(config_1.default.port, () => {
    console.log(`🚀 Server is running on port ${config_1.default.port}`);
    console.log(`📊 Environment: ${config_1.default.nodeEnv}`);
    console.log(`🌐 Client URL: ${config_1.default.clientUrl}`);
    console.log(`📁 Max file size: ${(config_1.default.upload.maxFileSize / 1024 / 1024).toFixed(1)}MB`);
});
