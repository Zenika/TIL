import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import './Options.css';

interface Props {
  title: string;
}

const Options = () => {
  const {
    isLoading,
    user,
    isAuthenticated,
    loginWithPopup,
    logout
  } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <button onClick={() => logout({ returnTo: location.href })}>Log Out</button>
      </div>
    )
  } else {
    return (
      <div>
        <div></div>
        <div>Pas loggé...</div>
        <button onClick={loginWithPopup}>Log In</button>
      </div>
    );
  }
};
export default Options;
