import React, { useState } from 'react';
import { MonsterDetail } from './MonsterDetail';
import { MonsterEditor } from './monster-editor';
import { GoogleButton } from './GoogleButton';
import './App.css';
import './create-page.css';

export const CreatePage = ({
  customError,
  tryLoadCustom,
  handleSignIn,
  saveCustomMonster,
  monster,
}) => {
  monster = monster || {};
  const [state, setState] = useState({ monster });

  const file = React.createRef();

  const handleUpload = () => {
    const reader = new FileReader();
    if (file.current.files[0]) {
      reader.readAsText(file.current.files[0], 'UTF-8');
      reader.onload = (evt) => {
        tryLoadCustom(evt.target.result);
      };
      reader.onerror = (evt) => {
        console.error(evt);
      };
    }
  };

  const handleOnChange = (monster) => setState({ monster });

  return (
    <div>
      <div>{customError}</div>
      <input type="file" onChange={handleUpload} ref={file} />
      <GoogleButton onSignIn={handleSignIn} />
      <button onClick={saveCustomMonster}>Save</button>
      <div className="create-layout">
        <div className="monster-preview">
          <MonsterDetail monster={state.monster} />
        </div>
        <div className="monster-editor">
          <MonsterEditor monster={state.monster} onChange={handleOnChange} />
        </div>
      </div>
    </div>
  );
};