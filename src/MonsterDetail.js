import React, { useState } from 'react';
import './App.css';
import * as renderer from './renderers';
import { h1, h2, div } from './editor';

export const MonsterDetail = ({monster: x}) => {
  const [state, setState] = useState({ monster: x });

  if (!x) {
    return null;
  } else {
    if (!state.monster) {
      setState({ monster: x });
      return null;
    }
  }

  const handleOnEditSave = (editValue, componentResetState) => {
    setState({ 
      ...state, 
      editValue, 
      componentResetState,
      monster: { ...state.monster, [state.editField]: editValue }
    });
  };

  const handleStartEdit = (field) => {
    // event.stopPropagation();
    const editField = state.editField === field ? null : field;
    const editValue = state.monster[editField];
    setState({ ...state, editField, editValue });
  };

  const editorProps = {
    editField: state.editField,
    componentResetState: state.componentResetState,
    onSave: handleOnEditSave,
  };

  const closeEditor = () => {
    const editField = null;
    setState({ ...state, editField });
  };

  const sourceParse = (value) => {
    const parts = value.split(' pg. ');
    const abbr = parts[0];
    const page_start = parts.length > 1 ? parts[1] : null;
    return { abbr, page_start };
  };

  const sourceStringify = (value) => {
    return value.page_start !== null ? `${value.abbr} pg. ${value.page_start}` : value.abbr;
  };

  const skillsParse = (value) => {
    let name = '';
    let bonus = null;
    let misc = null;
    for (let i = 0; i < value.length; ++i) {
      if (bonus === null && value[i] === '+') {
        bonus = '';
        name = name.trim();
        continue;
      }
      if (bonus !== null && misc === null && value[i] === ' ') {
        misc = '';
        continue;
      }
      if (misc !== null) {
        if (value[i] !== '(' && value[i] !== ')') {
          misc += value[i];
        }
      } else if (bonus !== null) {
        bonus += value[i];
      } else {
        name += value[i];
      }
    }

    const skill = { name, bonus, misc };
    return skill;
  };
  
  const skillsStringify = (value) => {
    const misc = value.misc !== null ? ` (${value.misc})` : '';
    const bonus = value.bonus !== null ? ` +${value.bonus}` : '';
    return `${value.name}${bonus}${misc}`;
  };

  return (
    <div key={x.name} className="monster tan-background">
      <h1.FieldEditor fields={['name', 'level']} editValue={state.monster.name} {...editorProps}>
        <a className="name" href={x.url} onClick={() => handleStartEdit('name')}>{state.monster.name}</a>
        <span className="name" onClick={() => handleStartEdit('level')}> Level {state.monster.level}</span>
      </h1.FieldEditor>
      <h2.SetEditor fields="traits" editValue={state.monster.traits} onClick={() => handleStartEdit('traits')} {...editorProps}>
        {state.monster.traits.map((trait, i) => renderer.renderTrait(trait, i))}
      </h2.SetEditor>
      <div.TextAreaEditor fields="description" editValue={state.monster.description} className="description" onClick={() => handleStartEdit('description')} {...editorProps}>
        {renderer.markdown(x.description)}
      </div.TextAreaEditor>
      <div.SetEditor 
        hidden={!state.monster.source} 
        fields="source" 
        editValue={state.monster.source}
        onClick={() => handleStartEdit('source')} 
        parse={sourceParse} 
        stringify={sourceStringify}
        {...editorProps}
      >
        <strong>Source</strong> {state.monster.source?.map(renderer.renderSource)}
      </div.SetEditor>
      <div.SetEditor hidden={!state.monster.senses} fields="senses" editValue={state.monster.senses} onClick={() => handleStartEdit('senses')} {...editorProps}>
        <strong>Senses</strong> {state.monster.senses?.map(renderer.renderCsv)}
      </div.SetEditor>
      <div.SetEditor hidden={!state.monster.languages} fields="languages" editValue={state.monster.languages} onClick={() => handleStartEdit('languages')} {...editorProps}>
        <strong>Languages</strong> {state.monster.languages?.map(renderer.renderCsv)}
      </div.SetEditor>
      <div.SetEditor hidden={!state.monster.skills} fields="skills" editValue={state.monster.skills} onClick={() => handleStartEdit('skills')} {...editorProps}
        parse={skillsParse} stringify={skillsStringify}>
        <strong>Skills</strong> {state.monster.skills?.map(renderer.renderSkills)}
      </div.SetEditor>
      <div>
        <span className="csv"><strong>Str</strong> {renderer.signed(x.ability_mods.str_mod)}</span>
        <span className="csv"><strong>Dex</strong> {renderer.signed(x.ability_mods.dex_mod)}</span>
        <span className="csv"><strong>Con</strong> {renderer.signed(x.ability_mods.con_mod)}</span>
        <span className="csv"><strong>Int</strong> {renderer.signed(x.ability_mods.int_mod)}</span>
        <span className="csv"><strong>Wis</strong> {renderer.signed(x.ability_mods.wis_mod)}</span>
        <span className="csv"><strong>Cha</strong> {renderer.signed(x.ability_mods.cha_mod)}</span>
      </div>
      <div>
        {x.sense_abilities?.map(a => renderer.renderAbility(a, x))}
      </div>
      {renderer.ifExists(x.items, (
        <div><strong>Items</strong> {x.items?.map(renderer.renderCsv)}</div>
      ))}
      <hr />
      <div>
        <span>
          <span className="csv"><strong>AC</strong> {x.ac}{renderer.ifExists(x.ac_special, (<span> ({x.ac_special?.map(ac => ac.descr).map(renderer.renderCsv)})</span>))}</span>
          {renderer.renderSave('Fort', x.saves.fort, x.saves.fort_misc)}
          {renderer.renderSave('Ref', x.saves.ref, x.saves.ref_misc)}
          {renderer.renderSave('Will', x.saves.will, x.saves.will_misc)}
        </span>
        {renderer.ifExists(x.saves.misc, (
          <span>; {x.saves.misc}</span>
        ))}
      </div>
      <div><strong>HP</strong> {x.hp}{renderer.ifExists(x.hp_misc, (<span> ({x.hp_misc})</span>))}{renderer.ifExists(x.immunities, (<span>; <strong>Immunities</strong> {x.immunities?.map(renderer.renderCsv)}</span>))}{renderer.ifExists(x.resistances, (<span>; <strong>Resistances</strong> {x.resistances?.map(a => renderer.renderSpeed(a, x))}</span>))}{renderer.ifExists(x.weaknesses, (<span>; <strong>Weaknesses</strong> {x.weaknesses?.map(a => renderer.renderSpeed(a, x))}</span>))}</div>
      <div>
        {x.automatic_abilities?.map(a => renderer.renderAbility(a, x))}
      </div>
      <hr />
      <div><strong>Speed</strong> {x.speed.map(a => renderer.renderSpeed(a, x))}</div>
      <div>{x.melee?.map(attack => renderer.renderMeleeAttack(x, attack))}</div>
      <div>{x.ranged?.map(attack => renderer.renderRangedAttack(x, attack))}</div>
      {x.spell_lists?.map(renderer.renderSpellList)}
      <div>
        {x.proactive_abilities?.map(a => renderer.renderAbility(a, x))}
      </div>
      {x.ritual_lists?.map(renderer.renderSpellList)}
    </div>
  );
}