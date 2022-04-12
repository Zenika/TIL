const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');
const gql = require('graphql-tag');
const axios = require('axios').default;
const cheerio = require('cheerio');

const parseTitle = (body) => {
  const $ = cheerio.load(body);
  return $('head > title').text()
}

const resolvers = {
  Query: {
    get_title: (parent, args, context, info) => {
      try {
        return axios(args.url)
          .then(res => res.data)
          .then(body => parseTitle(body))
          .then(title => ({ title }))
          .catch(e => ({ error: e.message }))
      } catch (e) {
        return { error: e.message };
      }
    },
  },
};

const typeDefs = gql`
  type get_title_res {
    title: String
    error: String
  }

  type Query {
    get_title(url: String): get_title_res
  }
`;

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

