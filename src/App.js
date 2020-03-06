import React, { useState } from 'react';
import './App.css';
import entries from './monster-entries.js';


function App() {
  const [search, setSearch] = useState('');

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

  const renderSense = (sense) => {
    return (
      <span key={sense} className="csv">{sense}</span>
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

  return (
    <div>
      <div>
        <h1>Search: <input type="text" value={search} onChange={e => setSearch(e.target.value)} /></h1>
      </div>
      {(() => entries.filter(x => x.name.toLowerCase().indexOf(search) != -1).map(x => (
        <div key={x.name}>
          <h1><span className="name">{x.name} Level {x.level}</span></h1>
          <h2>{renderTrait(x.alignment, 'alignment')}{renderTrait(x.size, 'size')}{x.traits.map(trait => renderTrait(trait))}</h2>
          <div><strong>Senses</strong> {x.senses.map(renderSense)}</div>
          <div><strong>Languages</strong> {x.languages.map(renderSense)}</div>
          <div><strong>Skills</strong> {toArray(x.skills).map(renderSkill)}</div>
          <div>
            <span className="csv"><strong>Str</strong> {signed(x.str)}</span>
            <span className="csv"><strong>Dex</strong> {signed(x.dex)}</span>
            <span className="csv"><strong>Con</strong> {signed(x.con)}</span>
            <span className="csv"><strong>Int</strong> {signed(x.int)}</span>
            <span className="csv"><strong>Wis</strong> {signed(x.wis)}</span>
            <span className="csv"><strong>Cha</strong> {signed(x.cha)}</span>
          </div>
          <div><strong>Items</strong> {x.items.map(renderSense)}</div>
          <div>
            <span className="csv"><strong>AC</strong> {signed(x.ac)}</span>
            <span className="csv"><strong>Fort</strong> {signed(x.fort)}</span>
            <span className="csv"><strong>Ref</strong> {signed(x.ref)}</span>
            <span className="csv"><strong>Will</strong> {signed(x.will)}</span>
          </div>
          <div><strong>HP</strong> {x.hp}</div>
          <div><strong>Speed</strong> {toArray(x.speed).map(renderSkill)}</div>
        </div>
      )))()}
    </div>)
}

export default App;
