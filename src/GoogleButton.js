import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';

export const GoogleButton = (props) => {
  const [state, setState] = useState({
    status: 'default',
  });

  const responseGoogle = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
  
    // The ID token you need to pass to your backend:
    const token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + token);

    const email = profile.getEmail();
    setState({ status: 'signedin' });
    props.onSignIn({ email, token });
  };

  if (state.status === 'signedin') {
    return null;
  }

  return (
    <GoogleLogin
      clientId="378922647851-5q3eso0k4i4qbfkhtd4ob13rdep0og1p.apps.googleusercontent.com"
      render={renderProps => (
        <a className="google-button" onClick={renderProps.onClick}></a>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  );
}