"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const index_resolver_1 = __importDefault(require("./graphql/resolvers/index.resolver"));
const config_1 = require("./config");
const PORT = 5000;
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: index_resolver_1.default,
});
mongoose_1.default
    .connect(config_1.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
})
    .then((res) => {
    console.log(`🚀 Server running at ${res.url}`);
});
