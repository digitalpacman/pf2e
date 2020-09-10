const { has, skip } = require('./navigation');
const removeHtml = require('./remove-html');

function traitsParser(haystack) {
  if (!has({ haystack, needle: 'class="trait"'})) {
    return;
  }

  const traitsHtml = skip({ haystack, needle: 'class="trait"' })
    .skip('>')
    .take('<br />');
  const traits = traitsHtml.split(/<\/span>/gi)
    .map(x => removeHtml(x).trim())
    .filter(x => x.length > 0);

  console.log(`found traits: ${traits}`);
  return { traits };
}

module.exports = traitsParser;