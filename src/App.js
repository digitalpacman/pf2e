import React, { useState, useEffect } from 'react';
import FlexSearch from 'flexsearch';
import { fromPF2Tools } from './tool-conversion';
import { normalizePath } from './normalize-path';
import { MonsterDetailPage } from './MonsterDetailPage';
import { CreatePage } from './create-page';
import { CardsPage } from './CardsPage';
import { BuilderSettings } from './builder-settings';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

let entries = [];
let index;
let list = [];

// https://github.com/nextapps-de/flexsearch
function App() {
  const [state, setState] = useState({ 
    search: '',
    entries: [],
    view: 'cards',
    fields: [],
    sort: 'level',
    sortDir: 'asc',
    mode: 'read',
    customError: null,
    token: null,

    builderSettingsVisible: false,
    enableEncounterBuilder: false,
    averagePartyLevel: 0,
    numberPlayers: 0,
    encounterXp: 0,
    encounterThreat: '',
    encounterXpThreshold: 0,
    encounterMonsters: [],
  });

  const toggleEncounterBuilder = (evt) => {
    evt.stopPropagation();
    const enableEncounterBuilder = !state.enableEncounterBuilder;
    if (enableEncounterBuilder && state.averagePartyLevel === 0) {
      const builderSettingsVisible = true;
      setState({ ...state, builderSettingsVisible });
    } else {
      const entries = applyFilters(state.search, enableEncounterBuilder, state.averagePartyLevel);
      setState({ ...state, entries, enableEncounterBuilder });
    }
  };

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

  const openBuilderSettings = (evt) => {
    evt.stopPropagation();
    const builderSettingsVisible = true;
    setState({ ...state, builderSettingsVisible });
  };

  const saveBuilderSettings = ({ numberPlayers, averagePartyLevel }) => {
    const builderSettingsVisible = false;
    const enableEncounterBuilder = averagePartyLevel > 0 && numberPlayers > 0 &&
      ((state.numberPlayers === 0 && state.averagePartyLevel === 0) || state.enableEncounterBuilder);
    const encounter = buildEncounter(state.encounterMonsters, averagePartyLevel, numberPlayers);
    const entries = enableEncounterBuilder ? applyFilters(state.search, enableEncounterBuilder, averagePartyLevel) : state.entries;
    setState({ ...state, entries, numberPlayers, averagePartyLevel, builderSettingsVisible, enableEncounterBuilder, ...encounter });
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

  const calculateEncounterThreat = (players, xp) => {
    const modifier = (players - 4);
    const realBudget = budgetTable.map(x => [x[0] + modifier * x[2], x[1]]);
    const budget = realBudget.find(x => xp <= x[0]) ?? [160, 'Extreme+'];
    const threat = budget[1];
    const limit = budget[0];
    return { threat, limit };
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

    const fieldMap = {};
    for (let i = 0; i < entries.length; i++) {
      entries[i].path = normalizePath(entries[i].name);
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
      const response = await fetch('/monster-entries.js');
      const paizoMonsters = await response.json();
      const response2 = await fetch('/api/custom-monsters');
      const customMonsters = await response2.json();
      entries = paizoMonsters.concat(customMonsters);
      init();
    })();
  }, []);

  const applyFilters = (search, enableEncounterBuilder, averagePartyLevel) => {
    let matched = search ? index?.search(search) ?? [] : list;
    if (enableEncounterBuilder) {
      matched = matched.filter(x => {
        return Math.abs(x.level - averagePartyLevel) <= 4;
      });
    }
    sorted(matched, state.sort, state.sortDir);
    return matched;
  };

  const setSearch = (search) => {
    const entries = applyFilters(search, state.enableEncounterBuilder, state.averagePartyLevel);
    setState({ ...state, search, entries });
  };

  const showDetailed = (monster) => {
    setState({ ...state, view: 'detailed', selected: monster });
  };

  const clear = () => {
    window.localStorage.clear();
    for (let x in list) {
      list[x].completed = false;
    }
    setState({ ...state });
  };

  const buildEncounter = (encounterMonsters, averagePartyLevel, numberPlayers) => {
    const encounterXp = calculateXP(averagePartyLevel, encounterMonsters);
    const { threat: encounterThreat, limit: encounterXpThreshold } = calculateEncounterThreat(numberPlayers, encounterXp);
    return { encounterMonsters, encounterXp, encounterThreat, encounterXpThreshold };
  };

  const addToEncounter = (monster) => {
    const encounterMonsters = state.encounterMonsters;
    encounterMonsters.push(monster);
    const encounter = buildEncounter(encounterMonsters, state.averagePartyLevel, state.numberPlayers);
    setState({ ...state, ...encounter });
  }

  const removeFromEncounter = (i) => {
    const encounterMonsters = state.encounterMonsters;
    encounterMonsters.splice(i, 1);
    const encounter = buildEncounter(encounterMonsters, state.averagePartyLevel, state.numberPlayers);

    setState({ ...state, ...encounter });
  };

  const renderCard = (x) => {
    return (
      <Link className="clickable card" key={x.path} to={`/m/${x.path}`} onClick={() => showDetailed(x)}>
        <li>
          <div><strong>{x.name}</strong></div><div>Level {x.level}</div>
        </li>
      </Link>
    );
  };

  const tryLoadCustom = (value) => {
    try {
      const pftools = JSON.parse(value);
      const selected = fromPF2Tools(pftools);
      setState({ ...state, selected });
    } catch (err) {
      console.log(err)
      setState({ ...state, customError: err.toString() });
    }
  };

  const saveCustomMonster = async () => {
    const monster = state.selected;
    const token = state.token;
    const res = await fetch('/api/custom-monsters', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        monster,
        token,
      }),
    });

    const body = await res.text();
    console.log(body);
  };

  const handleSignIn = (profile) => {
    const token = profile.token;
    setState({ ...state, token });
  };

  return (
    <Router>
      <div>
        <ul className="top-bar">
          <li className="top-bar-item back">
            <Switch>
              <Route exact path="/">Logo</Route>
              <Route path="*"><Link to="/">Back</Link></Route>              
            </Switch>
          </li>
          <li className="top-bar-item">
            <label className="clickable" htmlFor="builder">Builder</label>
            <input id="builder" className="clickable" type="checkbox" checked={state.enableEncounterBuilder} onChange={toggleEncounterBuilder} />
            <i className="fas fa-cog clickable" onClick={openBuilderSettings}></i>
          </li>
          <li className="top-bar-item" onClick={toggleCustomMonsterMode}>
            <Link to="/create">Create</Link>
          </li>
        </ul>

        {!state.builderSettingsVisible ? null : (
          <BuilderSettings
            saveBuilderSettings={saveBuilderSettings}
            numberPlayers={state.numberPlayers}
            averagePartyLevel={state.averagePartyLevel}
          />
        )}

        <div className="second-bar">
          {!state.enableEncounterBuilder ? null : (
            <div>
              {state.encounterXp} of {state.encounterXpThreshold}xp {state.encounterThreat} Encounter;&nbsp;
              {state.encounterMonsters.map((x, i) => (<span className="csv encounter-monster" onClick={() => removeFromEncounter(i)}>{x.name}</span>))}
            </div>
          )}
        </div>

        <Switch>
          <Route path="/m/:monsterPath">
            <MonsterDetailPage
              entries={entries}
              selected={state.selected}
              addToEncounter={addToEncounter}
              enableEncounterBuilder={state.enableEncounterBuilder}
            />
          </Route>
          <Route path="/create">
            <CreatePage 
              tryLoadCustom={tryLoadCustom}
              handleSignIn={handleSignIn}
              saveCustomMonster={saveCustomMonster}
              selected={state.selected}
            />
          </Route>
          <Route path="/">
            <CardsPage 
              search={state.search}
              setSearch={setSearch}
              entries={state.entries}
              renderCard={renderCard} 
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
