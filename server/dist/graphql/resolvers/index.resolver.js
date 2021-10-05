"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_resolver_1 = __importDefault(require("./user.resolver"));
const module_resolver_1 = __importDefault(require("./module.resolver"));
const content_resolver_1 = __importDefault(require("./content.resolver"));
const resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, user_resolver_1.default.Query), module_resolver_1.default.Query), content_resolver_1.default.Query),
    Mutation: Object.assign(Object.assign(Object.assign({}, user_resolver_1.default.Mutation), module_resolver_1.default.Mutation), content_resolver_1.default.Mutation),
};
exports.default = resolvers;
