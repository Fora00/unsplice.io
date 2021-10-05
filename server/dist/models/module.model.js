"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contentSchema = {
    number: Number,
    title: String,
    desc: String,
    completed: Boolean,
    notionContent: String,
    createdAt: String
};
const moduleSchema = new mongoose_1.Schema({
    name: String,
    moduleCode: String,
    desc: String,
    progress: Number,
    contents: [contentSchema],
    createdAt: String
});
exports.default = (0, mongoose_1.model)('Module', moduleSchema);
