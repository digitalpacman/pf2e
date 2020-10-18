import React, { useState } from 'react';
import { SimpleListEditor } from './simple-list-editor';
import './App.css';

export const AttackEditor = ({attack, index, onChange}) => {

  const damage = attack.damage || [];
  const damages = attack.damage.map(({formula, type}, i) => {
    const prefix = damage.length > 2 && i === damage.length - 1 ? ', and' : i > 0 ? ',' : '';
    return [prefix, formula, type].filter(x => !!x).join(' ');
  }).join('');

  const [state, setState] = useState({ attack, damages });

  const createHandleOnChange = (fieldName) => {
    return (event) => {
      const value = event.target.value;
      const attack = { ...state.attack, [fieldName]: value };
      setState({ ...state, attack });
      onChange({ attack, index });
    };
  };

  const handleTraitsChange = (attack) => {
    setState({ ...state, attack });
    onChange({ attack, index });
  };

  const handleDamageOnChange = (event) => {
    const damages = event.target.value;
    const damage = damages.split(/ plus |, and|, /gi)
      .map(x => x.trim())
      .filter(x => x.length > 0)
      .map(x => {
        console.log(x);
        const [, formulaMatch, typeMatch] = (/((?:\d+d\d+)?(?:[-+]?\d+)?)\s*(.*)+/).exec(x);
        const formula = formulaMatch ? formulaMatch.trim() || null : null;
        const type = typeMatch ? typeMatch.trim() || null : null;
        return { formula, type };
      });

    const attack = state.attack;
    attack.damage = damage;
    setState({ attack, damages });
    onChange({ attack, index });
  };

  return <div>
    Name <input type="text" value={state.attack.name} onChange={createHandleOnChange('name')} />
    <select value={state.attack.action_cost} onChange={createHandleOnChange('action_cost')}>
      <option>None</option>
      <option>Reaction</option>
      <option>Free</option>
      <option>One Action</option>
      <option>Two Actions</option>
      <option>Three Actions</option>
    </select>
    Attack Bonus <input type="text" value={state.attack.attack_bonus || ''} onChange={createHandleOnChange('attack_bonus')} />
    Traits <SimpleListEditor monster={state.attack} field="traits" onChange={handleTraitsChange} />
    Damage <input type="text" value={state.damages} onChange={handleDamageOnChange} />
    Effect <input type="text" value={state.attack.effect || ''} onChange={createHandleOnChange('effect')} />
    
  </div>;
};

