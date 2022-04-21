# TIL auth0

## Requirements

Make sure to have the [Auth0 Deploy CLI](https://auth0.com/docs/deploy-monitor/deploy-cli-tool/install-and-configure-the-deploy-cli-tool) installed on your computer.

## Set up environment variables


Copy the `.env` file and rename it to `.env.local`. Fill in the different environment variables:

- `HASURA_ADMIN_SECRET` your local Hasura Admin Secret token.
- `ADMIN_USER_ID` auth0 user id to be used as admin.
- `HASURA_SYNC_USER_RULE_URL` ngork generated URL to test user syncing with Hasura.
- `AUTH0_CLIENT_ID` client id of your development `auth0-deploy-cli` application.
- `AUTH0_DOMAIN` your auth0 development tenant domain
- `AUTH0_TENANT_NAME` your auth0 development tenant name

## Deploy to development tenant

Run the following command:

`export $(cat .env.local | xargs) && a0deploy import --config_file dev-config.json --input_file tenant.yaml -x ${your auth0-deploy-cli secret}`