import React, { useState, useEffect } from 'react';
import './App.css';
import entries from './monster-entries.js';
import FlexSearch from 'flexsearch';
import showdown from 'showdown';
import freeAction from './FreeAction.png';
import reaction from './Reaction.png';
import oneAction from './OneAction.png';
import twoActions from './TwoActions.png';
import threeActions from './ThreeActions.png';

const converter = new showdown.Converter({underline: true});

let index;
let list;

// https://github.com/nextapps-de/flexsearch
function App() {
  const [state, setState] = useState({ search: '', entries: [], count: 0 });

  useEffect(() => {
    index = new FlexSearch({
      tokenize: 'forward',
      encode: 'icase',
      resolution: 3,
      threshold: 1,
      depth: 4,
      doc: {
        id: 'name',
        field: [
          'search_text',
        ],
      },
    });

    entries.sort((a, b) => a.name > b.name ? 1 : -1);
    list = entries;//.slice(0, 10);
    
    index.add(list);

    setState({ search: state.search, entries: list, count: list.length });
  }, []);

  const actionCostImage = (actionCost) => {
    let image;
    if (actionCost === 'Reaction') {
      image = reaction;
    } else if (actionCost === 'One Action') {
      image = oneAction;
    } else if (actionCost === 'Two Actions') {
      image = twoActions;
    } else if (actionCost === 'Three Actions') {
      image = threeActions;
    } else if (actionCost === 'Free Action') {
      image = freeAction;
    }
    
    if (image) {
      return (<img className="action-cost-icon" src={image} />);
    }
    return null;
  };

  const setSearch = (search) => {
    const matched = index?.search(search).sort((a, b) => a.name > b.name ? 1 : -1) ?? [];
    for (let i = 0, x = 0; i < list.length; i++) {
      if (search === '' || (x < matched.length && list[i].name === matched[x].name)) {
        list[i].show = true;
        ++x;
      } else {
        list[i].show = false;
      }
    }

    setState({ search, entries: list, count: matched.length });
  };

  const renderTrait = (trait, additionalClassName='') => {
    const className = `trait ${additionalClassName}`;
    return (
      <span key={trait} className={className}>{trait}</span>
    );
  };

  const renderSpeed = (speed, m) => {
    const amount = speed.amount ? ` ${speed.amount}` : null;
    return (
      <span key={speed.type} className="csv">{speed.type}{amount}</span>
    );
  }

  const renderDict = (skill, nameRender, valueRender) => {
    return (
      <span key={skill.name} className="csv">{nameRender ? nameRender(skill.name) : skill.name} {valueRender ? valueRender(skill.value) : skill.value}</span>
    );
  };

  const renderCsv = (sense) => {
    return (
      <span key={sense} className="csv">{sense}</span>
    );
  };

  const markdown = (html) => {
    if (html) {
      return (<span className="markdown" dangerouslySetInnerHTML={{__html: converter.makeHtml(html)}}></span>);
    }
    return null;
  };

  const renderAbility = (x, m) => {
    const actionCost = x.action_cost ? (<span>{actionCostImage(x.action_cost)}</span>) : null;
    const trigger = x.trigger ? (<span><strong>Trigger</strong> {x.trigger}</span>) : null;
    const effect = x.effect ? (<span><strong>Effect</strong> {markdown(x.effect)}</span>) : null;
    const critical_success = x.critical_success ? (<div className="save-result"><strong>Critical Success</strong> {x.critical_success}</div>) : null;
    const success = x.success ? (<div className="save-result"><strong>Success</strong> {x.success}</div>) : null;
    const failure = x.failure ? (<div className="save-result"><strong>Failure</strong> {x.failure}</div>) : null;
    const critical_failure = x.critical_failure ? (<div className="save-result"><strong>Critical Failure</strong> {x.critical_failure}</div>) : null;
    const traits = x.traits ? (<span>({x.traits.map(renderCsv)})</span>) : null;
    const frequency = x.frequency ? (<span><strong>Frequency</strong> {x.frequency}</span>) : null;
    const description = x.description ? markdown(x.description) : null;
    const genericDescription = x.generic_description ? markdown('. ' + x.generic_description) : null;
    const effects = x.effects ? (<div className="effects">{x.effects.map(renderAbility)}</div>) : null;

    return (
      <div key={x.name} className="ability"><strong>{x.name}</strong> {actionCost} {traits} {frequency} {description}{genericDescription} {trigger} {effect} {critical_success} {success} {failure} {critical_failure} {effects}</div>
    );
  };

  const signed = (value) => {
    value = parseInt(value);
    if (value >= 0) {
      return `+${value}`;
    }
    return `${value}`;
  };

  const toArray = (o) => {
    if (!o) return null;
    return Object.entries(o).map(x => ({ name: x[0], value: x[1] }));
  };

  const renderSpellList = (spellList) => {
    const spells = spellList.spell_groups.filter(x => x.level != 0 && x.level != -1);
    const cantrips = spellList.spell_groups.filter(x => x.level == 0);
    const constants = spellList.spell_groups.filter(x => x.level == -1);
    const dc = spellList.dc ? `DC ${spellList.dc}` : null;
    const to_hit = spellList.to_hit ? `attack +${spellList.to_hit}` : null;
    const misc = dc && spellList.to_hit ? (<span> {dc}, {to_hit}; </span>) : 
      dc ? (<span> {dc}; </span>) :
      to_hit ? (<span> {to_hit}; </span>) : 
      '; ';

    return (
      <div key={spellList.name}>
        <strong>{spellList.name}</strong>{misc}
        {spells.map(renderSpellGroup)}
        {ifExists(cantrips.length > 0, (<strong>Cantrips</strong>))} {cantrips.map(renderSpellGroup)}
        {ifExists(constants.length > 0, (<strong>Constant</strong>))} {constants.map(renderSpellGroup)}
      </div>
    );
  };

  const levelTextEnding = (level) => {
    if (level === '1') {
      return `${level}st`;
    }
    if (level === '2') {
      return `${level}nd`;
    }
    if (level === '3') {
      return `${level}rd`;
    }
    return `${level}th`;
  };

  const renderSpellGroup = (spellGroup) => {
    const levelText = levelTextEnding(spellGroup.level > 0 ? spellGroup.level : spellGroup.heightened_level);
    const level = spellGroup.level > 0 ? (<strong>{levelText}</strong>) : (<strong>({levelText})</strong>);
    return (
      <span key={levelText} className="scsv">{level} {spellGroup.spells.map(renderSpell)}</span>
    );
  };

  const renderSpell = (spell) => {
    return (
      <span key={spell.name} className="csv">{ifExists(spell.requirement, (<span>({spell.requirement})</span>))} {spell.name}{ifExists(spell.frequency, ` (${spell.frequency})`)}</span>
    );
  };

  const renderMeleeAttack = (monster, attack) => {
    return renderAttack(monster, attack, 'Melee');
  };

  const renderRangedAttack = (monster, attack) => {
    return renderAttack(monster, attack, 'Ranged');
  };

  const renderDamageFormula = (damage, plusDamage) => {
    const plus = plusDamage?.map(x => {
      return (
        <span key={x.formula + ' ' + x.type} className="csv oxford-comma">{x?.formula} {x?.type}</span>
      );
    });

    const plusSection = plus ? (
      <span>plus {plus}</span>
    ) : null;

    return (
      <span><strong>Damage</strong> {damage?.formula} {damage?.type} {plusSection}</span>
    );
  };
  
  const renderAttack = (monster, attack, kind) => {
    try {
      const traits = attack.traits ? (<span> ({attack.traits?.map(renderCsv)})</span>) : null;
      if (!attack.name) console.log(monster, attack.name)
      return (
        <div key={attack.name}>
          <strong>{kind}</strong> {actionCostImage(attack.action_cost)} {attack.name} {signed(attack.to_hit)}{traits}, {renderDamageFormula(attack.damage, attack.plus_damage)}
        </div>
      );
    } catch (err) {
      console.log(err)
      console.log(monster)
      console.log(attack)
      throw err;
    }
  };

  const ifExists = (check, block) => {
    if (check) {
      return block;
    }
    return null;
  };

  const renderSource = (source) => {
    return (
      <span key={source.abbr + source.page_start} className="csv">{source.abbr} pg. {source.page_start}</span>
    );
  };

  return (
    <div>
      <div>
        <h1>Search: <input type="text" value={state.search} onChange={e => setSearch(e.target.value)} /> matched {state.count}</h1>
      </div>
      {(() => state.entries.map(x => (
        <div key={x.name}>
          <h1>
            <a className="name" href={x.url}>{x.name}</a> 
            <span className="name"> Level {x.level}</span>
          </h1>
          <h2>{x.traits.map(trait => renderTrait(trait))}</h2>
          <div>{markdown(x.description)}</div>
          <div><strong>Source</strong> {x.source.map(renderSource)}</div>
          <div><strong>Senses</strong> {x.senses?.map(renderCsv)}</div>
          {ifExists(x.languages, (
            <div><strong>Languages</strong> {x.languages?.map(renderCsv)}</div>
          ))}
          <div><strong>Skills</strong> {toArray(x.skills)?.map(s => renderDict(s, n => n, v => signed(v)))}</div>
          <div>
            <span className="csv"><strong>Str</strong> {signed(x.ability_mods.str_mod)}</span>
            <span className="csv"><strong>Dex</strong> {signed(x.ability_mods.dex_mod)}</span>
            <span className="csv"><strong>Con</strong> {signed(x.ability_mods.con_mod)}</span>
            <span className="csv"><strong>Int</strong> {signed(x.ability_mods.int_mod)}</span>
            <span className="csv"><strong>Wis</strong> {signed(x.ability_mods.wis_mod)}</span>
            <span className="csv"><strong>Cha</strong> {signed(x.ability_mods.cha_mod)}</span>
          </div>
          <div>
            {x.sense_abilities?.map(a => renderAbility(a, x))}
          </div>
          {ifExists(x.items, (
            <div><strong>Items</strong> {x.items?.map(renderCsv)}</div>
          ))}          
          <hr />
          <div>
            <span>
              <span className="csv"><strong>AC</strong> {x.ac}{ifExists(x.ac_special, (<span> ({x.ac_special?.map(ac => ac.descr).map(renderCsv)})</span>))}</span>
              <span className="csv"><strong>Fort</strong> {signed(x.saves.fort)}</span>
              <span className="csv"><strong>Ref</strong> {signed(x.saves.ref)}</span>
              <span className="csv"><strong>Will</strong> {signed(x.saves.will)}</span>
            </span>
            {ifExists(x.saves.misc, (
              <span>; {x.saves.misc}</span>
            ))}            
          </div>
          <div><strong>HP</strong> {x.hp}{ifExists(x.hp_misc, (<span> ({x.hp_misc})</span>))}{ifExists(x.immunities, (<span>; <strong>Immunities</strong> {x.immunities?.map(renderCsv)}</span>))}{ifExists(x.resistances, (<span>; <strong>Resistances</strong> {x.resistances?.map(a => renderSpeed(a, x))}</span>))}{ifExists(x.weaknesses, (<span>; <strong>Weaknesses</strong> {x.weaknesses?.map(a => renderSpeed(a, x))}</span>))}</div>
          <div>
            {x.automatic_abilities?.map(a => renderAbility(a, x))}
          </div>
          <hr />
          <div><strong>Speed</strong> {x.speed.map(a => renderSpeed(a, x))}</div>
          <div>{x.melee?.map(attack => renderMeleeAttack(x, attack))}</div>
          <div>{x.ranged?.map(attack => renderRangedAttack(x, attack))}</div>
          {x.spell_lists?.map(renderSpellList)}
          <div>
            {x.proactive_abilities?.map(a => renderAbility(a, x))}
          </div>
          {x.ritual_lists?.map(renderSpellList)}
        </div>
      )))()}
    </div>)
}

export default App;
