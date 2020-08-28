import React, { useState } from 'react';
import './App.css';
import './Grid.css';
import { useHistory } from "react-router-dom";
import { AddMonsterButton } from './AddMonsterButton';
import { EncounterChip } from './EncounterChip';
import { ReactComponent as CaretRight} from './CaretRight.svg';
import { ReactComponent as Delete } from './DeleteEncounter.svg';

  export const EncounterBuilderControls = ({ 
      enableEncounterBuilder,
      monster,
      addToEncounter,
      encounterXp,
      encounterXpThreshold,
      encounterThreat,
      encounterMonsters,
      removeFromEncounter,
      closeEncounterBuilder,
      encounterBuilderControlsExpanded,
      expandCollapseEncounterBuilder
    }) => {

    let history = useHistory();
    const encounterMonsterClassName = encounterBuilderControlsExpanded ? 'encounter-monsters' : 'hidden';
    const expandCollapseWrapperClasses = encounterBuilderControlsExpanded ? 'expanded' : ''

    const handleExpandCollapse = (e) => {
        const wrapper = e.target.closest('span');
        expandCollapseEncounterBuilder(wrapper);
    } 

    const handleCloseEncounterBuilder = () => {
        closeEncounterBuilder();
    }

    return (
        <div className="encounter-controls-wrapper">
            {history.location.pathname.startsWith('/monster') && enableEncounterBuilder ? 
            (<AddMonsterButton enableEncounterBuilder={enableEncounterBuilder} monster={monster} addToEncounter={addToEncounter}/>) : null}
             {enableEncounterBuilder ? (
                <div className="encounter-builder-snackbar">
                    <div className="flex space-between">
                        <div className="flex">
                            <span id="encounter-builder-expand-collapse-wrapper" className={expandCollapseWrapperClasses}>
                                <CaretRight onClick={(e) => handleExpandCollapse(e)}/>
                            </span>
                            <span className="encounter-controls-title">{encounterXp} of {encounterXpThreshold}xp {encounterThreat} Encounter&nbsp;</span>
                        </div>
                        <span className="flex clickable">
                            <Delete onClick={(e) => handleCloseEncounterBuilder()}/>
                        </span>
                    </div>
                    <div id="encounter-monsters" className={encounterMonsterClassName}>
                        {encounterMonsters.map((x, i) => (<EncounterChip key={i} monster={x} index={i} removeFromEncounter={removeFromEncounter}/>))}
                    </div>
                </div>
             ) : null}
        </div>
    ); 
  }