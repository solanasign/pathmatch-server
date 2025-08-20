"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadArray = exports.uploadSingle = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const index_1 = __importDefault(require("./index"));
// Configure multer for file uploads
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: index_1.default.upload.maxFileSize,
    },
    fileFilter: (req, file, cb) => {
        // Allow only specified file types
        if (index_1.default.upload.allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            const allowedTypes = index_1.default.upload.allowedMimeTypes
                .map(type => {
                switch (type) {
                    case 'application/pdf': return 'PDF';
                    case 'application/msword': return 'DOC';
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return 'DOCX';
                    default: return type;
                }
            })
                .join(', ');
            cb(new Error(`Only ${allowedTypes} files are allowed`));
        }
    }
});
// Export individual middleware functions for different use cases
const uploadSingle = (fieldName) => exports.upload.single(fieldName);
exports.uploadSingle = uploadSingle;
const uploadArray = (fieldName, maxCount) => exports.upload.array(fieldName, maxCount);
exports.uploadArray = uploadArray;
const uploadFields = (fields) => exports.upload.fields(fields);
exports.uploadFields = uploadFields;
