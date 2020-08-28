import React, { useState, useEffect } from 'react';
import FlexSearch from 'flexsearch';
import { fromPF2Tools } from './tool-conversion';
import { normalizePath } from './normalize-path';
import { MonsterDetailPage } from './MonsterDetailPage';
import { CreatePage } from './create-page';
import { CardsPage } from './CardsPage';
import { BuilderSettings } from './builder-settings';
import { Template } from './template';
import { CreateEncounterPage } from './CreateEncounterPage';
import { AddMonsterButton } from './AddMonsterButton';
import { EncounterBuilderControls } from './EncounterBuilderControls';
import 'typeface-roboto';
import './App.css';
import './Grid.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
    loadMore: false,

    builderSettingsVisible: false,
    enableEncounterBuilder: false,
    averagePartyLevel: 0,
    numberPlayers: 0,
    encounterXp: 0,
    encounterThreat: '',
    encounterXpThreshold: 0,
    encounterMonsters: [],
    encounterBuilderControlsExpanded: false
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
      if (!entries[i].path) {
        entries[i].path = normalizePath(entries[i].name);
      }
      const link = `/monster/${entries[i].path}`;
      entries[i].link = link;
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
      const customMonsters = response2.ok ? await response2.json() : [];
      for (const monster of customMonsters) {
        monster.search_text = `${monster.name} ${monster.description} ${monster.level} ${monster.size}
          ${monster.immunities?.join(' ')} ${monster.languages?.join(' ')} ${monster.traits?.join(' ')} 
          ${monster.items?.join(' ')}`;
      }
      entries = paizoMonsters.concat(customMonsters);
      init();
    })();
  }, []);

  const applyFilters = (search, enableEncounterBuilder, averagePartyLevel) => {
    console.time('index search');
    let matched = search ? index?.search(search) ?? [] : list;
    console.timeEnd('index search');
    if (enableEncounterBuilder) {
      console.time('level filter');
      matched = matched.filter(x => {
        return Math.abs(x.level - averagePartyLevel) <= 4;
      });
      console.timeEnd('level filter');
    }
    
    console.time('search sort');
    sorted(matched, state.sort, state.sortDir);
    console.timeEnd('search sort');
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
    const expandEncounterBuilderControls = encounterMonsters.length == 0 ? true : state.encounterBuilderControlsExpanded;
    encounterMonsters.push(monster);
    const encounter = buildEncounter(encounterMonsters, state.averagePartyLevel, state.numberPlayers);
    setState({ ...state, ...encounter, encounterBuilderControlsExpanded: expandEncounterBuilderControls });
  }

  const removeFromEncounter = (i) => {
    const encounterMonsters = state.encounterMonsters;
    encounterMonsters.splice(i, 1);
    const encounter = buildEncounter(encounterMonsters, state.averagePartyLevel, state.numberPlayers);

    setState({ ...state, ...encounter });
  };

  const closeEncounterBuilder = () => {
      setState({ 
        ...state,
        averagePartyLevel: 0,
        numberPlayers: 0,
        enableEncounterBuilder : false,
        encounterXp: 0,
        encounterXpThreshold: 0,
        encounterThreat: '',
        encounterMonsters: [],
        encounterBuilderControlsExpanded: false
    })
  };

  const expandCollapseEncounterBuilder = (wrapper) => {
    if (state.encounterBuilderControlsExpanded) {
        wrapper.classList.toggle('expanded');
        document.querySelector('#encounter-monsters').classList.add('hidden');
        setState({ ...state, encounterBuilderControlsExpanded: false });
    } else {
        wrapper.classList.toggle('expanded');
        document.querySelector('#encounter-monsters').classList.remove('hidden');
        setState({ ...state, encounterBuilderControlsExpanded: true });
    }
  };

  const renderCard = (x) => {
    const path = x.thirdParty ? `/monster-3rd-party/${x.path}` : `/monster/${x.path}`;
    return (
      <Link className="clickable card" key={path} to={path} onClick={() => showDetailed(x)}>
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

  const handleLoadMore = () => {
    const loadMore = true;
    setState({ ...state, loadMore });
  };

  return (
    <Router>
      <div className="page-wrapper">
        <div className="top-bar">
          <div className="flex">
            <h3 className="top-bar-item">Pathfinder 2e Monster Library</h3>
            <Link className="top-bar-link" to="/">Monsters</Link>
            <Link className="top-bar-link" to="/create">Monster Builder</Link>
            <Link className="top-bar-link" to="/createEncounter">Encounter Builder</Link>
          </div>
        </div>

        <div className="content">
          <Switch>
            <Route path="/template">
              <Template />
            </Route>
            <Route path="/monster/:monsterPath">
              <EncounterBuilderControls 
                encounterBuilderControlsExpanded={state.encounterBuilderControlsExpanded}
                expandCollapseEncounterBuilder={expandCollapseEncounterBuilder}
                enableEncounterBuilder={state.enableEncounterBuilder}
                monster={state.selected}
                addToEncounter={addToEncounter} 
                encounterXp={state.encounterXp} 
                encounterXpThreshold={state.encounterXpThreshold}
                encounterThreat={state.encounterThreat}
                encounterMonsters={state.encounterMonsters}
                closeEncounterBuilder={closeEncounterBuilder}
                removeFromEncounter={removeFromEncounter}/>
              <MonsterDetailPage
                entries={list}
                addToEncounter={addToEncounter}
                enableEncounterBuilder={state.enableEncounterBuilder}
              />
            </Route>
            <Route path="/monster-3rd-party/:monsterPath">
              <EncounterBuilderControls 
                encounterBuilderControlsExpanded={state.encounterBuilderControlsExpanded}
                expandCollapseEncounterBuilder={expandCollapseEncounterBuilder}
                enableEncounterBuilder={state.enableEncounterBuilder}
                monster={state.selected}
                numberPlayers={state.numberPlayers}
                addToEncounter={addToEncounter} 
                encounterXp={state.encounterXp} 
                encounterXpThreshold={state.encounterXpThreshold}
                encounterThreat={state.encounterThreat}
                encounterMonsters={state.encounterMonsters}
                closeEncounterBuilder={closeEncounterBuilder}
                removeFromEncounter={removeFromEncounter}/>
              <MonsterDetailPage
                entries={entries}
                selected={state.selected}
                addToEncounter={addToEncounter}
                enableEncounterBuilder={state.enableEncounterBuilder}
              />
            </Route>
            <Route path="/create">
              <EncounterBuilderControls 
                encounterBuilderControlsExpanded={state.encounterBuilderControlsExpanded}
                expandCollapseEncounterBuilder={expandCollapseEncounterBuilder}
                enableEncounterBuilder={state.enableEncounterBuilder}
                monster={state.selected}
                numberPlayers={state.numberPlayers}
                addToEncounter={addToEncounter} 
                encounterXp={state.encounterXp} 
                encounterXpThreshold={state.encounterXpThreshold}
                encounterThreat={state.encounterThreat}
                encounterMonsters={state.encounterMonsters}
                closeEncounterBuilder={closeEncounterBuilder}
                removeFromEncounter={removeFromEncounter}/>
              <CreatePage 
                tryLoadCustom={tryLoadCustom}
                handleSignIn={handleSignIn}
                saveCustomMonster={saveCustomMonster}
                selected={state.selected}
              />
            </Route>
            <Route path="/createEncounter">
            <EncounterBuilderControls 
                encounterBuilderControlsExpanded={state.encounterBuilderControlsExpanded}
                expandCollapseEncounterBuilder={expandCollapseEncounterBuilder}
                enableEncounterBuilder={state.enableEncounterBuilder}
                monster={state.selected}
                numberPlayers={state.numberPlayers}
                addToEncounter={addToEncounter} 
                encounterXp={state.encounterXp} 
                encounterXpThreshold={state.encounterXpThreshold}
                encounterThreat={state.encounterThreat}
                encounterMonsters={state.encounterMonsters}
                closeEncounterBuilder={closeEncounterBuilder}
                removeFromEncounter={removeFromEncounter}/>
              <CreateEncounterPage
                averagePartyLevel={state.averagePartyLevel}
                numberPlayers={state.numberPlayers}
                saveBuilderSettings={saveBuilderSettings}
              />
            </Route>
            <Route path="/">
              <EncounterBuilderControls 
                encounterBuilderControlsExpanded={state.encounterBuilderControlsExpanded}
                expandCollapseEncounterBuilder={expandCollapseEncounterBuilder}
                enableEncounterBuilder={state.enableEncounterBuilder}
                monster={state.selected}
                numberPlayers={state.numberPlayers}
                addToEncounter={addToEncounter} 
                encounterXp={state.encounterXp} 
                encounterXpThreshold={state.encounterXpThreshold}
                encounterThreat={state.encounterThreat}
                encounterMonsters={state.encounterMonsters}
                closeEncounterBuilder={closeEncounterBuilder}
                removeFromEncounter={removeFromEncounter}/>
              <CardsPage 
                search={state.search}
                matched={state.entries.length}
                setSearch={setSearch}
                entries={state.entries}
                showDetailed={showDetailed} 
                onLoadMore={handleLoadMore}
                loadMore={state.loadMore}
              />
            </Route>
          </Switch>
        </div>

      </div>
    </Router>
  );
}

export default App;
