import React from 'react';
import { render } from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import Popup from './Popup';
import './index.css';
import { ApolloProviderAuth0 } from '../ApolloProviderAuth0/ApolloProviderAuth0';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'

render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        redirectUri={location.href}
    >
        <ApolloProviderAuth0>
            <Popup/>
        </ApolloProviderAuth0>
    </Auth0Provider>
    ,
    window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
