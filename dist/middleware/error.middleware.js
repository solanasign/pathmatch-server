"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFound = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    // Handle specific error types
    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: 'Validation error',
            errors: err.message
        });
        return;
    }
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            message: 'Unauthorized access'
        });
        return;
    }
    // Default error response
    res.status(500).json({
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res) => {
    res.status(404).json({
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
};
exports.notFound = notFound;
// Async error wrapper for controllers
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
