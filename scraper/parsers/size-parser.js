const { has, skip } = require('./navigation');

function sizeParser(haystack) {
  if (!has({ haystack, needle: 'class="traitsize"'})) {
    return;
  }

  const size = skip({ haystack, needle: 'class="traitsize"' })
    .skip('>')
    .take('<');
  
  console.log(`found size: ${size}`);
  return { size };
}

module.exports = sizeParser;