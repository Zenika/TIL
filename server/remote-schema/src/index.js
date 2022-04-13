const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')

// const context = ({ req }) => {
//   return { headers: req.headers };
// };

const schema = new ApolloServer({
  typeDefs, resolvers, /*context,*/ plugins: [
    ApolloServerPluginLandingPageDisabled(),
  ]
});
schema.listen({ port: 8080 }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});

