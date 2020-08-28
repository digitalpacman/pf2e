import React from 'react';
import './App.css';
import './Grid.css';
import { useHistory } from "react-router-dom";

  export const AddMonsterButton = ({ enableEncounterBuilder, monster, addToEncounter }) => {
    let history = useHistory();

    const handleClick = (monster) => {
        addToEncounter(monster)
    }  

    if(history.location.pathname.startsWith('/monster') && enableEncounterBuilder) {
        return (
            <div className="encounter-builder-add-monster-btn" onClick={(e) => handleClick(monster)}>
                +
            </div>
        ) 
    } else {
        return null;
    }
  }