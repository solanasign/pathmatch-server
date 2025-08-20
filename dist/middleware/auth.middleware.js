"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEmployerOrAdmin = exports.requireAdmin = exports.requireEmployer = exports.requireJobSeeker = exports.authorize = exports.authenticate = void 0;
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }
        // Decode the simple token
        const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
        // Check if token is expired
        if (tokenData.exp < Math.floor(Date.now() / 1000)) {
            res.status(401).json({ message: 'Token expired' });
            return;
        }
        req.user = {
            id: tokenData.userId,
            role: tokenData.role,
        };
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: 'Authentication required' });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Insufficient permissions' });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
// Specific role middleware functions
exports.requireJobSeeker = (0, exports.authorize)(['job_seeker']);
exports.requireEmployer = (0, exports.authorize)(['employer']);
exports.requireAdmin = (0, exports.authorize)(['admin']);
exports.requireEmployerOrAdmin = (0, exports.authorize)(['employer', 'admin']);
