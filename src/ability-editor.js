import React, { useState } from 'react';
import './App.css';

export const AbilityEditor = ({ability, index, onChange}) => {
  const [state, setState] = useState({ ...ability });

  const createHandleOnChange = (fieldName) => {
    return (event) => {
      const value = event.target.value;
      const ability = { ...state, [fieldName]: value };
      setState({ ...ability });
      onChange({ ability, index });
    };
  };

  return <div>
    Name <input type="text" value={state.name} onChange={createHandleOnChange('name')} />
    Description <input type="text" value={state.description} onChange={createHandleOnChange('description')} />
    Action Cost 
    <select value={state.action_cost} onChange={createHandleOnChange('action_cost')}>
      <option>None</option>
      <option>Reaction</option>
      <option>Free</option>
      <option>One Action</option>
      <option>Two Actions</option>
      <option>Three Actions</option>
    </select>
    Critical Success <input type="text" value={state.critical_success || ''} onChange={createHandleOnChange('critical_success')} />
    Success <input type="text" value={state.success || ''} onChange={createHandleOnChange('success')} />
    Failure <input type="text" value={state.failure || ''} onChange={createHandleOnChange('failure')} />
    Critical Failure <input type="text" value={state.critical_failure || ''} onChange={createHandleOnChange('critical_failure')} />
  </div>;
};

