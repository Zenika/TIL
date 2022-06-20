import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import './Options.css';
import { Button } from 'primereact/button'

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
      <div className='container'>
        <img src={user?.picture} alt={user?.name} width="100" />
        <h2>You are logged into <b>TIL</b> as</h2>
        <h1>{user?.name} ({user?.email})</h1>
        <Button className='p-button-sm' onClick={() => logout({ returnTo: location.href })} label="Log out"/>
      </div>
    )
  } else {
    return (
      <div className='container'>
        <h1>Please log into <b>TIL</b></h1>
        <Button className='p-button-sm' onClick={loginWithPopup} label="Log in"/>
      </div>
    );
  }
};
export default Options;
