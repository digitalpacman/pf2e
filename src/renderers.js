import React from 'react';
import showdown from 'showdown';
import freeAction from './FreeAction.png';
import reaction from './Reaction.png';
import oneAction from './OneAction.png';
import twoActions from './TwoActions.png';
import threeActions from './ThreeActions.png';

const converter = new showdown.Converter({ underline: true });

export const renderSkills = (skill) => {
  const misc = skill.misc ? ` (${skill.misc})` : null;
  return (
    <span key={skill.name} className="csv">{skill.name} +{skill.bonus}{misc}</span>
  );
};

export const actionCostImage = (actionCost) => {
  let image;
  if (actionCost === 'Reaction') {
    image = reaction;
  } else if (actionCost === 'One Action') {
    image = oneAction;
  } else if (actionCost === 'Two Actions') {
    image = twoActions;
  } else if (actionCost === 'Three Actions') {
    image = threeActions;
  } else if (actionCost === 'Free Action') {
    image = freeAction;
  }

  if (image) {
    return (<img className="action-cost-icon" src={image} />);
  }
  return null;
};

export const renderTrait = (trait, additionalClassName = '') => {
  const className = `trait ${additionalClassName}`;
  return (
    <span key={trait} className={className}>{trait}</span>
  );
};

export const renderSpeed = (speed, m) => {
  const amount = speed.amount ? ` ${speed.amount}` : null;
  return (
    <span key={speed.type} className="csv">{speed.type}{amount}</span>
  );
}

export const renderCsv = (sense) => {
  return (
    <span key={sense} className="csv">{sense}</span>
  );
};

export const markdown = (html) => {
  if (html) {
    return (<span className="markdown" dangerouslySetInnerHTML={{ __html: converter.makeHtml(html) }}></span>);
  }
  return null;
};

export const renderAbility = (x, m) => {
  const actionCost = x.action_cost ? (<span>{actionCostImage(x.action_cost)}</span>) : null;
  const trigger = x.trigger ? (<span><strong>Trigger</strong> {markdown(x.trigger)}</span>) : null;
  const requirements = x.requirements ? (<span><strong>Requirements</strong> {markdown(x.requirements)}</span>) : null;
  const effect = x.effect ? (<span><strong>Effect</strong> {markdown(x.effect)}</span>) : null;
  const critical_success = x.critical_success ? (<div className="save-result"><strong>Critical Success</strong> {x.critical_success}</div>) : null;
  const success = x.success ? (<div className="save-result"><strong>Success</strong> {x.success}</div>) : null;
  const failure = x.failure ? (<div className="save-result"><strong>Failure</strong> {x.failure}</div>) : null;
  const critical_failure = x.critical_failure ? (<div className="save-result"><strong>Critical Failure</strong> {x.critical_failure}</div>) : null;
  const traits = x.traits ? (<span>({x.traits.map(renderCsv)})</span>) : null;
  const frequency = x.frequency ? (<span><strong>Frequency</strong> {x.frequency}</span>) : null;
  const description = x.description ? markdown(x.description) : null;
  const genericDescription = x.generic_description ? markdown('. ' + x.generic_description) : null;
  const effects = x.effects ? (<div className="effects">{x.effects.map(renderAbility)}</div>) : null;

  return (
    <div key={x.name} className="ability"><strong>{x.name}</strong> {actionCost} {traits} {frequency} {description}{genericDescription} {requirements} {trigger} {effect} {critical_success} {success} {failure} {critical_failure} {effects}</div>
  );
};

export const signed = (value) => {
  value = parseInt(value);
  if (value >= 0) {
    return `+${value}`;
  }
  return `${value}`;
};

export const toArray = (o) => {
  if (!o) return null;
  return Object.entries(o).map(x => ({ name: x[0], value: x[1] }));
};

export const renderSpellList = (spellList) => {
  const spells = spellList.spell_groups.filter(x => x.level != 0 && x.level != -1);
  const cantrips = spellList.spell_groups.filter(x => x.level == 0);
  const constants = spellList.spell_groups.filter(x => x.level == -1);
  const dc = spellList.dc ? `DC ${spellList.dc}` : null;
  const to_hit = spellList.to_hit ? `attack +${spellList.to_hit}` : null;
  const misc = dc && spellList.to_hit ? (<span> {dc}, {to_hit}; </span>) :
    dc ? (<span> {dc}; </span>) :
      to_hit ? (<span> {to_hit}; </span>) :
        '; ';

  return (
    <div key={spellList.name}>
      <strong>{spellList.name}</strong>{misc}
      {spells.map(renderSpellGroup)}
      {ifExists(cantrips.length > 0, (<strong>Cantrips</strong>))} {cantrips.map(renderSpellGroup)}
      {ifExists(constants.length > 0, (<strong>Constant</strong>))} {constants.map(renderSpellGroup)}
    </div>
  );
};

export const levelTextEnding = (level) => {
  if (level === '1') {
    return `${level}st`;
  }
  if (level === '2') {
    return `${level}nd`;
  }
  if (level === '3') {
    return `${level}rd`;
  }
  return `${level}th`;
};

export const renderSpellGroup = (spellGroup) => {
  const levelText = levelTextEnding(spellGroup.level > 0 ? spellGroup.level : spellGroup.heightened_level);
  const level = spellGroup.level > 0 ? (<strong>{levelText}</strong>) : (<strong>({levelText})</strong>);
  return (
    <span key={levelText} className="scsv">{level} {spellGroup.spells.map(renderSpell)}</span>
  );
};

export const renderSpell = (spell) => {
  return (
    <span key={spell.name} className="csv">{ifExists(spell.requirement, (<span>({spell.requirement})</span>))} {spell.name}{ifExists(spell.frequency, ` (${spell.frequency})`)}</span>
  );
};

export const renderMeleeAttack = (monster, attack) => {
  return renderAttack(monster, attack, 'Melee');
};

export const renderRangedAttack = (monster, attack) => {
  return renderAttack(monster, attack, 'Ranged');
};

export const renderDamageFormula = (damage, plusDamage) => {
  const plus = plusDamage?.map(x => {
    return (
      <span key={x.formula + ' ' + x.type} className="csv oxford-comma">{x?.formula} {x?.type}</span>
    );
  });

  const plusSection = plus ? (
    <span>plus {plus}</span>
  ) : null;

  return (
    <span><strong>Damage</strong> {damage?.formula} {damage?.type} {plusSection}</span>
  );
};

export const renderAttack = (monster, attack, kind) => {
  try {
    const traits = attack.traits ? (<span> ({attack.traits?.map(renderCsv)})</span>) : null;
    return (
      <div key={attack.name}>
        <strong>{kind}</strong> {actionCostImage(attack.action_cost)} {attack.name} {signed(attack.to_hit)}{traits}, {renderDamageFormula(attack.damage, attack.plus_damage)}
      </div>
    );
  } catch (err) {
    console.log(err)
    console.log(monster)
    console.log(attack)
    throw err;
  }
};

export const ifExists = (check, block) => {
  if (check) {
    return block;
  }
  return null;
};

export const renderSource = (source) => {
  return (
    <span key={source.abbr + source.page_start} className="csv">{source.abbr} pg. {source.page_start}</span>
  );
};

export const renderSave = (name, bonus, miscText) => {
  const misc = miscText  ? (<span> ({miscText})</span>) : null;
  return (
    <span className="csv"><strong>{name}</strong> {signed(bonus)}{misc}</span>
  );
};