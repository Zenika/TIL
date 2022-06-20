import React from 'react';
import { Button } from 'primereact/button'
import './Login.css';

const Login = () => {
  const redirect = () => {
    chrome.tabs.create({
      url: `${window.location.origin}/options.html`,
    })
  }

  return (
    <div className='container'>
      <h3>Please log in to TIL from the settings page</h3>
      <Button className='p-button-sm' onClick={redirect} label='Go to settings'/>
    </div>
  )
};

export default Login;
