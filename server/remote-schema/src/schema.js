const gql = require('graphql-tag');

const typeDefs = gql`
  type get_title_res {
    title: String
    error: String
  }

  type Query {
    get_title(url: String): get_title_res
    add_post_to_rss(uuid: String!, url: String!, description: String): String
  }
`;

module.exports = typeDefs