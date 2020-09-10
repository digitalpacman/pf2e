const { has } = require('./navigation');
const { toMarkdown } = require('./to-markdown');

function descriptionParser(haystack) {
  if (has({ haystack, needle: 'ctl00_MainContent_DetailedOutput' }) ||
  has({ haystack, needle: 'class="title"' })) {
    return;
  }

  const description = toMarkdown(haystack);
  console.log(`found description: ${description}`);
  return { description };
}

module.exports = descriptionParser;