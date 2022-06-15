import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import './Popup.css';

const Popup = () => {
  const {
    user,
    isAuthenticated,
    isLoading
  } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

  return isAuthenticated ? <HomePage username={user.name}/> : <LoginPage/>
};

export default Popup;
