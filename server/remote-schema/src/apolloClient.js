const { ApolloClient, createHttpLink, InMemoryCache } = require('@apollo/client/core')
const fetch = require('cross-fetch')

const link = createHttpLink({
    uri: process.env.HASURA_URL,
    headers: {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
    },
    fetch
})

module.exports = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})