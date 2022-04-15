import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import MenuBar from 'primevue/menubar';
import ListBox from 'primevue/listbox';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import InlineMessage from 'primevue/inlinemessage';
import DataView from 'primevue/dataview';
import Paginator from 'primevue/paginator';
import '/node_modules/primeflex/primeflex.css'

import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, concat, split } from '@apollo/client/core'
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { DefaultApolloClient } from '@vue/apollo-composable'


// import { createAuth0, useAuth0 } from '@auth0/auth0-vue';

// const authMiddleware = new ApolloLink(async (operation, forward) => {
//   const { getAccessTokenSilently, isAuthenticated } = operation.getContext().auth0 || useAuth0();

//   if (isAuthenticated.value) {
//     const token = await getAccessTokenSilently()
//     // add the authorization to the headers
//     operation.setContext({
//       headers: {
//         ...(token ? { authorization: `Bearer ${token}` } : {}),
//       }
//     });
//   }
//   return forward(operation);
// })

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_HASURA_HTTP,
})

const wsLink = new WebSocketLink({
  uri: process.env.VUE_APP_HASURA_WSS,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  // link: concat(authMiddleware, link),
  link,
  cache: new InMemoryCache(),
})

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
}).use(router)
  // .use(createAuth0({
  //   domain: process.env.VUE_APP_AUTH0_DOMAIN,
  //   client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
  //   audience: process.env.VUE_APP_HASURA_HTTP,
  //   redirect_uri: window.location.origin
  // }))
  .use(PrimeVue)
  .component('Button', Button)
  .component('ProgressSpinner', ProgressSpinner)
  .component('Card', Card)
  .component('MenuBar', MenuBar)
  .component('ListBox', ListBox)
  .component('InputText', InputText)
  .component('TextArea', TextArea)
  .component('InlineMessage', InlineMessage)
  .component('DataView', DataView)
  .component('Paginator', Paginator)
  .mount('#app')
