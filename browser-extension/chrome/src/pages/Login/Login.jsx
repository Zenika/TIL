import React from 'react';

const Login = () => {
  const redirect = () => {
    chrome.tabs.create({
      url: `${window.location.origin}/options.html`,
    })
  }

  return (
    <div>
      <p>Please log in to TIL from the settings page</p>
      <button onClick={redirect}>Go to settings</button>
    </div>
  )
};

export default Login;
