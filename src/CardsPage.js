import React from 'react';
import './App.css';

export const CardsPage = ({ search, setSearch, entries, changeSort, fields, toggleSortDir, sortDir, clear, cardOptions, cardOptionToggle, renderCard }) => {
  return (
    <div>
      <div className="search"><input className="search-box" type="text" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} /></div>
      <div className="matched">matched {entries.length}</div>
      <select onChange={changeSort}>
        {fields.map(x => (<option key={x} value={x}>{x}</option>))}
      </select>
      <button onClick={toggleSortDir}>{sortDir === 'asc' ? 'asc' : 'desc'}</button> <button onClick={clear}>Clear Work</button>
      <div>
        {Object.keys(cardOptions).map(x => 
          (<span key={x}><input type="checkbox" name={x} checked={cardOptions.indexOf(x) !== -1} onChange={cardOptionToggle} /> {x}</span>))}
      </div>
      <ul className="cards">
        {entries.map(renderCard)}
      </ul>
    </div>
  );
};