const abilityParser = require('./ability-parser');
const found = require('./found');
const { has, skip, br, hangingIndent } = require('./navigation');

function abilitiesParser(indicator, haystack) {
  if (!has({ haystack, needle: indicator})) {
    return;
  }

  const abilitySection = skip({ haystack, needle: indicator }).limit('<hr />').skip(br).take();
  const abilities = abilitySection.split(new RegExp(`${br}|${hangingIndent}|</span>`, 'gi'))
    .map(x => x.trim())
    .map(abilityParser)
    .filter(x => x.length > 0);

  found('abilities', abilities);
  return { abilities };
}

module.exports = abilitiesParser;