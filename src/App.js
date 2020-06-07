import React, { useState, useEffect } from 'react';
import './App.css';
import FlexSearch from 'flexsearch';
import * as renderer from './renderers.js';

let entries;
let index;
let list;

// https://github.com/nextapps-de/flexsearch
function App() {
  const [state, setState] = useState({ 
    search: '',
    entries: [],
    mode: 'cards',
    fields: [],
    sort: 'name',
    sortDir: 'asc',
    encounterMonsters: [],
    encounterApl: 5,
    numberPlayers: 4,
    buildMode: false,
    cardOptions: ['Name', 'Level'],
  });

  const sorted = (entries, sort, sortDir) => {
    const equals = (a, b) => {
      return a.name > b.name ? 1 : -1;
    };

    entries.sort((a, b) => {
      const left = a[sort];
      const right = b[sort];

      if (left == right) {
        return equals(a, b);
      }

      if (!isNaN(parseInt(left)) && !isNaN(parseInt(right))) {
        return parseInt(left) > parseInt(right) ? (sortDir == 'asc' ? 1 : -1) : (sortDir == 'asc' ? -1 : 1);
      }

      return left > right ? (sortDir == 'asc' ? 1 : -1) : (sortDir == 'asc' ? -1 : 1)
    });
  };

  const calculateXP = (apl, monsters) => {
    const xpTable = [
      [-4, 10],
      [-3, 15],
      [-2, 20],
      [-1, 30],
      [0, 40],
      [1, 60],
      [2, 80],
      [3, 120],
      [4, 160],
    ];

    let xp = 0;
    for (let i = 0; i < monsters.length; ++i) {
      const level = monsters[i].level - apl;
      for (let x = 0; x < xpTable.length; ++x) {
        if (level === xpTable[x][0]) {
          xp += xpTable[x][1];
          break;
        }
      }
    }

    return xp;
  };

  const budgetTable = [
    [40, 'Trivial', 10],
    [60, 'Low', 15],
    [80, 'Moderate', 20],
    [120, 'Severe', 30],
    [160, 'Extreme', 40],
  ];

  const calculateEncounterThreat = (players, apl, monsters) => {
    const xp = calculateXP(apl, monsters);

    const modifier = (players - 4);
    const realBudget = budgetTable.map(x => [x[0] + modifier * x[2], x[1]]);
    const budget = realBudget.find(x => xp <= x[0]);
    return budget ? budget[1] : `Beyond ${budgetTable[4][1]}`;
  };

  const toggleBuildMode = () => {
    const buildMode = !state.buildMode;
    const entries = applyFilters(state.search, buildMode);
    setState({ ...state, entries, buildMode });
  };

  const init = () => {
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

    const work = JSON.parse(window.localStorage.getItem('work')) ?? {};
    const fieldMap = {};
    for (let i = 0; i < entries.length; i++) {
      if (work[entries[i].name]) {
        entries[i].completed = true;
      }
      for (let x in entries[i]) {
        fieldMap[x] = x;
      }
    }

    const fields = Object.keys(fieldMap);

    sorted(entries, state.sort, state.sortDir);

    list = entries;

    index.add(list);

    setState({ ...state, search: state.search, entries: list, fields });
  };

  useEffect(() => {
    (async () => {
      const response = await fetch('monster-entries.js');
      entries = await response.json();
      init();
    })();
  }, []);

  const applyFilters = (search, buildMode) => {
    let matched = search ? index?.search(search) ?? [] : list;
    if (buildMode) {
      matched = matched.filter(x => {
        return Math.abs(x.level - state.encounterApl) <= 4;
      });
    }
    sorted(matched, state.sort, state.sortDir);
    return matched;
  };

  const setSearch = (search) => {
    const entries = applyFilters(search, state.buildMode);
    setState({ ...state, search, entries });
  };

  const showCards = () => {
    setState({ ...state, mode: 'cards' });
  };

  const showDetailed = (monster) => {
    setState({ ...state, mode: 'view', selected: monster });
  };

  const changeSort = (evt) => {
    const sort = evt.target.value;
    const entries = state.entries;
    sorted(entries, sort, state.sortDir);
    setState({ ...state, entries, sort });
  };

  const toggleSortDir = () => {
    const sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    const entries = state.entries;
    sorted(entries, state.sort, sortDir);
    setState({ ...state, entries, sortDir });
  }

  const markComplete = (monster) => {
    const work = JSON.parse(window.localStorage.getItem('work')) ?? {};
    work[monster.name] = true;
    window.localStorage.setItem('work', JSON.stringify(work));

    monster.completed = true;
    setState({ ...state });
  };

  const clear = () => {
    window.localStorage.clear();
    for (let x in list) {
      list[x].completed = false;
    }
    setState({ ...state });
  };

  const addToEncounter = (monster) => {
    const encounterMonsters = state.encounterMonsters;
    encounterMonsters.push(monster);
    setState({ ...state, encounterMonsters});
  }

  const changePlayers = (evt) => {
    const numberPlayers = evt.target.value;
    setState({ ...state, numberPlayers });
  };

  const changeApl = (evt) => {
    const encounterApl = evt.target.value;
    setState({ ...state, encounterApl });
  };

  const removeFromEncounter = (i) => {
    const encounterMonsters = state.encounterMonsters;
    // const i = encounterMonsters.findIndex(x => x.name == monster.name);
    encounterMonsters.splice(i, 1);

    setState({ ...state, encounterMonsters });
  };

  const cardOptions = {
    Name: x => (<strong key="name">{x.name}</strong>),
    Level: x => (<span key="level">Level {x.level}</span>),
    Size: x => (<span key="size">{x.size}</span>),
  };

  const renderCard = (x) => {
    const css = x.completed ? "clickable card completed" : "clickable card";
    return (
      <li key={x.name} className={css} onClick={() => showDetailed(x)}>
        {Object.entries(cardOptions).map(o => {
          const enabled = state.cardOptions.indexOf(o[0]) !== -1;
          if (!enabled) {
            return null;
          }
          return o[1](x);
        })}  
      </li>
    );
  };

  const cardOptionToggle = (evt) => {
    const target = evt.target;
    const checked = target.checked;
    const cardOptions = checked ? state.cardOptions.concat(target.name) : state.cardOptions.filter(x => x != target.name);
    setState({ ...state, cardOptions });
  };

  return (
    <div>
      {state.mode !== 'cards' ? null : (
        <div>
          <div className="search"><input className="search-box" type="text" placeholder="search" value={state.search} onChange={e => setSearch(e.target.value)} /></div>
          <div className="matched">matched {state.entries.length}</div>
          <select onChange={changeSort}>
            {state.fields.map(x => (<option key={x} value={x}>{x}</option>))}
          </select>
          <button onClick={toggleSortDir}>{state.sortDir === 'asc' ? 'asc' : 'desc'}</button> <button onClick={clear}>Clear Work</button>
          <div>
            {Object.keys(cardOptions).map(x => (<span key={x}><input type="checkbox" name={x} checked={state.cardOptions.indexOf(x) !== -1} onChange={cardOptionToggle} /> {x}</span>))}
          </div>
        </div>
      )}
      <button onClick={toggleBuildMode}>Toggle Build Mode</button>
      {!state.buildMode ? null : (
        <div>
          <div>
            Players [<input onChange={changePlayers} value={state.numberPlayers} size="1" />],
            APL [<input onChange={changeApl} value={state.encounterApl} size="1" />]
          </div>
          <div>
            {state.encounterMonsters.map((x, i) => (
              <span key={i} className="csv" onClick={() => removeFromEncounter(i)}>{x.name}</span>
            ))}
          </div>
          <div>Target threat level <select>{budgetTable.map(x => (<option key={x[1]} value={x[1]}>{x[1]}</option>))}</select></div>
          <div>{calculateEncounterThreat(state.numberPlayers, state.encounterApl, state.encounterMonsters)}, XP [{calculateXP(state.encounterApl, state.encounterMonsters)}]</div>
        </div>
      )}

      {state.mode !== 'cards' ? null : (
        <ul className="cards">
          {state.entries.map(renderCard)}
        </ul>
      )}

      {state.mode === 'cards' ? null : [state.selected].map(x => (
        <div key={x.name}>
          <div onClick={showCards} className="clickable">&lt; Back</div>
          {!state.buildMode ? null : (
            <div><button onClick={() => addToEncounter(x)}>Add to encounter</button></div>
          )}
          <h1>
            <a className="name" href={x.url}>{x.name}</a>
            <span className="name"> Level {x.level}</span>
          </h1>
          <h2>{x.traits.map(trait => renderer.renderTrait(trait))}</h2>
          <div className="description">{renderer.markdown(x.description)}</div>
          <div><strong>Source</strong> {x.source.map(renderer.renderSource)}</div>
          <div><strong>Senses</strong> {x.senses?.map(renderer.renderCsv)}</div>
          {renderer.ifExists(x.languages, (
            <div><strong>Languages</strong> {x.languages?.map(renderer.renderCsv)}</div>
          ))}
          <div><strong>Skills</strong> {x.skills?.map(renderer.renderSkills)}</div>
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
          <button onClick={() => markComplete(x)}>Mark Complete</button>
        </div>
      ))}
      <script src="monster-entries.js"></script>
    </div>)
}

export default App;
