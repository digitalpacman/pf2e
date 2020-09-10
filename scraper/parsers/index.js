const nameParser = require('./name-parser');
const descriptionParser = require('./description-parser');
const levelParser = require('./level-parser');
const abilityModsParser = require('./ability-mods-parser');
const alignmentParser = require('./alignment-parser');
const armorClassParser = require('./armor-class-parser');
const hitpointsParser = require('./hitpoints-parser');
const immunitiesParser = require('./immunities-parser');
const itemsParser = require('./items-parser');
const languagesParser = require('./languages-parser');
const perceptionParser = require('./perception-parser');
const rarityParser = require('./rarity-parser');
const resistancesParser = require('./resistances-parser');
const savesParser = require('./saves-parser');
const sensesParser = require('./senses-parser');
const sizeParser = require('./size-parser');
const skillsParser = require('./skills-parser');
const sourcesParser = require('./sources-parser');
const speedsParser = require('./speeds-parser');
const traitsParser = require('./traits-parser');
const weaknessesParser = require('./weaknesses-parser');

module.exports = [
  nameParser,
  descriptionParser,
  levelParser,
  abilityModsParser,
  alignmentParser,
  armorClassParser,
  hitpointsParser,
  immunitiesParser,
  itemsParser,
  languagesParser,
  perceptionParser,
  rarityParser,
  resistancesParser,
  savesParser,
  sensesParser,
  sizeParser,
  skillsParser,
  sourcesParser,
  speedsParser,
  traitsParser,
  weaknessesParser,
];