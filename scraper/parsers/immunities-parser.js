const found = require('./found');
const { parenSplit } = require('./paren-split');
const { has, skip, br } = require('./navigation');

function immunitiesParser(haystack) {
  if (!has({ haystack, needle: '<b>Immunities</b>'})) {
    return;
  }

  const immunities = parenSplit(skip({ haystack, needle: '<b>Immunities</b>' }).limit(';').limit(br).take());

  found('immunities', immunities);
  return { immunities };
}

module.exports = immunitiesParser;