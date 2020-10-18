const { br, hangingIndent } = require('../navigation');
const removeHtml = require('../remove-html');
const subSections = require('./ability-sub-sections');


function splitAbilities(abilitiesBlock) {
  const pattern = `(?=${br}\\s*<b>)${br}|${hangingIndent}|</span>`;
  return abilitiesBlock.split(new RegExp(pattern, 'gi'))
    .map(x => x.trim())
    .filter(x => x.length > 0)
    .filter(x => removeHtml(x).trim().length > 0);
}

module.exports = splitAbilities;