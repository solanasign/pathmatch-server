"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../config/multer");
const application_controller_1 = require("../controllers/application.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public route for job applications (no authentication required)
router.post('/public', (0, multer_1.uploadSingle)('resume'), application_controller_1.submitPublicApplication);
router.post('/onboarding', application_controller_1.submitOnboarding);
// Protected routes
router.post('/', auth_middleware_1.authenticate, auth_middleware_1.requireJobSeeker, application_controller_1.submitApplication);
router.put('/:id/status', auth_middleware_1.authenticate, auth_middleware_1.requireEmployerOrAdmin, application_controller_1.updateApplicationStatus);
exports.default = router;
