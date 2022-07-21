const getTitle = require('./htmlTitleParser')
const { addPostToFeed } = require('./rssFeed')
const { searchTag } = require('./database')


const resolvers = {
    Query: {
        get_title: (_, { url }) => getTitle(url),
        add_post_to_rss: (_, { uuid, description, url }) => addPostToFeed(uuid, description, url),
        search_tag: (_, { text }) => searchTag(text)
    },
};

module.exports = resolvers