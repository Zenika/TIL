const cheerio = require('cheerio');
const axios = require('axios').default;

const parseTitle = (body) => {
    const $ = cheerio.load(body);
    return $('head > title').text()
}

const getTitle = (url) => {
    try {
        return axios(url)
            .then(res => res.data)
            .then(body => parseTitle(body))
            .then(title => ({ title }))
            .catch(e => ({ error: e.message }))
    } catch (e) {
        return { error: e.message };
    }
}

module.exports = getTitle