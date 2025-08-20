"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ForbiddenError = exports.AuthError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
class AuthError extends AppError {
    constructor(message) {
        super(message, 401);
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}
exports.AuthError = AuthError;
class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
