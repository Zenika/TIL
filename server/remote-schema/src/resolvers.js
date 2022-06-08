const getTitle = require('./htmlTitleParser')
const {addPostToFeed} = require('./rssFeed')

const resolvers = {
    Query: {
        get_title: (_, { url }) => getTitle(url),
        add_post_to_rss: (_, { uuid, description, url }) => addPostToFeed(uuid, description, url)
    },
};

module.exports = resolvers