const { has, skip } = require('./navigation');
const removeHtml = require('./remove-html');
const parenSplit = require('./paren-split');

function languagesParser(haystack) {
  if (!has({ haystack, needle: '<b>Languages</b>'})) {
    return;
  }

  const languagesHtml = skip({ haystack, needle: '<b>Languages</b>' })
    .take('<br />');
  const languages = parenSplit(removeHtml(languagesHtml));
  
  console.log(`found languages: ${languages}`);
  return { languages };
}

module.exports = languagesParser;