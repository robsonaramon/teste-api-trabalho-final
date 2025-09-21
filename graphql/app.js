const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const authenticate = require('./authenticate');

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authenticate
});

async function startApollo() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
}

startApollo();

module.exports = app;
