const found = require('./found');
const splitAbilities = require('./ability-parsers/split-abilities');
const consumable = require('./consumable');
const { abilityParser } = require('./ability-parsers');
const { skip, br } = require('./navigation');

function senseAbilitiesParser(haystack) {
  const abilitySection = skip({ haystack, needle: '<b>Cha</b>' })
    .limit('<hr />')
    .limit('<b>Items')
    .skip(br)
    .take();
  
  if (!abilitySection) {
    return;
  }

  const abilityBlocks = splitAbilities(abilitySection);

  const consumer = consumable(abilityBlocks);
  const sense_abilities = consumer(abilityParser);

  found('sense_abilities', sense_abilities);

  return { sense_abilities };
}

module.exports = senseAbilitiesParser;