import React, { useState } from 'react';
import './App.css';

export const DamageEditor = ({damage, index, onChange}) => {
  const [state, setState] = useState({ ...damage });

  const createHandleOnChange = (fieldName) => {
    return (event) => {
      const value = event.target.value;
      const damage = { ...state, [fieldName]: value };
      setState({ ...damage });
      onChange({ damage, index });
    };
  };

  return <div>
    Formula <input type="text" value={state.formula} onChange={createHandleOnChange('formula')} />
    Type <input type="text" value={state.type} onChange={createHandleOnChange('type')} />
  </div>;
};

