const { ApolloServer, gql } = require('apollo-server-lambda');
const typeDefs = `
    type Query {
        hello: String
    }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});


exports.handler = server.createHandler({
  cors: {
    origin: '*',
    methods: 'POST',
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Accept'
    ]
  }
});
