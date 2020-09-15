const found = require('../found');
const { parenSplit, semicolonSplit } = require('../paren-split');
const removeHtml = require('../remove-html');
const { skip, br } = require('../navigation');

const spellReg = /(?:\([^\)]+\))?\s*([^\(]+)(?:\(([^\)]+)\))?/i;
const focusPointsReg = /(\d+) Focus Point/i;

function spellParser(value) {
  const spells_source = removeHtml(skip({ haystack: value, needle: '<b>' }).take('</b>'));  
  const [beforeLists] = semicolonSplit(skip({ haystack: value, needle: '</b>' }).limit(br).take()) || [''];
  const parts = parenSplit(beforeLists);
  const meta = parts.map(x => x.trim()).filter(x => x.length > 0 && x.toLowerCase().indexOf('focus point') === -1);

  const dcMatch = meta.find(x => x.startsWith('DC'));
  const dc = dcMatch ? skip({ haystack: dcMatch, needle: '' }).takeNumber() : null;

  const matchName = spells_source.toLowerCase().endsWith('spells') || spells_source.toLowerCase().endsWith('rituals');
  if (!matchName || !dcMatch) {
    return;
  }

  const attackBonusMatch = meta.find(x => x.startsWith('attack'));
  const attack_bonus = attackBonusMatch ? skip({ haystack: attackBonusMatch, needle: '' }).takeNumber() : null;

  const misc = meta.filter(x => !x.startsWith('attack') && !x.startsWith('DC')).join(', ') || null;

  const [,
    focusPointsMatch
  ] = focusPointsReg.exec(value) || [];
  const focus_points = focusPointsMatch ? parseInt(focusPointsMatch) : null;

  const spellListBlocks = skip({ haystack: value, needle: '</b>' }).skip(';').take();

  const spell_lists = takeSpellList('', spellListBlocks);
  const cantrips = takeSpellList('<b>Cantrips</b>', spellListBlocks);
  const constants = takeSpellList('<b>Constant</b>', spellListBlocks);

  const spell = { spells_source, dc, attack_bonus, focus_points, misc, spell_lists, cantrips, constants };
  found('spell', spell);

  return spell;
}

function takeSpellList(indicator, value) {
  const spellListsBlock = skip({ haystack: value, needle: indicator })
    .limit('<b>Cantrips</b>')
    .limit('<b>Constant</b>')
    .take()
    .trim();
  
  if (!spellListsBlock) {
    return null;
  }

  const spellLevelBlocks = semicolonSplit(spellListsBlock)
    .map(x => x.trim())
    .filter(x => x.length > 0);
  
  return spellLevelBlocks.map(spellLevelBlock => {
    const level = skip({ haystack: spellLevelBlock, needle: '<b>' }).takeNumber();
    const spellBlocks = skip({ haystack: spellLevelBlock, needle: '</b>' }).take();
    const spells = parenSplit(spellBlocks).map(parseSpell);
    return { level, spells };
  });
}

function parseSpell(value) {
  value = removeHtml(value);
  const [,
    nameMatch,
    miscMatch,
  ] = spellReg.exec(value) || [];

  const name = nameMatch ? nameMatch.trim() : null;
  const misc = miscMatch ? miscMatch.split(',').filter(x => x.toLowerCase().indexOf('focus point') === -1).join(',').trim() || null : null;

  return { name, misc };
}

module.exports = spellParser;

