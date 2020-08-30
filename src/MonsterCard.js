import React  from 'react';

export const MonsterCard = ({monster}) => {
    return (
      <div className='card'>
        <div className="flex space-between">
          <h3 className='monster-card-title'>
            {monster.name}
          </h3>
          <h3 className="monster-card-title">
            {monster.level}
          </h3>
        </div>
        <div className="monster-card-traits">
          {monster.traits.map(trait => <span key={monster.name + trait} className="chip trait-chip">{trait}</span>)}
        </div>
      </div>
    );
}