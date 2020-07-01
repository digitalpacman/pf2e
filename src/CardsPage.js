import React from 'react';
import './App.css';

export const CardsPage = ({ search, setSearch, entries, renderCard }) => {
  return (
    <div>
      <div className="search"><input className="search-box" type="text" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} /></div>
      <div className="matched">matched {entries.length}</div>
      <ul className="cards">
        {entries.map(renderCard)}
      </ul>
    </div>
  );
};