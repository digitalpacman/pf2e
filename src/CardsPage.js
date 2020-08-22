import React from 'react';
import { Link } from "react-router-dom";
import './App.css';

const Card = React.memo(({monster}) => {
  return (
    <li>
      <div><strong>{monster.name}</strong></div><div>Level {monster.level}</div>
    </li>
  );
});

export const CardsPage = ({ search, setSearch, entries, showDetailed, matched, onLoadMore, loadMore }) => {
  const monsters = loadMore ? entries : entries.slice(0, Math.min(25, entries.length));

  if (entries.length < 25) {
    loadMore = true;
  }

  return (
    <div>
      <div className="search"><input className="search-box" type="text" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} /></div>
      <div className="matched">matched {matched}</div>
      <ul className="cards">
        {monsters.map((monster) => {
          return (
            <Link className="clickable card" key={monster.link} to={monster.link} onClick={() => showDetailed(monster)}>
              <Card monster={monster} />
            </Link>
          );
        })}
      </ul>
      {!loadMore && <h1 onClick={onLoadMore}>Load More</h1>}
    </div>
  );
};