import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const {
    user,
    isAuthenticated,
    isLoading
    // getAccessTokenSilently
  } = useAuth0();

  // getAccessTokenSilently().then(token => {
  //   console.log(token)
  // })

  if (isLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div>
        <p>{user.email}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>Not Logged</p>
      </div>
    )
  }
};

export default Popup;
