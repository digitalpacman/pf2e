const found = require('./found');
const { parenSplit } = require('./paren-split');
const typeAmountParser = require('./type-amount-parser');
const { has, skip, br } = require('./navigation');

function resistancesParser(haystack) {
  if (!has({ haystack, needle: '<b>Resistances</b>'})) {
    return;
  }

  const resistances = parenSplit(skip({ haystack, needle: '<b>Resistances</b>' }).limit(';').limit(br).take())
    .map(typeAmountParser);

  found('resistances', resistances);
  return { resistances };
}

module.exports = resistancesParser;