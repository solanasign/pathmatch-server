"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employer_controller_1 = require("../controllers/employer.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected routes (employers only)
// More specific routes first
// @ts-ignore
router.get('/:id/jobs/:jobId/applications', auth_middleware_1.authenticate, auth_middleware_1.requireEmployerOrAdmin, employer_controller_1.getJobApplications);
// @ts-ignore
router.get('/:id/jobs', auth_middleware_1.authenticate, auth_middleware_1.requireEmployerOrAdmin, employer_controller_1.getEmployerJobs);
// General routes last
// @ts-ignore
router.get('/:id', auth_middleware_1.authenticate, auth_middleware_1.requireEmployerOrAdmin, employer_controller_1.getEmployerProfile);
// @ts-ignore
router.put('/:id', auth_middleware_1.authenticate, auth_middleware_1.requireEmployerOrAdmin, employer_controller_1.updateEmployerProfile);
exports.default = router;
