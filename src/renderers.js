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
  const bonus = skill.bonus !== null ? ` +${skill.bonus}` : null;
  return (
    <span key={skill.name} className="csv">{skill.name}{bonus}{misc}</span>
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

export const renderTrait = (trait, i) => {
  const className = `trait`;
  return (
    <span key={i} className={className}>{trait}</span>
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

export const renderAbility = ({
  name, action_cost, traits, frequency, range, description,
  trigger, requirements, effect,
  critical_success, success, failure, critical_failure,
  saving_throw, maximum_duration, stages,
}) => {

  return (
    <div key={name} className="ability">
      <strong>{name}</strong> 
      {action_cost ? actionCostImage(action_cost) : ''}
      {traits ? <span> ({traits.map(renderCsv)}) </span>: ''}
      {range && `${range}. `}
      {markdown(description)}
      {frequency && <span><strong>Frequency</strong> {markdown(frequency)}</span>}
      {requirements && <span><strong>Requirements</strong> {markdown(requirements)}</span>}
      {trigger && <span><strong> Trigger</strong>{markdown(trigger)}</span>}
      {effect && <span><strong> Effect</strong>{markdown(effect)}</span>}
      {critical_success && <div className="save-result"><strong>Critical Success</strong> {markdown(critical_success)}</div>}
      {success && <div className="save-result"><strong>Success</strong> {markdown(success)}</div>}
      {failure && <div className="save-result"><strong>Failure</strong> {markdown(failure)}</div>}
      {critical_failure && <div className="save-result"><strong>Critical Failure</strong> {markdown(critical_failure)}</div>}
      {saving_throw && <span><strong> Saving Throw</strong> {markdown(saving_throw)}</span>}
      {maximum_duration && <span><strong> Maximum Duration</strong> {markdown(maximum_duration)}</span>}
      {stages?.map((stage, i) => <span key={i}><strong> Stage {i+1}</strong> {markdown(stage)}</span>)}
    </div>
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

export const renderSpellList = ({ spells_source, spell_lists, cantrips, constants, dc, attack_bonus, misc }) => {
  const dcComponent = dc && `DC ${dc}`;
  const attackBonusComponent = attack_bonus && `attack +${attack_bonus}`;
  const miscComponent = [
    { key: 'dc', component: dcComponent },
    { key: 'attack bonus', component: attackBonusComponent },
    { key: 'misc', component: misc },
  ].filter(x => x.component).map(x => <React.Fragment key={x.key}> {x.component}, </React.Fragment>);

  return (
    <div key={spells_source}>
      <strong>{spells_source}</strong>
      {miscComponent}
      {spell_lists?.map(renderSpellGroup)}
      {cantrips?.length > 0 && (<strong>Cantrips</strong>)} {cantrips?.map(renderSpellGroup)}
      {constants?.length > 0 && (<strong>Constant</strong>)} {constants?.map(renderSpellGroup)}
    </div>
  );
};

export const description = (description, sideText) => {
  if (sideText) {
    return (
      <div className="desc-side-text-container">
        <div className="seventy">
          <div className="description">
            {markdown(description)}
          </div>
        </div>
        <div className="thirty">
          <div className="side-text-wrapper">
            <div className="side-text">
              {markdown(sideText)}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
        <div className="description">
          {markdown(description)}
        </div>
      );
  }
};

export const levelTextEnding = (level) => {
  if (level === 1) {
    return `${level}st`;
  }
  if (level === 2) {
    return `${level}nd`;
  }
  if (level === 3) {
    return `${level}rd`;
  }
  return `${level}th`;
};

export const renderSpellGroup = (spellGroup) => {
  const levelText = levelTextEnding(spellGroup.level);
  const level = <strong>{levelText}</strong>;
  return (
    <span key={levelText} className="scsv">{level} {spellGroup.spells.map(renderSpell)}</span>
  );
};

export const renderSpell = (spell) => {
  return (
    <span key={spell.name} className="csv">
      {spell.name}
      {spell.misc && ` (${spell.misc})`}</span>
  );
};

export const renderMeleeAttack = (monster, attack) => {
  return renderAttack(monster, attack, 'Melee');
};

export const renderRangedAttack = (monster, attack) => {
  return renderAttack(monster, attack, 'Ranged');
};

export const renderDamageFormula = (damage) => {
  if (damage.length === 0) {
    return '';
  }

  damage = damage.map(({formula, type}, i) => {
    const prefix = damage.length > 2 && i === damage.length - 1 ? ', and' : i > 0 ? ',' : '';
    return [prefix, formula, type].filter(x => !!x).join(' ');
  }).join('');

  return (
    <span><strong> Damage</strong> {damage}</span>
  );
};

export const renderAttack = (monster, attack, kind) => {
  try {
    const traits = attack.traits ? (<span> ({attack.traits?.map(renderCsv)})</span>) : null;
    return (
      <div key={attack.name}>
        <strong>{kind}</strong> {actionCostImage(attack.action_cost)} {attack.name} {signed(attack.to_hit)}{traits},
        {renderDamageFormula(attack.damage)}
        {attack.effect && <span><strong>Effect</strong> {attack.effect}</span>}
      </div>
    );
  } catch (err) {  
    console.error(err)
    console.error(monster)
    console.error(attack)
    throw err;
  }
};

export const renderSource = (source, i) => {
  const sourceText = source.page_start !== null ? `${source.abbr} pg. ${source.page_start}` : source.abbr;
  return (
    <span key={i} className="csv-semicolon">{sourceText}</span>
  );
};

export const renderSave = (name, bonus, miscText) => {
  const misc = miscText  ? (<span> ({miscText})</span>) : null;
  return (
    <span className="csv"><strong>{name}</strong> {signed(bonus)}{misc}</span>
  );
};