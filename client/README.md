# TIL client

## Requirements
Make sure to have [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed, then run `npm i`

## Set up environment variables

Copy the `.env` file and rename it to `.env.local`. Fill in the different environment variables:

- `VUE_APP_AUTH0_DOMAIN` domain name of your Auth0 development tenant.
- `VUE_APP_AUTH0_CLIENT_ID` client id from your Auth0 development tenant.
- `VUE_APP_HASURA_HTTP` should be `http://localhost:8080/v1/graphql`.
- `VUE_APP_HASURA_WSS` should be `ws://localhost:8080/v1/graphql`.

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Lints and fixes files
```
npm run lint
```

## Unit tests
```
npm run test:unit
```