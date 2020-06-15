import React, { useState, useEffect } from 'react';
import './App.css';
import FlexSearch from 'flexsearch';
import * as renderer from './renderers.js';
import { MonsterDetail } from './MonsterDetail.js';
import { fromPF2Tools } from './tool-conversion.js';

let entries;
let index;
let list;

// https://github.com/nextapps-de/flexsearch
function App() {
  const [state, setState] = useState({ 
    search: '',
    entries: [],
    view: 'cards',
    fields: [],
    sort: 'name',
    sortDir: 'asc',
    encounterMonsters: [],
    encounterApl: 5,
    numberPlayers: 4,
    mode: 'read',
    cardOptions: ['Name', 'Level'],
    customError: null,
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
    const mode = 1;
    const entries = applyFilters(state.search, mode);
    setState({ ...state, entries, mode });
  };

  const toggleCustomMonsterMode = () => {
    const view = 'custom';
    const mode = 0;
    setState({ ...state, view, mode });
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
      const paizoMonsters = await response.json();
      const response2 = await fetch('/api/custom-monsters');
      const customMonsters = await response2.json();
      entries = paizoMonsters.concat(customMonsters);
      init();
    })();
  }, []);

  const applyFilters = (search, mode) => {
    let matched = search ? index?.search(search) ?? [] : list;
    if (mode === 1) {
      matched = matched.filter(x => {
        return Math.abs(x.level - state.encounterApl) <= 4;
      });
    }
    sorted(matched, state.sort, state.sortDir);
    return matched;
  };

  const setSearch = (search) => {
    const entries = applyFilters(search, state.mode);
    setState({ ...state, search, entries });
  };

  const showCards = () => {
    setState({ ...state, view: 'cards' });
  };

  const showDetailed = (monster) => {
    setState({ ...state, view: 'detailed', selected: monster });
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

  const tryLoadCustom = (evt) => {
    const value = evt.target.value;
    try {
      const pftools = JSON.parse(value);
      const selected = fromPF2Tools(pftools);
      setState({ ...state, selected });
    } catch (err) {
      setState({ ...state, customError: err });
    }
  };

  return (
    <div>
      {state.view !== 'cards' ? null : (
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
      <button onClick={toggleCustomMonsterMode}>Toggle Custom Monster Mode</button>
      {state.mode !== 1 ? null : (
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

      {state.view === 'cards' ? (
        <ul className="cards">
          {state.entries.map(renderCard)}
        </ul>
      ) : null}

      {state.view === 'detailed' ? (
        <div>
          <div onClick={showCards} className="clickable">&lt; Back</div>
          {state.mode !== 1 ? null : (
            <div><button onClick={() => addToEncounter(state.selected)}>Add to encounter</button></div>
          )}
          {MonsterDetail(state.selected)}
          <button onClick={() => markComplete(state.selected)}>Mark Complete</button>
        </div>
      ) : null}

      {state.view === 'custom' ? (
        <div>
          <div>{state.customError}</div>
          <textarea onChange={tryLoadCustom}></textarea>
          {state.selected ? MonsterDetail(state.selected) : null}
        </div>
      ) : null}
      <script src="monster-entries.js"></script>
    </div>)
}

export default App;
