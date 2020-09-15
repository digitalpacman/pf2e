const { parenSplit } = require('../paren-split');
const removeHtml = require('../remove-html');
const actionCostParser = require('../action-cost-parser');
const trimit = require('../trimit');
const { toMarkdown } = require('../to-markdown');
const universalAbilities = require('../universal-abilities');

const reg = /<b>((?:(?!<\/b>).)+)<\/b>(?:.*<img.*src="([^"]+)[^>]+>)?(?:\s*\((.*?)\))?(?:\s*(\d+ feet)\.?(?:, (DC \d+))?)?(.*)/i;

const requirementsReg = /<b>\s*Requirements\s*<\/b>((?:(?!<b>\s*(?:Frequency|Trigger|Effect|Critical Success|Success|Failure|Critical Failure)\s*<\/b>).)*)/i;
const frequencyReg = /<b>\s*Frequency\s*<\/b>((?:(?!<b>\s*(?:Frequency|Trigger|Effect|Critical Success|Success|Failure|Critical Failure)\s*<\/b>).)*)/i;
const effectReg = /<b>\s*Effect\s*<\/b>((?:(?!<b>\s*(?:Frequency|Trigger|Effect|Critical Success|Success|Failure|Critical Failure)\s*<\/b>).)*)/i;
const triggerReg = /<b>\s*Trigger\s*<\/b>((?:(?!<b>\s*(?:Frequency|Trigger|Effect|Critical Success|Success|Failure|Critical Failure)\s*<\/b>).)*)/i;

const poisonReg = /<b>Saving Throw<\/b>([^;]+); <b>Maximum Duration<\/b>([^;]+);(.*)/i;

const poisonStagesReg = /<b>Stage \d<\/b>((?:(?!<b>Stage|;).)+)/gi;

const criticalSuccessReg = /<b>\s*Critical Success\s*<\/b>((?:(?!<br \/>|<b>\s*(?:Critical Success|Success|Failure|Critical Failure)\s*<\/b>).)+)/;
const successReg = /<b>\s*Success\s*<\/b>((?:(?!<br \/>|<b>\s*(?:Critical Success|Success|Failure|Critical Failure)\s*<\/b>).)+)/;
const failureReg = /<b>\s*Failure\s*<\/b>((?:(?!<br \/>|<b>\s*(?:Critical Success|Success|Failure|Critical Failure)\s*<\/b>).)+)/;
const criticalFailureReg = /<b>\s*Critical Failure\s*<\/b>((?:(?!<br \/>|<b>\s*(?:Critical Success|Success|Failure|Critical Failure)\s*<\/b>).)+)/;

function abilityParser(value) {
  const [, 
    nameMatch,
    ,
    traitList, 
    rangeMatch, 
    savingThrowMatch,
    descriptionMatch] = reg.exec(value) || [];
  
  const [,requirementsMatch] = requirementsReg.exec(value) || [];
  const [,frequencyMatch] = frequencyReg.exec(value) || [];
  const [,effectMatch] = effectReg.exec(value) || [];
  const [,triggerMatch] = triggerReg.exec(value) || [];

  const name = removeHtml(nameMatch);

  const [, criticalSuccessMatch] = criticalSuccessReg.exec(value) || [];
  const [, successMatch] = successReg.exec(value) || [];
  const [, failureMatch] = failureReg.exec(value) || [];
  const [, criticalFailureMatch] = criticalFailureReg.exec(value) || [];

  const reducedDescription = reduceDescription(descriptionMatch);

  const {
    saving_throw: poisonSavingThrow, maximum_duration, stages
  } = parsePoisonAbility(value);
  const action_cost = actionCostParser(value);
  const description = poisonSavingThrow ? null
    : toMarkdown(reducedDescription) || null;

  const critical_success = criticalSuccessMatch ? toMarkdown(criticalSuccessMatch) : null;
  const success = successMatch ? toMarkdown(successMatch) : null;;
  const failure = failureMatch ? toMarkdown(failureMatch) : null;;
  const critical_failure = criticalFailureMatch ? toMarkdown(criticalFailureMatch) : null;

  const requirements = requirementsMatch ? trimit(removeHtml(requirementsMatch), ';') : null;
  const frequency = frequencyMatch ? trimit(removeHtml(frequencyMatch), ';') : null;
  const trigger = triggerMatch ? trimit(removeHtml(triggerMatch)) : null;
  const effect = effectMatch ? trimit(toMarkdown(effectMatch)) : null;

  const full_description = null;
  const generic_description = null;
  const range = rangeMatch || null;
  const saving_throw = poisonSavingThrow || savingThrowMatch || null;
  const raw_description = toMarkdown(value);
  const traits = parenSplit(removeHtml(traitList));

  const ability = { name, action_cost, traits, description, critical_success, critical_failure,
    effect, frequency, failure, full_description, generic_description, range, raw_description, requirements,
    success, trigger, saving_throw, maximum_duration, stages };
  
  const universal = universalAbility(name);
  if (universal) {
    return { ...ability, ...universal };
  }

  return ability;
}

function reduceDescription(value) {
  value = value
    .replace(requirementsReg, '')
    .replace(frequencyReg, '')
    .replace(effectReg, '')
    .replace(triggerReg, '')
    .replace(criticalSuccessReg, '')
    .replace(successReg, '')
    .replace(failureReg, '')
    .replace(criticalFailureReg, '');

  value = value.trim();
  if (value === ';') {
    value = null;
  }

  return value;
}

function universalAbility(name) {
  for (let ability of universalAbilities) {
    if (ability.name === name) {
      return ability;
    }
  }
}

function parsePoisonAbility(value) {
  const [
    , savingThrowMatch, maximumDurationMatch, stagesMatch
  ] = poisonReg.exec(value) || [];

  const saving_throw = savingThrowMatch ? removeHtml(savingThrowMatch) : null;
  const maximum_duration = maximumDurationMatch ? removeHtml(maximumDurationMatch) : null;

  const stages = parsePoisonStages(stagesMatch);

  return { saving_throw, maximum_duration, stages };
}

function parsePoisonStages(value) {
  const stages = [];
  let effectMatch;
  while ([, effectMatch] = poisonStagesReg.exec(value) || []) {
    if (!effectMatch) {
      break;
    }

    const effect = toMarkdown(effectMatch);

    stages.push({ effect });
  }

  if (stages.length === 0) {
    return null;
  }

  return stages;
}

module.exports = abilityParser;