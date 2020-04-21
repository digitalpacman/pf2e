import React, { useState, useEffect } from 'react';
import './App.css';
import entries from './monster-entries.js';
import FlexSearch from 'flexsearch'

let index;
let ordered;

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
          'name',
          'description',
          'immunitiesSearchText',
        ],
      },
    });

    entries.sort((a, b) => a.name > b.name ? 1 : -1);
    
    index.add(entries);

    setState({ search: state.search, entries, count: entries.length });
  }, []);

  const setSearch = (search) => {
    const matched = index?.search(search).sort((a, b) => a.name > b.name ? 1 : -1) ?? [];
    console.log(matched)
    for (let i = 0, x = 0; i < entries.length; i++) {
      if (search === '' || (x < matched.length && entries[i].name === matched[x].name)) {
        entries[i].show = true;
        ++x;
      } else {
        entries[i].show = false;
      }
    }

    setState({ search, entries, count: matched.length });
  };

  const renderTrait = (trait, additionalClassName='') => {
    const className = `trait ${additionalClassName}`;
    return (
      <span key={trait} className={className}>{trait}</span>
    );
  };

  const renderSkill = (skill) => {
    return (
      <span key={skill.name} className="csv">{skill.name} {skill.value}</span>
    );
  };

  const renderCsv = (sense) => {
    return (
      <span key={sense} className="csv">{sense}</span>
    );
  };

  const renderProperties = (prop) => {
    return (
      <div key={prop.name}><strong>{prop.name}</strong> <span>{prop.description}</span></div>
    );
  };

  const signed = (value) => {
    if (value >= 0) {
      return `+${value}`;
    }
    return `${value}`;
  };

  const toArray = (o) => {
    return Object.entries(o).map(x => ({ name: x[0], value: x[1] }));
  };

  const renderSpells = (monster, spells) => {
    if (!spells || spells.length === 0) {
      return;
    }

    const grouped = spells.reduce((acc, cur) => {
      let group = acc.find(x => x.level === cur.level);
      if (group) {
        group.spells.push(cur);
      } else {
        acc.push({ level: cur.level, spells: [cur] });
      }

      return acc;
    }, []);

    return grouped.map(x => {
      return (
        <div key={monster.name + ' ' + x.level}>
          <span>{x.level}th</span> {x.spells.map(s => renderSpell(monster, s))}
        </div>
      );
    });
  };

  const renderSpell = (monster, spell) => {
    const frequency = spell.frequency ? (<span>({spell.frequency})</span>) : null;
    return (
      <span key={monster.name + ' ' + spell.name + ' ' + spell.frequency}>{spell.name} {frequency}</span>
    );
  };

  const renderMeleeAttack = (attack) => {
    return renderAttack(attack, 'Melee');
  };

  const renderRangedAttack = (attack) => {
    return renderAttack(attack, 'Ranged');
  };
  
  const renderAttack = (attack, kind) => {
    return (
      <div key={attack.name}>
        {kind} {attack.actionCost} {attack.name} {signed(attack.hitBonus)} ({attack.traits.map(renderCsv)}), Damage {attack.damageFormula} {attack.damageType}
      </div>
    );
  };

  return (
    <div>
      <div>
  <h1>Search: <input type="text" value={state.search} onChange={e => setSearch(e.target.value)} /> matched {state.count}</h1>
      </div>
      {(() => state.entries.map(x => (
        <div key={x.name} style={{ display: x.show ? 'block' : 'none' }}>
          <h1>
            <a className="name" href={x.url}>{x.name}</a> 
            <span className="name"> Level {x.level}</span>
          </h1>
          <h2>{renderTrait(x.alignment, 'alignment')}{renderTrait(x.size, 'size')}{x.traits.map(trait => renderTrait(trait))}</h2>
          <div>{x.description}</div>
          <div><strong>Perception</strong> {signed(x.perception)}</div>
          <div><strong>Senses</strong> {x.senses.map(renderCsv)}</div>
          <div><strong>Languages</strong> {x.languages.map(renderCsv)}</div>
          <div><strong>Skills</strong> {toArray(x.skills).map(renderSkill)}</div>
          <div>
            <span className="csv"><strong>Str</strong> {signed(x.str)}</span>
            <span className="csv"><strong>Dex</strong> {signed(x.dex)}</span>
            <span className="csv"><strong>Con</strong> {signed(x.con)}</span>
            <span className="csv"><strong>Int</strong> {signed(x.int)}</span>
            <span className="csv"><strong>Wis</strong> {signed(x.wis)}</span>
            <span className="csv"><strong>Cha</strong> {signed(x.cha)}</span>
          </div>
          <div><strong>Items</strong> {x.items?.map(renderCsv)}</div>
          <div>
            <span className="csv"><strong>AC</strong> {x.ac}</span>
            <span className="csv"><strong>Fort</strong> {signed(x.fort)}</span>
            <span className="csv"><strong>Ref</strong> {signed(x.ref)}</span>
            <span className="csv"><strong>Will</strong> {signed(x.will)}</span>
          </div>
          <div><strong>HP</strong> {x.hp}</div>
          <div><strong>Speed</strong> {toArray(x.speed).map(renderSkill)}</div>
          <div>
            {x.automaticAbilities.map(renderProperties)}
          </div>
          <div><strong>Immunities</strong> {x.immunities.map(renderCsv)}</div>
          <div><strong>Resistances</strong> {toArray(x.resistances).map(renderSkill)}</div>
          <div><strong>Skills</strong> {toArray(x.skills).map(renderSkill)}</div>
          <div>
            {x.proactiveAbilities.map(renderProperties)}
          </div>
          <div>
            <strong>Spells</strong>
            {renderSpells(x, x.spells)}
          </div>
          <div>
            <strong>Rituals</strong>
            {renderSpells(x, x.rituals)}
          </div>
          <div>{x.meleeAttacks.map(renderMeleeAttack)}</div>
          <div>{x.rangedAttacks.map(renderRangedAttack)}</div>
        </div>
      )))()}
    </div>)
}

export default App;
