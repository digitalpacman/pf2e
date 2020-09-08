import React, { useState } from 'react';

export const SimpleListEditor = ({monster, field, onChange}) => {
  const value = monster[field]?.join(', ') || '';
  const [state, setState] = useState({ value });

  const handleOnChange = (event) => {
    const value = event.target.value;
    const values = value.split(',').map(x => x.trim()).filter(x => x.length > 0);
    monster[field] = values.length > 0 ? values : null;
    setState({ value });
    onChange(monster);
  };
  
  return <input type="text" value={state.value} onChange={handleOnChange} />;
};