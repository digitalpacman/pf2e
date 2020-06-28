import React from 'react';
import { MonsterDetail } from './MonsterDetail';
import { Link } from 'react-router-dom';
import { GoogleButton } from './GoogleButton';
import { FacebookButton } from './FacebookButton';
import './App.css';

export const ImportPage = (x) => {
  return (
    <div>
      <Link to="/">Back</Link>
      <div>{x.customError}</div>
      <textarea onChange={x.tryLoadCustom}></textarea>
      <GoogleButton onSignIn={x.handleSignIn} />
      <FacebookButton onSignIn={x.handleSignIn} />
      <button onClick={x.saveCustomMonster}>Save</button>
      <MonsterDetail monster={x.selected} />
    </div>
  );
};