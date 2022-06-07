const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express')
const http = require('http')
const { ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')
const path = require('path')

// const context = ({ req }) => {
//   return { headers: req.headers };
// };

const startApolloServer = async () => {
  const app = express();
  app.use(express.static(path.join(__dirname, '/public')));
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    /*context,*/
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageDisabled(),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 8080 }, resolve));
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
}

startApolloServer()