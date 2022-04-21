# TIL server

## Requirements

Make sure to have [Docker](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/) and the [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/) installed on your computer.

Run `npm --prefix ./remote-schema i ./remote-schema`

## Set up environment variables

Copy the `.env.dist` file and rename it to `.env`. Fill in the different environment variables:

- `HASURA_GRAPHQL_ADMIN_SECRET` can be anything. It will be used to log in the Hasura console.
- `AUTH0_DOMAIN` your auth0 development tenant domain


## Run Hasura server

Run the following command:

`docker-compose up -d remote-schema`

When the container is up and running, you can run `docker-compose up -d`.

To access the console, run `hasura console`.

## Run the hasura migrations
```
hasura migrate apply --all-databases
hasura metadata apply
```