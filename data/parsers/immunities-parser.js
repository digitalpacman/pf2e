const found = require('./found');
const { parenSplit } = require('./paren-split');
const { has, skip, br } = require('./navigation');
const { toMarkdown } = require('./to-markdown');

function immunitiesParser(haystack) {
  if (!has({ haystack, needle: '<b>Immunities</b>'})) {
    return;
  }

  const immunityText = skip({ haystack, needle: '<b>Immunities</b>' })
    .limit(';')
    .limit(br)
    .take();

  const immunities = parenSplit(immunityText).map(toMarkdown);

  found('immunities', immunities);
  return { immunities };
}

module.exports = immunitiesParser;