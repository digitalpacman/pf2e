import React from 'react';
import { MonsterDetail } from './MonsterDetail';
import { Link, useParams } from 'react-router-dom';
import './App.css';

export const MonsterDetailPage = ({ addToEncounter, enableEncounterBuilder, entries }) => {
  let { monsterPath } = useParams();
  const selected = entries.find(x => x.path === monsterPath);
  return (
    <div>
      {!enableEncounterBuilder ? null : (
        <div><button onClick={() => addToEncounter(selected)}>Add to encounter</button></div>
      )}
      <MonsterDetail monster={selected} />
    </div>
  );
};