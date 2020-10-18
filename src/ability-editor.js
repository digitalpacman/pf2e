import React, { useState } from 'react';
import { SimpleListEditor } from './simple-list-editor';
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

  const handleTraitsChange = (ability) => {
    setState({ ...ability });
    onChange({ ability, index });
  };

  const handleStagesChange = (ability) => {
    setState({ ...ability });
    onChange({ ability, index });
  };

  return <div>
    Name <input type="text" value={state.name} onChange={createHandleOnChange('name')} />
    <select value={state.action_cost} onChange={createHandleOnChange('action_cost')}>
      <option>None</option>
      <option>Reaction</option>
      <option>Free</option>
      <option>One Action</option>
      <option>Two Actions</option>
      <option>Three Actions</option>
    </select>
    Traits <SimpleListEditor monster={ability} field="traits" onChange={handleTraitsChange} />
    Range <input type="text" value={state.range || ''} onChange={createHandleOnChange('range')} />
    Description <input type="text" value={state.description || ''} onChange={createHandleOnChange('description')} />
    Requirements <input type="text" value={state.requirements || ''} onChange={createHandleOnChange('requirements')} />
    Frequency <input type="text" value={state.frequency || ''} onChange={createHandleOnChange('frequency')} />
    Trigger <input type="text" value={state.trigger || ''} onChange={createHandleOnChange('trigger')} />
    Effect <input type="text" value={state.effect || ''} onChange={createHandleOnChange('effect')} />
    Saving Throw <input type="text" value={state.saving_throw || ''} onChange={createHandleOnChange('saving_throw')} />
    Maximum Duration <input type="text" value={state.maximum_duration || ''} onChange={createHandleOnChange('maximum_duration')} />
    Critical Success <input type="text" value={state.critical_success || ''} onChange={createHandleOnChange('critical_success')} />
    Success <input type="text" value={state.success || ''} onChange={createHandleOnChange('success')} />
    Failure <input type="text" value={state.failure || ''} onChange={createHandleOnChange('failure')} />
    Critical Failure <input type="text" value={state.critical_failure || ''} onChange={createHandleOnChange('critical_failure')} />
    Stages <SimpleListEditor monster={ability} field="stages" onChange={handleStagesChange} />
  </div>;
};

