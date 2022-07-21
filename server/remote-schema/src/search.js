const { client } = require('./db/database')

const searchTag = async (text) => {
    console.log("wesh")
    client.query(`SELECT * FROM post`).then(console.log)
    console.log("yo")

    // console.log(text)
    // const res = await client.query(`SELECT name FROM tag ORDER BY SIMILARITY(name,'${text}') DESC LIMIT 5`)
    // console.log(res)
}

module.exports = searchTag