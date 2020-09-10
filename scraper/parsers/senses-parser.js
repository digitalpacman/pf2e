const { has, skip } = require('./navigation');
const parenSplit = require('./paren-split');
const removeHtml = require('./remove-html');

function sensesParser(haystack) {
  if (!has({ haystack, needle: '<b>Perception</b>'})) {
    return;
  }

  const sensesLine = skip({ haystack, needle: '<b>Perception</b>' })
    .take('<br />');
  
  const parts = sensesLine.split(';');
  if (parts.length === 1) {
    return null;
  }

  const senses = parenSplit(removeHtml(parts[1]))
    .map(x => x.trim())
    .filter(x => x.length > 0);

  console.log(`found senses: ${senses}`);
  return { senses };
}

module.exports = sensesParser;