"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileUrl = exports.uploadFile = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// Helper functions
const uploadFile = async (bucket, path, file) => {
    const { data, error } = await exports.supabase
        .storage
        .from(bucket)
        .upload(path, file);
    if (error)
        throw error;
    return data;
};
exports.uploadFile = uploadFile;
const getFileUrl = (bucket, path) => {
    return exports.supabase
        .storage
        .from(bucket)
        .getPublicUrl(path).data.publicUrl;
};
exports.getFileUrl = getFileUrl;
