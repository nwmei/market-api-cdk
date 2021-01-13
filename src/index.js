import { ApolloServer } from  "apollo-server-express";
import express from 'express';
import { connectToMongoDb } from '../utils/functions';
import { typeDefs } from './typedefs'
import { resolvers } from './resolvers';

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