"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobSeeker_controller_1 = require("../controllers/jobSeeker.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected routes (job seekers only)
// @ts-ignore
router.get('/:id', auth_middleware_1.authenticate, auth_middleware_1.requireJobSeeker, jobSeeker_controller_1.getJobSeekerProfile);
// @ts-ignore
router.put('/:id', auth_middleware_1.authenticate, auth_middleware_1.requireJobSeeker, jobSeeker_controller_1.updateJobSeekerProfile);
// @ts-ignore
router.get('/:id/applications', auth_middleware_1.authenticate, auth_middleware_1.requireJobSeeker, jobSeeker_controller_1.getJobSeekerApplications);
exports.default = router;
