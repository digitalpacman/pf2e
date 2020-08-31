import React, { useState } from 'react';
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
  const value = fieldReader(monster, field);
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

const SimpleListEditor = ({monster, field, onChange}) => {
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

const SourceEditor = ({monster, field, onChange}) => {
  const value = monster[field]?.join(', ') || '';
  const [state, setState] = useState({ value });

  const parse = (value) => {
    const parts = value.split(' pg. ').map(x => x.trim()).filter(x => x.length > 0);
    const abbr = parts[0];
    const page_start = parts.length > 1 ? parts[1] : null;
    return { abbr, page_start };
  }

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

export const MonsterEditor = ({monster, onChange}) => {
  console.log(monster)

  return (
    <div>
      <div>
        Name <BasicValueEditor monster={monster} field="name" onChange={onChange} />
      </div>
      <div>Level <BasicValueEditor monster={monster} field="level" onChange={onChange} /></div>
      <div>Traits <SimpleListEditor monster={monster} field="traits" onChange={onChange} /></div>
      <div>Description <BasicTextEditor monster={monster} field="description" onChange={onChange} /></div>
      <div>Sources <SourceEditor monster={monster} field="source" onChange={onChange} /></div>
      <div>Senses <SimpleListEditor monster={monster} field="senses" onChange={onChange} /></div>
      <div>Languages <SimpleListEditor monster={monster} field="languages" onChange={onChange} /></div>

      <div>Str <BasicValueEditor monster={monster} field="ability_mods.str_mod" onChange={onChange} /></div>
      <div>Dex <BasicValueEditor monster={monster} field="ability_mods.dex_mod" onChange={onChange} /></div>
      <div>Con <BasicValueEditor monster={monster} field="ability_mods.con_mod" onChange={onChange} /></div>
      <div>Int <BasicValueEditor monster={monster} field="ability_mods.int_mod" onChange={onChange} /></div>
      <div>Wis <BasicValueEditor monster={monster} field="ability_mods.wis_mod" onChange={onChange} /></div>
      <div>Cha <BasicValueEditor monster={monster} field="ability_mods.cha_mod" onChange={onChange} /></div>

      <div>Items <SimpleListEditor monster={monster} field="items" onChange={onChange} /></div>
      <div>Armor Class <BasicValueEditor monster={monster} field="ac" onChange={onChange} /></div>
      <div>Armor Class Special <ArmorClassEditor monster={monster} field="ac_special" onChange={onChange} /></div>

      <div>Fort <BasicValueEditor monster={monster} field="saves.fort" onChange={onChange} /></div>
      <div>Ref <BasicValueEditor monster={monster} field="saves.ref" onChange={onChange} /></div>
      <div>Will <BasicValueEditor monster={monster} field="saves.will" onChange={onChange} /></div>

      <div>Fort Misc <BasicValueEditor monster={monster} field="saves.fort_misc" onChange={onChange} /></div>
      <div>Ref Misc <BasicValueEditor monster={monster} field="saves.ref_misc" onChange={onChange} /></div>
      <div>Will Misc <BasicValueEditor monster={monster} field="saves.will_misc" onChange={onChange} /></div>
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

  // const skillsParse = (value) => {
  //   let name = '';
  //   let bonus = null;
  //   let misc = null;
  //   for (let i = 0; i < value.length; ++i) {
  //     if (bonus === null && value[i] === '+') {
  //       bonus = '';
  //       name = name.trim();
  //       continue;
  //     }
  //     if (bonus !== null && misc === null && value[i] === ' ') {
  //       misc = '';
  //       continue;
  //     }
  //     if (misc !== null) {
  //       if (value[i] !== '(' && value[i] !== ')') {
  //         misc += value[i];
  //       }
  //     } else if (bonus !== null) {
  //       bonus += value[i];
  //     } else {
  //       name += value[i];
  //     }
  //   }

  //   const skill = { name, bonus, misc };
  //   return skill;
  // };
  
  // const skillsStringify = (value) => {
  //   const misc = value.misc !== null ? ` (${value.misc})` : '';
  //   const bonus = value.bonus !== null ? ` +${value.bonus}` : '';
  //   return `${value.name}${bonus}${misc}`;
  // };
};