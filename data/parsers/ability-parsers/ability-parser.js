const { parenSplit } = require('../paren-split');
const removeHtml = require('../remove-html');
const actionCostParser = require('../action-cost-parser');
const trimit = require('../trimit');
const { toMarkdown } = require('../to-markdown');
const universalAbilities = require('../universal-abilities');
const miniSections = require('./ability-sub-sections');

const reg = /<b>((?:(?!<\/b>).)+)<\/b>(?:.*<img.*src="([^"]+)[^>]+>)?(?:\s*\((.*?)\))?(?:\s*(\d+ feet)\.?(?:, (DC \d+))?)?(.*)/i;

function parseMiniSections(value) {
  const terminators = miniSections.join('|');
  const regs = miniSections.map(x => 
    new RegExp(`<b>\\s*(${x})\\s*<\\/b>((?:(?!<b>\\s*(?:${terminators})\\s*<\\/b>).)*)`, 'i'));

  const keys = miniSections.map(x => x.toLowerCase().replace(' ', '_')).filter(x => !x.startsWith('stage'));
  
  let nameMatch, descrMatch;
  const fields = {};
  for (let prefill of keys) {
    fields[prefill] = null;
  }
  const stages = [];
  const matches = regs.map(x => x.exec(value)).filter(x => !!x);
  for ([, nameMatch, descrMatch] of matches)
  {
    const name = nameMatch.trim();
    const key = name.toLowerCase().replace(' ', '_');
    const descr = trimit(toMarkdown(descrMatch), ';').trim();
    if (key.startsWith('stage'))
    {
      const effect = descr;
      stages.push({ effect });
    } else {
      fields[key] = descr;
    }
  }

  fields['stages'] = stages.length > 0 ? stages : null;

  return fields;
}

function removeMiniSections(value) {
  const terminators = miniSections.join('|');
  const regs = miniSections.map(x => 
    new RegExp(`<b>\\s*(${x})\\s*<\\/b>((?:(?!<b>\\s*(?:${terminators})\\s*<\\/b>).)*)`, 'gi'));
  
  for (let reg of regs) {
    value = value.replace(reg, '');
  }

  return value;
}

function abilityParser(value) {
  const [, 
    nameMatch,
    ,
    traitList, 
    rangeMatch, 
    savingThrowMatch,
    descriptionMatch] = reg.exec(value) || [];

  const name = removeHtml(nameMatch);
  const basicSavingThrow = savingThrowMatch ? savingThrowMatch.trim() : null;

  const description = trimit(toMarkdown(removeMiniSections(descriptionMatch)), ';').trim() || null;
  const action_cost = actionCostParser(value);

  const {
    critical_success,
    success,
    failure,
    critical_failure,
    requirements,
    frequency,
    trigger,
    effect,
    saving_throw,
    maximum_duration,
    stages,
  } = parseMiniSections(value);

  const range = rangeMatch || null;
  const raw_description = toMarkdown(value);
  const traits = parenSplit(removeHtml(traitList));

  const ability = { name, action_cost, traits, description, critical_success, critical_failure,
    effect, frequency, failure, range, raw_description, requirements,
    success, trigger, saving_throw: saving_throw || basicSavingThrow, maximum_duration, stages };
  
  const universal = universalAbility(name);
  if (universal) {
    return { ...ability, ...universal };
  }

  return ability;
}

function universalAbility(name) {
  for (let ability of universalAbilities) {
    if (ability.name === name) {
      return ability;
    }
  }
}

module.exports = abilityParser;