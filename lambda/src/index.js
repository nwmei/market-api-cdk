const { ApolloServer } =  require("apollo-server-express");
const express = require('express');
const { connectToMongoDb } = require('../utils/functions');
const { typeDefs } = require('./typedefs')
const { resolvers } = require('./resolvers');

const startServer = async () => {
    await connectToMongoDb();

    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app });
    
    app.listen({ port: 4000 }, () => {
      console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
    });
};

startServer();