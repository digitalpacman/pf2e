const { br, hangingIndent } = require('../navigation');
const removeHtml = require('../remove-html');

function splitAbilities(abilitiesBlock) {
  return abilitiesBlock.split(new RegExp(`(?=${br}\s*<b>)${br}|${hangingIndent}|</span>`, 'gi'))
    .map(x => x.trim())
    .filter(x => x.length > 0)
    .filter(x => removeHtml(x).trim().length > 0);
}

module.exports = splitAbilities;