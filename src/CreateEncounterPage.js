import React from 'react';
import './App.css';
import './Grid.css';
import {
    useHistory
  } from "react-router-dom";

export const CreateEncounterPage = ({
    averagePartyLevel,
    numberPlayers,
    encounterXp,
    encounterThreat,
    encounterXpThreshold,
    encounterMonsters,
    saveBuilderSettings
    }) => {

    let history = useHistory();

    const handleClick = () => {
        var numberPlayers = document.querySelector('#number-of-players').value;
        var averagePartyLevel = document.querySelector('#avg-player-level').value;
        saveBuilderSettings({ numberPlayers: numberPlayers, averagePartyLevel: averagePartyLevel });
        history.push("/");
    }   

    return (
        <div className="encounter-builder-wrapper tan-background">
            <div className="pf2e-section">
            <div className="title">Create Encounter</div>
                <div className="pf2e-section-content">
                    <form className="pf2e-form">
                        <div>
                            <label className="form-field-label">
                                <input className="pf2e-form-input" type="number" id="number-of-players" defaultValue={numberPlayers}/>
                                <span className="form-field-label-text">Number of Players</span>
                            </label>
                        </div>
                        <div>
                            <label className="form-field-label">
                                <input className="pf2e-form-input" type="number" id="avg-player-level" defaultValue={averagePartyLevel}/>
                                <span className="form-field-label-text">Average Player Level</span>
                            </label>
                        </div>
                    </form>
                    <button className="pf2e-btn" onClick={handleClick}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
