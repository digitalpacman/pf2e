import React from 'react';
import './App.css';
import * as renderer from './renderers';

export const MonsterDetail2 = ({monster}) => {
  console.log(monster)
  return (
    <div key={monster.name} className="monster tan-background">
      
      <h1 className="monster-heading">
        <a className="name" href={monster.url}>{monster.name}</a>
        <span className="level"> Level {monster.level}</span>
      </h1>
      {monster.traits && <h2 className="traits">
        {monster.traits.map((trait, i) => renderer.renderTrait(trait, i))}
      </h2>}
      {monster.description && <div className="description">
        {renderer.markdown(monster.description)}
      </div>}
      {monster.source && <div className="sources">
        <strong>Source</strong> {monster.source.map(renderer.renderSource)}
      </div>}
      {monster.senses && <div className="senses">
        <strong>Senses</strong> {monster.senses.map(renderer.renderCsv)}
      </div>}
      {monster.languages && <div className="languages">
        <strong>Languages</strong> {monster.languages.map(renderer.renderCsv)}
      </div>}
      {monster.skills && <div className="skills">
        <strong>Skills</strong> {monster.skills.map(renderer.renderSkills)}
      </div>}
      {monster.ability_mods && <div className="attributes">
        <span className="csv"><strong>Str</strong> {renderer.signed(monster.ability_mods.str_mod)}</span>
        <span className="csv"><strong>Dex</strong> {renderer.signed(monster.ability_mods.dex_mod)}</span>
        <span className="csv"><strong>Con</strong> {renderer.signed(monster.ability_mods.con_mod)}</span>
        <span className="csv"><strong>Int</strong> {renderer.signed(monster.ability_mods.int_mod)}</span>
        <span className="csv"><strong>Wis</strong> {renderer.signed(monster.ability_mods.wis_mod)}</span>
        <span className="csv"><strong>Cha</strong> {renderer.signed(monster.ability_mods.cha_mod)}</span>
      </div>}
      <div>
        {monster.sense_abilities?.map(a => renderer.renderAbility(a, monster))}
      </div>
      {monster.items && <div><strong>Items</strong> {monster.items?.map(renderer.renderCsv)}</div>}
      <hr />
      <div>
        <span>
          {monster.ac && <span className="armor-class csv">
            <strong>AC</strong> {monster.ac}
            {monster.ac_special && <span> ({monster.ac_special?.map(ac => ac.descr).map(renderer.renderCsv)})</span>}
          </span>}
          {monster.saves && renderer.renderSave('Fort', monster.saves.fort, monster.saves.fort_misc)}
          {monster.saves && renderer.renderSave('Ref', monster.saves.ref, monster.saves.ref_misc)}
          {monster.saves && renderer.renderSave('Will', monster.saves.will, monster.saves.will_misc)}
        </span>
        {monster.saves?.misc && <span>; {monster.saves.misc}</span>}
      </div>
      <div>
        {monster.hp && <span className="hit-points"><strong>HP</strong> {monster.hp}</span>}
        {monster.hp_misc && <span> ({monster.hp_misc})</span>}
        {monster.immunities && <span>; <strong>Immunities</strong> {monster.immunities?.map(renderer.renderCsv)}</span>}
        {monster.resistances && <span>; <strong>Resistances</strong> {monster.resistances?.map(a => renderer.renderSpeed(a, monster))}</span>}
        {monster.weaknesses && <span>; <strong>Weaknesses</strong> {monster.weaknesses?.map(a => renderer.renderSpeed(a, monster))}</span>}
      </div>
      <div>
        {monster.automatic_abilities?.map(a => renderer.renderAbility(a, monster))}
      </div>
      <hr />
      {monster.speed && <div><strong>Speed</strong> {monster.speed.map(a => renderer.renderSpeed(a, monster))}</div>}
      <div>{monster.melee?.map(attack => renderer.renderMeleeAttack(monster, attack))}</div>
      <div>{monster.ranged?.map(attack => renderer.renderRangedAttack(monster, attack))}</div>
      {monster.spell_lists?.map(renderer.renderSpellList)}
      <div>
        {monster.proactive_abilities?.map(a => renderer.renderAbility(a, monster))}
      </div>
      {monster.ritual_lists?.map(renderer.renderSpellList)}
    </div>
  );
}