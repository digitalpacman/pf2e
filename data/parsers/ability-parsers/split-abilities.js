const { br, hangingIndent } = require('../navigation');
const removeHtml = require('../remove-html');
const subSections = require('./ability-sub-sections');

const pattern = `(?=${br}\\s*<b>(?!${subSections.join('|')}))${br}|${hangingIndent}|</span>`

function splitAbilities(abilitiesBlock) {
  return abilitiesBlock.split(new RegExp(pattern, 'gi'))
    .map(x => x.trim())
    .filter(x => x.length > 0)
    .filter(x => removeHtml(x).trim().length > 0);
}

module.exports = splitAbilities;