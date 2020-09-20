const found = require('./found');
const removeHtml = require('./remove-html');
const { parenSplit } = require('./paren-split');
const { has, skip } = require('./navigation');

function languagesParser(haystack) {
  if (!has({ haystack, needle: '<b>Languages</b>'})) {
    return;
  }

  const languagesHtml = skip({ haystack, needle: '<b>Languages</b>' })
    .take('<br />');
  const languages = parenSplit(removeHtml(languagesHtml));
  
  found('languages', languages);
  return { languages };
}

module.exports = languagesParser;