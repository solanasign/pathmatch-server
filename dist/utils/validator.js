"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApplicationInput = exports.validateJobInput = exports.validateRegisterInput = void 0;
const errors_1 = require("./errors");
const validateRegisterInput = (req) => {
    const { email, password, role, firstName, lastName } = req.body;
    if (!email || !password || !role || !firstName || !lastName) {
        throw new errors_1.ValidationError('All fields are required');
    }
    if (!['job_seeker', 'employer'].includes(role)) {
        throw new errors_1.ValidationError('Invalid role');
    }
    if (password.length < 8) {
        throw new errors_1.ValidationError('Password must be at least 8 characters');
    }
};
exports.validateRegisterInput = validateRegisterInput;
const validateJobInput = (req) => {
    const { title, description, requirements, responsibilities, job_type } = req.body;
    if (!title || !description || !requirements || !responsibilities || !job_type) {
        throw new errors_1.ValidationError('Missing required fields');
    }
    if (!Array.isArray(requirements) || !Array.isArray(responsibilities)) {
        throw new errors_1.ValidationError('Requirements and responsibilities must be arrays');
    }
};
exports.validateJobInput = validateJobInput;
const validateApplicationInput = (req) => {
    const { job_id } = req.body;
    if (!job_id) {
        throw new errors_1.ValidationError('Job ID is required');
    }
};
exports.validateApplicationInput = validateApplicationInput;
