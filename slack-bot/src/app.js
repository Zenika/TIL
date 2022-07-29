import { gql } from '@apollo/client/core';
import { App } from '@slack/bolt';
import { apolloClient } from './apollo'
require('dotenv').config()

const app = new App({
    token: process.env.SLACK_TOKEN,
    signingSecret: process.env.SLACK_SIGNIN_SECRET
});

(async () => {
    await app.start(process.env.PORT || 8888);

    console.log('⚡️ Bolt app is running!');
})();

const mutation = gql`
    mutation MyMutation($url: String!) {
        insert_post_one(object: {url: $url, user_id: "test"}) {
            add_post_to_rss
        }
    }
`

app.event('app_mention', async ({ event }) => {
    console.log(event)

    if (event && event.attachments && event.attachments[0] && event.attachments[0].from_url) {
        const url = event.attachments[0].from_url
        console.log(url)

        apolloClient.mutate({
            mutation,
            variables: {
                url
            }
        }).then(console.log)
            .catch(console.error)
    }
});