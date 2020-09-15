const found = require('./found');
const { has, skip } = require('./navigation');

function alignmentParser(haystack) {
  if (!has({ haystack, needle: 'class="traitalignment"'})) {
    return;
  }

  const alignment = skip({ haystack, needle: 'class="traitalignment"' })
    .skip('>')
    .take('<');
  
  found('alignment', alignment);
  return { alignment };
}

module.exports = alignmentParser;
