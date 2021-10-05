"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const index_resolver_1 = __importDefault(require("./graphql/resolvers/index.resolver"));
const config_1 = require("./config");
const filename = process.env.ENV === 'test' ? '.env.test' : '.env';
dotenv.config();
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: index_resolver_1.default,
});
mongoose_1.default
    .connect(config_1.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: process.env.DB_PORT });
})
    .then((res) => {
    console.log('🍅', { port: process.env.DB_PORT });
    console.log(`🚀 Server running at ${res.url}`);
});
