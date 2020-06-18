import React, { useState, useEffect } from 'react';
import './App.css';
import * as renderer from './renderers.js';

export const MonsterDetail = ({monster: x}) => {
  if (!x) {
    return null;
  }
  return (
    <div key={x.name}>
      <h1>
        <a className="name" href={x.url}>{x.name}</a>
        <span className="name"> Level {x.level}</span>
      </h1>
      <h2>{x.traits.map(trait => renderer.renderTrait(trait))}</h2>
      <div className="description">{renderer.markdown(x.description)}</div>
      <div><strong>Source</strong> {x.source?.map(renderer.renderSource)}</div>
      <div><strong>Senses</strong> {x.senses?.map(renderer.renderCsv)}</div>
      {renderer.ifExists(x.languages, (
        <div><strong>Languages</strong> {x.languages?.map(renderer.renderCsv)}</div>
      ))}
      <div><strong>Skills</strong> {x.skills?.map(renderer.renderSkills)}</div>
      <div>
        <span className="csv"><strong>Str</strong> {renderer.signed(x.ability_mods.str_mod)}</span>
        <span className="csv"><strong>Dex</strong> {renderer.signed(x.ability_mods.dex_mod)}</span>
        <span className="csv"><strong>Con</strong> {renderer.signed(x.ability_mods.con_mod)}</span>
        <span className="csv"><strong>Int</strong> {renderer.signed(x.ability_mods.int_mod)}</span>
        <span className="csv"><strong>Wis</strong> {renderer.signed(x.ability_mods.wis_mod)}</span>
        <span className="csv"><strong>Cha</strong> {renderer.signed(x.ability_mods.cha_mod)}</span>
      </div>
      <div>
        {x.sense_abilities?.map(a => renderer.renderAbility(a, x))}
      </div>
      {renderer.ifExists(x.items, (
        <div><strong>Items</strong> {x.items?.map(renderer.renderCsv)}</div>
      ))}
      <hr />
      <div>
        <span>
          <span className="csv"><strong>AC</strong> {x.ac}{renderer.ifExists(x.ac_special, (<span> ({x.ac_special?.map(ac => ac.descr).map(renderer.renderCsv)})</span>))}</span>
          {renderer.renderSave('Fort', x.saves.fort, x.saves.fort_misc)}
          {renderer.renderSave('Ref', x.saves.ref, x.saves.ref_misc)}
          {renderer.renderSave('Will', x.saves.will, x.saves.will_misc)}
        </span>
        {renderer.ifExists(x.saves.misc, (
          <span>; {x.saves.misc}</span>
        ))}
      </div>
      <div><strong>HP</strong> {x.hp}{renderer.ifExists(x.hp_misc, (<span> ({x.hp_misc})</span>))}{renderer.ifExists(x.immunities, (<span>; <strong>Immunities</strong> {x.immunities?.map(renderer.renderCsv)}</span>))}{renderer.ifExists(x.resistances, (<span>; <strong>Resistances</strong> {x.resistances?.map(a => renderer.renderSpeed(a, x))}</span>))}{renderer.ifExists(x.weaknesses, (<span>; <strong>Weaknesses</strong> {x.weaknesses?.map(a => renderer.renderSpeed(a, x))}</span>))}</div>
      <div>
        {x.automatic_abilities?.map(a => renderer.renderAbility(a, x))}
      </div>
      <hr />
      <div><strong>Speed</strong> {x.speed.map(a => renderer.renderSpeed(a, x))}</div>
      <div>{x.melee?.map(attack => renderer.renderMeleeAttack(x, attack))}</div>
      <div>{x.ranged?.map(attack => renderer.renderRangedAttack(x, attack))}</div>
      {x.spell_lists?.map(renderer.renderSpellList)}
      <div>
        {x.proactive_abilities?.map(a => renderer.renderAbility(a, x))}
      </div>
      {x.ritual_lists?.map(renderer.renderSpellList)}
    </div>
  );
}