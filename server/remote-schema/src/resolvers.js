const getTitle = require('./htmlTitleParser')
const { addPostToFeed } = require('./rssFeed');
const saveTitle = require('./saveTitle');

const resolvers = {
    Query: {
        get_title: (_, { url }) => getTitle(url),
        add_post_to_rss: (_, { uuid, description, url }) => addPostToFeed(uuid, description, url),
        save_title: (_, { uuid, url }) => saveTitle(uuid, url)
    },
};

module.exports = resolvers