"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_controller_1 = require("../controllers/job.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/', job_controller_1.getJobs);
router.get('/:id', job_controller_1.getJob);
// Protected routes (employers only)
router.post('/', auth_middleware_1.authenticate, auth_middleware_1.requireEmployerOrAdmin, job_controller_1.createJob);
router.put('/:id', auth_middleware_1.authenticate, auth_middleware_1.requireEmployerOrAdmin, job_controller_1.updateJob);
router.delete('/:id', auth_middleware_1.authenticate, auth_middleware_1.requireEmployerOrAdmin, job_controller_1.deleteJob);
exports.default = router;
