const { has, skip } = require('./navigation');
const parenSplit = require('./paren-split');
const typeAmountParser = require('./type-amount-parser');
const { br } = require('./constants');

function weaknessesParser(haystack) {
  if (!has({ haystack, needle: '<b>Weaknesses</b>'})) {
    return;
  }

  const weaknesses = parenSplit(skip({ haystack, needle: '<b>Weaknesses</b>' }).limit(';').limit(br).take())
    .map(typeAmountParser);

  console.log(`found weaknesses: ${JSON.stringify(weaknesses)}`);
  return { weaknesses };
}

module.exports = weaknessesParser;