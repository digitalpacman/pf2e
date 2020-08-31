import React, { useState } from 'react';
import './App.css';

const BasicValueEditor = ({monster, field, onChange}) => {
  const value = monster[field];
  const [state, setState] = useState({ value });

  const handleOnChange = (event) => {
    const value = event.target.value;
    monster[field] = value;
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