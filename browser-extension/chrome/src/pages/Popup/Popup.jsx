import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import './Popup.css';
import { ProgressSpinner } from 'primereact/progressspinner';

const Popup = () => {
  const {
    user,
    isAuthenticated,
    isLoading
  } = useAuth0();

  if (isLoading)
    return <ProgressSpinner className='center'/>;

  return isAuthenticated ? <Home username={user.name} /> : <Login />
};

export default Popup;
