import React from 'react';
import { MonsterDetail } from './MonsterDetail';
import { Link } from 'react-router-dom';
import { GoogleButton } from './GoogleButton';
import './App.css';

export const CreatePage = ({
  customError,
  tryLoadCustom,
  handleSignIn,
  saveCustomMonster,
  selected,
}) => {
  console.log(selected)
  const file = React.createRef();

  const handleUpload = () => {
    const reader = new FileReader();
    if (file.current.files[0]) {
      reader.readAsText(file.current.files[0], 'UTF-8');
      reader.onload = (evt) => {
        tryLoadCustom(evt.target.result);
      };
      reader.onerror = (evt) => {
        console.log(evt);
      };
    }
  };

  return (
    <div>
      <div>{customError}</div>
      <input type="file" onChange={handleUpload} ref={file} />
      <GoogleButton onSignIn={handleSignIn} />
      <button onClick={saveCustomMonster}>Save</button>
      <MonsterDetail monster={selected} />
    </div>
  );
};