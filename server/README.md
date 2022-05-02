# TIL server

## Requirements

Make sure to have [Docker](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/) installed on your computer.

Run `npm --prefix ./remote-schema i ./remote-schema`
Run `npm i`

## Set up environment variables

Copy the `.env.dist` file and rename it to `.env`. Fill in the different environment variables:

- `HASURA_GRAPHQL_ADMIN_SECRET` can be anything. It will be used to log in the Hasura console.
- `AUTH0_DOMAIN` your auth0 development tenant domain

## Run Hasura server

Run the following command:

`docker-compose up -d remote-schema`

When the container is up and running, you can run `docker-compose up -d`.

To access the console, run `npm run hasura-console`.

## Run the hasura migrations

```
npm run hasura-migrate
npm run hasura-metadata
```
