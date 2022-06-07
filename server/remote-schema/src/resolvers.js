const axios = require('axios').default;
const cheerio = require('cheerio');
const RSS = require('rss');
const fs = require('fs');
const path = require('path')

const parseTitle = (body) => {
    const $ = cheerio.load(body);
    return $('head > title').text()
}

const feed = new RSS({
    title: 'TIL RSS feed',
    description: 'This RSS feed will contain the latest posts from TIL',
    feed_url: `${process.env.REMOTE_SCHEMA_URL}/rss.xml`,
    site_url: process.env.CLIENT_URL,
})

const resolvers = {
    Query: {
        get_title: (_, { url }) => {
            try {
                return axios(url)
                    .then(res => res.data)
                    .then(body => parseTitle(body))
                    .then(title => ({ title }))
                    .catch(e => ({ error: e.message }))
            } catch (e) {
                return { error: e.message };
            }
        },
        add_post_to_rss: (_, { uuid, description, url }) => {
            feed.item({
                title: url,
                description,
                url: `${process.env.CLIENT_URL}/post/${uuid}`
            })
            fs.writeFile(`${path.join(__dirname, '/public')}/rss.xml`, feed.xml(), err => {
                if (err) {
                    console.error(err);
                }
            });
        }
    },
};

module.exports = resolvers