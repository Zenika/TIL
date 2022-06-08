const RSS = require('rss');
const fs = require('fs');
const path = require('path');

const feed = new RSS({
    title: 'TIL RSS feed',
    description: 'This RSS feed contains the latest posts from TIL',
    feed_url: `${process.env.REMOTE_SCHEMA_URL}/rss.xml`,
    site_url: process.env.CLIENT_URL,
})

const writeFeed = (feed) => {
    fs.writeFile(`${path.join(__dirname, '/public')}/rss.xml`, feed.xml(), err => {
        if (err) {
            console.error(err);
        }
    });
}

const addPostToFeed = (uuid, description, url) => {
    feed.item({
        title: url,
        description,
        url: `${process.env.CLIENT_URL}/post/${uuid}`
    })
    writeFeed(feed)
}

module.exports = {
    feed,
    addPostToFeed,
    writeFeed
}