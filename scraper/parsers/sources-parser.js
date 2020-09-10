const { has, skip } = require('./navigation');
const removeHtml = require('./remove-html');

function sourcesParser(haystack) {
  if (!has({ haystack, needle: '<b>Source</b>'})) {
    return;
  }

  const sourcesHtml = skip({ haystack, needle: '<b>Source</b>' })
    .take('<br />');
  const sources = [removeHtml(sourcesHtml)]
    .map(x => {
      const parts = x.split(' pg. ');
      const abbr = parts[0].trim();
      const page_start = parts.length > 1 ? parts[parts.length - 1].trim() : null;
      const page_stop = null;
      return { abbr, page_start, page_stop };
    });
  
  console.log(`found sources: ${JSON.stringify(sources)}`);
  return { sources };
}

module.exports = sourcesParser;