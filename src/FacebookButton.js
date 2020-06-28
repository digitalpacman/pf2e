import React, { useState } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';

export const FacebookButton = (props) => {
  const [state, setState] = useState({
    status: 'default',
  });

  const responseFacebook = (response) => {
    console.log(response);

    const email = response.email;
    const token = response.accessToken;
    console.log("ID Token: " + token);

    setState({ status: 'signedin' });
    props.onSignIn({ email, token });
  };

  if (state.status === 'signedin') {
    return null;
  }

  return (
      <FacebookLogin
        appId="319534105735036"
        fields="name,email,picture"
        callback={responseFacebook}
      />
  ); 
}
