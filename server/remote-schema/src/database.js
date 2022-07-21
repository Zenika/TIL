const { Client } = require('pg')
let client;

const initPgClient = async () => {
    client = new Client()
    await client.connect()
}

const searchTag = async (text) => {
    if (text.length === 0)
        return []
    const query = {
        text: "SELECT name FROM tag ORDER BY SIMILARITY(name, $1) DESC LIMIT 5;",
        values: [text],
    }

    try {
        const res = await client.query(query, [text])
        return res.rows.map((tag) => tag.name);
    } catch (err) {
        console.log(err.stack)
    }
}

module.exports = { client, initPgClient, searchTag }