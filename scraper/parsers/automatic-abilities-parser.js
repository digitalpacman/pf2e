const found = require('./found');
const splitAbilities = require('./ability-parsers/split-abilities');
const consumable = require('./consumable');
const { abilityParser } = require('./ability-parsers');
const { skip, has, br } = require('./navigation');

function automaticAbilitiesParser(haystack) {
  if (!has({ haystack, needle: '<b>HP</b>' })) {
    return;
  }

  const abilitySection = skip({ haystack, needle: '<b>HP</b>' }).limit('<hr />').skip(br).take();
  const abilityBlocks = splitAbilities(abilitySection);
  const consumer = consumable(abilityBlocks);
  const automatic_abilities = consumer(abilityParser);

  found('automatic_abilities', automatic_abilities);

  return { automatic_abilities };
}

module.exports = automaticAbilitiesParser;