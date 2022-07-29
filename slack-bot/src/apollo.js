import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import fetch from 'cross-fetch';
require('dotenv').config()

const link = createHttpLink({
    uri: process.env.HASURA_URL,
    headers: {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
    },
    fetch
})

export const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})