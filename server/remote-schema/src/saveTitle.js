const getTitle = require("./htmlTitleParser")
const { gql } = require('apollo-server-core')
const apolloClient = require('./apolloClient')

const mutation = gql`
    mutation MyMutation($uuid: uuid!, $title: String!) {
        update_post_by_pk(pk_columns: {uuid: $uuid}, _set: {title: $title}) {
            title
        }
    }
`

const saveTitle = (uuid, url) => {
    getTitle(url).then(({title}) => {
        console.log(uuid, title)
        apolloClient.mutate({
            mutation,
            variables: {
                uuid,
                title
            }
        }).then(console.log)
            .catch(console.error)
    })
}

module.exports = saveTitle