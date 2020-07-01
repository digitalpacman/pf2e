import React, { useState } from 'react';
import './App.css';

export const BuilderSettings = ({ saveBuilderSettings, numberPlayers, averagePartyLevel }) => {  
  const [state, setState] = useState({
    numberPlayers: numberPlayers,
    averagePartyLevel: averagePartyLevel,
  });

  const changePlayers = (evt) => {
    const numberPlayers = parseInt(evt.target.value) || 0;
    setState({ ...state, numberPlayers });
  };

  const changePartyLevel = (evt) => {
    const averagePartyLevel = parseInt(evt.target.value) || 0;
    setState({ ...state, averagePartyLevel });
  };

  const save = (evt) => {
    saveBuilderSettings(state);
  };

  return (
    <div className="overlay">
      <div className="overlay-opacity"></div>
      <div className="overlay-content-centered">
        <div className="builder-settings">
          <div># Players [<input onChange={changePlayers} value={state.numberPlayers} size="1" />]</div>
          <div>APL [<input onChange={changePartyLevel} value={state.averagePartyLevel} size="1" />]</div>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
};