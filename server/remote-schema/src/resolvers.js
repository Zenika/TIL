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

module.exports = resolvers