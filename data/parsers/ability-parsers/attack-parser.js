const { parenSplit } = require('../paren-split');
const removeHtml = require('../remove-html');
const actionCostParser = require('../action-cost-parser');

const meleeReg = /<b>\s*Melee\s*<\/b>\s*<img [^>]+>\s*<img [^>]+>((?:(?!\+\d+|-\d+).)+)([+-]\d+)[^\]]+\]\s*(?:\s*\((.*?)\))?,\s*<b>(?:Damage|Effect)<\/b>\s*(.*)/i;
const rangedReg = /<b>\s*Ranged\s*<\/b>\s*<img [^>]+>\s*<img [^>]+>((?:(?!\+\d+|-\d+).)+)([+-]\d+)[^\]]+\]\s*(?:\s*\((.*?)\))?,\s*<b>(?:Damage|Effect)<\/b>\s*(.*)/i;
const formulaReg = /(\d+d\d+(?:[\-\+]\d+)?)?\s*(.*)/i;

function attackParser(kind, value) {
  const reg = kind === 'Melee' ? meleeReg : rangedReg;
  const [, 
    nameMatch,
    toHitMatch,
    traitMatch,
    formulaMatch] = reg.exec(value) || [];
  
  if (!nameMatch) {
    return;
  }
  
  const name = removeHtml(nameMatch);
  const action_cost = actionCostParser(value);
  const to_hit = parseInt(toHitMatch);
  const traits = parenSplit(removeHtml(traitMatch));
  const { damage, plus_damage } = parseDamages(formulaMatch);

  return { name, action_cost, to_hit, traits, damage, plus_damage };
}

function parseDamages(value) {
  const [damageBlock, plusBlocks] = value.split(' plus ');
  const damage = parseDamage(damageBlock);
  const plusDamages = plusBlocks ? parenSplit(plusBlocks.replace(' and ', ',')) : null;
  const plus_damage = plusDamages ? plusDamages.map(parseDamage) : null;

  return { damage, plus_damage };
}

function parseDamage(value) {
  value = value.trim();
  const [, formulaMatch, typeMatch ] = formulaReg.exec(value);
  const formula = formulaMatch ? formulaMatch.trim() : null;
  const type = removeHtml(typeMatch);

  return { formula, type };
}

module.exports = attackParser;
