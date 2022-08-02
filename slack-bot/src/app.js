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
    mutation MyMutation(
        $url: String!,
        $description: String,
        $post_tag_insert_input: [post_tag_insert_input!]!
        ) {
        insert_post_one(object: {
            url: $url,
            user_id: "test",
            description: $description
            post_tags: { data: $post_tag_insert_input }
        }) {
            add_post_to_rss
        }
    }
`

const extractUrls = (event) => {
    if (event && event.attachments)
        return event.attachments.map(attachment => attachment.from_url)

    const urlRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g
    return event.text.match(urlRegex);
}

app.event('app_mention', async ({ event, client }) => {
    const urls = extractUrls(event)

    if (urls) {
        const { user } = await client.users.info({
            user: event.user,
        });

        const { channel } = await client.conversations.info({
            channel: event.channel
        })

        const tag = [
            {
                tag: {
                    data: { name: channel.name.toLowerCase() },
                    on_conflict: {
                        constraint: "tag_name_key",
                        update_columns: ["blank"],
                    },
                },
            }
        ]

        urls.forEach(url => {
            apolloClient.mutate({
                mutation,
                variables: {
                    url,
                    description: `Shared by ${user.name}`,
                    post_tag_insert_input: tag
                }
            }).then(console.log)
                .catch(console.error)
        })
    }
});