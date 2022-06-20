import React from 'react';
import { render } from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import Options from './Options';
import './index.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'

render(
  <Auth0Provider
    domain="dev-iagwdw5k.us.auth0.com"
    clientId="iHciVU4olh5PoOPDbSFYe1NmEm78bd6v"
    redirectUri={location.href}
  >
    <Options title={'Settings'} />
  </Auth0Provider>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
