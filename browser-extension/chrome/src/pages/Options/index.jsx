import React from 'react';
import { render } from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import Options from './Options';
import './index.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'

render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={location.href}
  >
    <Options/>
  </Auth0Provider>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
