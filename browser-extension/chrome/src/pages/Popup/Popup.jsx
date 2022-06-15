import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import './Popup.css';

const Popup = () => {
  const {
    user,
    isAuthenticated,
    isLoading
  } = useAuth0();

  if (isLoading)
    return <p>Loading</p>

  return isAuthenticated ? <Home username={user.name}/> : <Login/>
};

export default Popup;
