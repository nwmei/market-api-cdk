const { ApolloServer, gql } = require('apollo-server-lambda');
const { connectToMongoDb } = require('./utils/functions');
const { typeDefs } = require('./src/typedefs');
const { resolvers } = require('./src/resolvers');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const {SSL_CERTIFICATE} = require('./utils/config');


//connectToMongoDb().then(() => console.log("connect mongo promise responded"));

const conn = mongoose.connect('mongodb://nwmei:12345678@marketdocdb.cluster-cmwb6x2mbbal.us-east-1.docdb.amazonaws.com:27017',
  {useNewUrlParser: true, ssl: true, sslCA: SSL_CERTIFICATE, useUnifiedTopology: true });


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
  // context: ({ event, context }) => ({
  //   headers: event.headers,
  //   functionName: context.functionName,
  //   event,
  //   context
  // }),
});


exports.handler = server.createHandler({
  cors: {
    origin: '*',
    methods: 'POST',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Accept'
    ]
  }
});
