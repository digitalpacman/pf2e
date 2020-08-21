import React from 'react';
import './App.css';

export const CardsPage = ({ search, setSearch, entries, renderCard }) => {

  const width = '1800px';
  const height = '12567px';

  return (
    <div>
      <div className="search"><input className="search-box" type="text" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} /></div>
      <div className="matched">matched {entries.length}</div>
      <ul className="cards" style={{width, height}}>
        {entries.slice(0, 60).map(renderCard)}
      </ul>
    </div>
  );
};