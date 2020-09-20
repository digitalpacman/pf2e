const found = require('./found');
const { parenSplit } = require('./paren-split');
const typeAmountParser = require('./type-amount-parser');
const { has, skip, br } = require('./navigation');

function weaknessesParser(haystack) {
  if (!has({ haystack, needle: '<b>Weaknesses</b>'})) {
    return;
  }

  const weaknesses = parenSplit(skip({ haystack, needle: '<b>Weaknesses</b>' }).limit(';').limit(br).take())
    .map(typeAmountParser);

  found('weaknesses', weaknesses);
  return { weaknesses };
}

module.exports = weaknessesParser;