"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    institution: String,
    role: String,
    picture: String,
    socialLinks: {
        instagram: String,
        github: String,
        linkedin: String,
        website: String,
    },
    programCodes: [String],
    cratedAt: String,
});
exports.default = (0, mongoose_1.model)('User', userSchema);
