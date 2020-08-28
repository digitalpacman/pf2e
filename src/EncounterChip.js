import React from 'react';
import './App.css';
import './Grid.css';
import { ReactComponent as Delete} from './Delete.svg';

export const EncounterChip = ({ monster, index, removeFromEncounter }) => {

    const handleClick = () => {
        removeFromEncounter(index)
    }  

    return (
        <span className="chip clickable" onClick={(e) => handleClick()}>
            <span className="chip-label">
                {monster.name}
                <span className="spacer"/>
                <Delete/>
            </span>
        </span>
    ); 
  }