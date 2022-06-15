import React from 'react';
import { render } from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import Popup from './Popup';
import './index.css';
import { ApolloProviderAuth0 } from '../ApolloProviderAuth0/ApolloProviderAuth0';

render(
    <Auth0Provider
        domain="dev-iagwdw5k.us.auth0.com"
        clientId="iHciVU4olh5PoOPDbSFYe1NmEm78bd6v"
        audience='http://localhost:8080/v1/graphql'
        redirectUri={location.href}
    >
        <ApolloProviderAuth0>
            <Popup title={'Settings'} />
        </ApolloProviderAuth0>
    </Auth0Provider>
    ,
    window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
