const { has, skip } = require('./navigation');
const parenSplit = require('./paren-split');
const typeAmountParser = require('./type-amount-parser');
const { br } = require('./constants');

function resistancesParser(haystack) {
  if (!has({ haystack, needle: '<b>Resistances</b>'})) {
    return;
  }

  const resistances = parenSplit(skip({ haystack, needle: '<b>Resistances</b>' }).limit(';').limit(br).take())
    .map(typeAmountParser);

  console.log(`found resistances: ${JSON.stringify(resistances)}`);
  return { resistances };
}

module.exports = resistancesParser;