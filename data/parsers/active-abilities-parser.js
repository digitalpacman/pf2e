const consumable = require('./consumable');
const found = require('./found');
const splitAbilities = require('./ability-parsers/split-abilities');
const { abilityParser, spellParser, attackParser } = require('./ability-parsers');
const { skip, has, br } = require('./navigation');

function activeAbilitiesParser(haystack) {
  if (!has({ haystack, needle: '<b>Speed</b>' })) {
    return;
  }

  const abilitySection = skip({ haystack, needle: '<b>Speed</b>' }).limit('<hr />').skip(br).take();
  const abilityBlocks = splitAbilities(abilitySection);
  const consumer = consumable(abilityBlocks);
  const spell_lists = consumer(spellParser);
  const melee_attacks = consumer(x => attackParser('Melee', x));
  const ranged_attacks = consumer(x => attackParser('Ranged', x));
  const active_abilities = consumer(abilityParser);

  found('melee_attacks', melee_attacks);
  found('ranged_attacks', ranged_attacks);
  found('spell_lists', spell_lists);
  found('active_abilities', active_abilities);

  return { active_abilities, spell_lists, melee_attacks, ranged_attacks };
}

module.exports = activeAbilitiesParser;