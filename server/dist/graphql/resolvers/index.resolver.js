"use strict";
const userResolver = require('./user.resolver');
const moduleResolver = require('./module.resolver');
const contentResolver = require('./content.resolver');
const resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, userResolver.Query), moduleResolver.Query), contentResolver.Query),
    Mutation: Object.assign(Object.assign(Object.assign({}, userResolver.Mutation), moduleResolver.Mutation), contentResolver.Mutation),
};
module.exports = resolvers;
