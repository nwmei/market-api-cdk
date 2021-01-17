const { ApolloServer, gql } = require('apollo-server-lambda');
const { connectToMongoDb } = require('./utils/functions');
const { typeDefs } = require('./src/typedefs');
const { resolvers } = require('./src/resolvers');
const mongoose = require('mongoose');
const {SSL_CERTIFICATE} = require('./utils/config');


const conn = mongoose.connect('mongodb+srv://market-api:zxBPlyAJ4mGbtSUG@cma-db-prod-cluster.wdr9z.mongodb.net/market-db?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true });

//ssl: true, sslCA: SSL_CERTIFICATE,
// mongodb://nwmei:12345678@marketdocdb.cluster-cmwb6x2mbbal.us-east-1.docdb.amazonaws.com:27017
//mongodb+srv://market-api:<password>@cma-db-prod-cluster.wdr9z.mongodb.net/<dbname>?retryWrites=true&w=majority
// market-api
//zxBPlyAJ4mGbtSUG
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
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
