import React from 'react';
import { MonsterDetail } from './MonsterDetail';
import { Link, useParams } from 'react-router-dom';
import './App.css';

export const MonsterDetailPage = ({ entries }) => {
  const { monsterPath } = useParams();
  const selected = entries.find(x => x.path === monsterPath);
  return (
    <div className="monster-detail-wrapper">
      <MonsterDetail monster={selected} />
    </div>
  );
};