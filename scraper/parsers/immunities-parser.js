const { has, skip } = require('./navigation');
const parenSplit = require('./paren-split');
const { br } = require('./constants');

function immunitiesParser(haystack) {
  if (!has({ haystack, needle: '<b>Immunities</b>'})) {
    return;
  }

  const immunities = parenSplit(skip({ haystack, needle: '<b>Immunities</b>' }).limit(';').limit(br).take());

  console.log(`found immunities: ${JSON.stringify(immunities)}`);
  return { immunities };
}

module.exports = immunitiesParser;