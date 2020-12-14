import React, { useState } from 'react';
import { AbilityEditor } from './ability-editor';
import { AttackEditor } from './attack-editor';
import { SimpleListEditor } from './simple-list-editor';
import './App.css';

const fieldReader = (obj, field) => {
  if (field.indexOf('.') !== -1) {
    const fields = field.split('.');
    for (let i = 0; i < fields.length; ++i) {
      obj = obj[fields[i]];
      if (obj === undefined) {
        return null;
      }
    }

    return obj;
  } else {
    return obj[field] || null;
  }
};

const fieldWriter = (obj, field, value) => {
  if (field.indexOf('.') !== -1) {
    const fields = field.split('.');
    for (let i = 0; i < fields.length - 1; ++i) {
      if (!obj[fields[i]]) {
        obj[fields[i]] = {}
      }
      obj = obj[fields[i]];
    }
    obj[fields[fields.length - 1]] = value;
  } else {
    obj[field] = value;
  }
};

const BasicValueEditor = ({monster, field, onChange}) => {
  const readerValue = fieldReader(monster, field);
  const value = readerValue === null ? '' : readerValue;
  const [state, setState] = useState({ value });

  const handleOnChange = (event) => {
    const value = event.target.value;
    fieldWriter(monster, field, value);
    setState({ value });
    onChange(monster);
  };

  return <input type="text" value={state.value} onChange={handleOnChange} />;
};

const BasicTextEditor = ({monster, field, onChange}) => {
  const value = monster[field];
  const [state, setState] = useState({ value });

  const handleOnChange = (event) => {
    const value = event.target.value;
    monster[field] = value;
    setState({ value });
    onChange(monster);
  };

  return <textarea value={state.value} onChange={handleOnChange} />;
};

const SourceEditor = ({monster, field, onChange}) => {
  const parse = (value) => {
    const parts = value.split(' pg. ').map(x => x.trim()).filter(x => x.length > 0);
    const abbr = parts[0];
    const page_start = parts.length > 1 ? parts[1] : null;
    return { abbr, page_start };
  }

  const stringify = ({abbr, page_start}) => {
    if (page_start) {
      return `${abbr} pg. ${page_start}`;
    }
    return abbr;
  };

  const value = monster[field]?.map(stringify).join(', ') || '';
  const [state, setState] = useState({ value });

  const handleOnChange = (event) => {
    const value = event.target.value;
    const values = value.split(',').map(x => x.trim()).filter(x => x.length > 0)
      .map(parse);
    monster[field] = values.length > 0 ? values : null;
    setState({ value });
    onChange(monster);
  };
  
  return <input type="text" value={state.value} onChange={handleOnChange} />;
};

const QuantifiedListEditor = ({monster, field, onChange}) => {
  const parse = (value) => {
    const parts = value.split(' ').map(x => x.trim()).filter(x => x.length > 0);
    const last = parts[parts.length - 1];
    const amount = isNaN(last) && parts.length > 1 ? null : last;
    const type = (amount ? parts.slice(0, parts.length - 1) : parts).join(' ');
    return { type, amount };
  };

  const stringify = ({type, amount}) => {
    const value = amount ? `${type} ${amount}` : type;
    return value;
  };

  const value = monster[field]?.map(stringify).join(', ') || '';
  const [state, setState] = useState({ value });

  const handleOnChange = (event) => {
    const value = event.target.value;
    const values = value.split(',').map(x => x.trim()).filter(x => x.length > 0)
      .map(parse);
    monster[field] = values.length > 0 ? values : null;
    setState({ value });
    onChange(monster);
  };
  
  return <input type="text" value={state.value} onChange={handleOnChange} />;
};

const ArmorClassEditor = ({monster, field, onChange}) => {
  const value = monster[field]?.map(x => x.descr).join(', ') || '';
  const [state, setState] = useState({ value });

  const handleOnChange = (event) => {
    const value = event.target.value;
    const values = value.split(',').map(x => x.trim()).filter(x => x.length > 0)
      .map(descr => ({descr}));
    monster[field] = values.length > 0 ? values : null;
    setState({ value });
    onChange(monster);
  };
  
  return <input type="text" value={state.value} onChange={handleOnChange} />;
};

const AbilityListEditor = ({monster, field, onChange}) => {
  const value = monster[field] || [];
  const [state, setState] = useState({ value });

  const handleOnChange = ({ ability, index }) => {
    console.log(ability, index)
    const value = [...state.value];
    value[index] = ability;
    monster[field] = value;
    setState({ value });
    onChange(monster);
  };

  return state.value.map((ability, i) => 
    <div key={i}>
      <AbilityEditor index={i} ability={ability} onChange={handleOnChange} />
    </div>
  );
};

const AttackListEditor = ({monster, field, onChange}) => {
  const value = monster[field] || [];
  const [state, setState] = useState({ value });

  const handleOnChange = ({ attack, index }) => {
    console.log(attack, index)
    const value = [...state.value];
    value[index] = attack;
    monster[field] = value;
    setState({ value });
    onChange(monster);
  };

  return state.value.map((attack, i) => 
    <div key={i}>
      <AttackEditor index={i} attack={attack} onChange={handleOnChange} />
    </div>
  );
};

export const MonsterEditor = ({monster, onChange}) => {
  console.log(monster)

  return (
    <div className="editor-container">
      <div className="editor-name">
        Name <BasicValueEditor monster={monster} field="name" onChange={onChange} />
      </div>
      <div className="editor-level">Level <BasicValueEditor monster={monster} field="level" onChange={onChange} /></div>
      <div className="editor-traits">Traits <SimpleListEditor monster={monster} field="traits" onChange={onChange} /></div>
      <div className="editor-descr">Description <BasicTextEditor monster={monster} field="description" onChange={onChange} /></div>
      <div className="editor-sources">Sources <SourceEditor monster={monster} field="source" onChange={onChange} /></div>
      <div className="editor-perception">Perception <BasicValueEditor monster={monster} field="perception" onChange={onChange} /></div>
      <div className="editor-senses">Senses <SimpleListEditor monster={monster} field="senses" onChange={onChange} /></div>
      <div className="editor-languages">Languages <SimpleListEditor monster={monster} field="languages" onChange={onChange} /></div>

      <div className="editor-physical-mods">
        <div>Str <BasicValueEditor monster={monster} field="ability_mods.str_mod" onChange={onChange} /></div>
        <div>Dex <BasicValueEditor monster={monster} field="ability_mods.dex_mod" onChange={onChange} /></div>
        <div>Con <BasicValueEditor monster={monster} field="ability_mods.con_mod" onChange={onChange} /></div>
      </div>
      <div className="editor-mental-mods">
        <div>Int <BasicValueEditor monster={monster} field="ability_mods.int_mod" onChange={onChange} /></div>
        <div>Wis <BasicValueEditor monster={monster} field="ability_mods.wis_mod" onChange={onChange} /></div>
        <div>Cha <BasicValueEditor monster={monster} field="ability_mods.cha_mod" onChange={onChange} /></div>
      </div>

      <div className="editor-items">Items <SimpleListEditor monster={monster} field="items" onChange={onChange} /></div>
      <div className="editor-armor-class">Armor Class <BasicValueEditor monster={monster} field="ac" onChange={onChange} /></div>
      <div className="editor-armor-class-misc">Armor Class Special <ArmorClassEditor monster={monster} field="ac_special" onChange={onChange} /></div>

      <div className="editor-fort">Fort <BasicValueEditor monster={monster} field="saves.fort" onChange={onChange} /></div>
      <div className="editor-fort-misc">Fort Misc <BasicValueEditor monster={monster} field="saves.fort_misc" onChange={onChange} /></div>
      <div className="editor-ref">Ref <BasicValueEditor monster={monster} field="saves.ref" onChange={onChange} /></div>
      <div className="editor-ref-misc">Ref Misc <BasicValueEditor monster={monster} field="saves.ref_misc" onChange={onChange} /></div>
      <div className="editor-will">Will <BasicValueEditor monster={monster} field="saves.will" onChange={onChange} /></div>
      <div className="editor-will-misc">Will Misc <BasicValueEditor monster={monster} field="saves.will_misc" onChange={onChange} /></div>
      <div className="editor-saves-misc">Saves Misc <BasicValueEditor monster={monster} field="saves.misc" onChange={onChange} /></div>

      <div className="editor-hp">HP <BasicValueEditor monster={monster} field="hp" onChange={onChange} /></div>
      <div className="editor-hp-misc">HP Misc <BasicValueEditor monster={monster} field="hp_misc" onChange={onChange} /></div>

      <div className="editor-immunities">Immunities <SimpleListEditor monster={monster} field="immunities" onChange={onChange} /></div>
      <div className="editor-resistances">Resistances <QuantifiedListEditor monster={monster} field="resistances" onChange={onChange} /></div>
      <div className="editor-weaknesses">Weaknesses <QuantifiedListEditor monster={monster} field="weaknesses" onChange={onChange} /></div>

      <div className="editor-speed">Speed <QuantifiedListEditor monster={monster} field="speed" onChange={onChange} /></div>

      <div className="editor-abilities"><hr />Sense Abilities <AbilityListEditor monster={monster} field="sense_abilities" onChange={onChange} /></div>
      <div className="editor-abilities"><hr />Automatic Abilities <AbilityListEditor monster={monster} field="automatic_abilities" onChange={onChange} /></div>
      <div className="editor-abilities"><hr />Melee Attacks <AttackListEditor monster={monster} field="melee_attacks" onChange={onChange} /></div>
      <div className="editor-abilities"><hr />Ranged Attacks <AttackListEditor monster={monster} field="ranged_attacks" onChange={onChange} /></div>
      <div className="editor-abilities"><hr />Active Abilities <AbilityListEditor monster={monster} field="active_abilities" onChange={onChange} /></div>

      <div className="ability-floater">
        
      </div>
    </div>
  );

  // const sourceParse = (value) => {
  //   const parts = value.split(' pg. ');
  //   const abbr = parts[0];
  //   const page_start = parts.length > 1 ? parts[1] : null;
  //   return { abbr, page_start };
  // };

  // const sourceStringify = (value) => {
  //   return value.page_start !== null ? `${value.abbr} pg. ${value.page_start}` : value.abbr;
  // };

  
  
  // const skillsStringify = (value) => {
  //   const misc = value.misc !== null ? ` (${value.misc})` : '';
  //   const bonus = value.bonus !== null ? ` +${value.bonus}` : '';
  //   return `${value.name}${bonus}${misc}`;
  // };
};