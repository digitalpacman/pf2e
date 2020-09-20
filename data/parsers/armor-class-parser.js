const removeHtml = require('./remove-html');
const { parenSplit } = require('./paren-split');
const trimit = require('./trimit');
const found = require('./found');
const { has, skip } = require('./navigation');

function armorClassParser(haystack) {
  if (!has({ haystack, needle: '<b>AC</b>'})) {
    return;
  }

  const ac = skip({ haystack, needle: '<b>AC</b>' }).takeNumber();
  const miscs = removeHtml(trimit(trimit(skip({ haystack, needle: '<b>AC</b>' })
    .limit('<b>Fort')
    .skip('(')
    .take(), ';'), ')'));

  const ac_special = miscs ? parenSplit(miscs).map(descr => ({ descr })) : null;
  
  found('armor class', ac);
  found('armor special', ac_special);
  
  return { ac, ac_special };
}

module.exports = armorClassParser;