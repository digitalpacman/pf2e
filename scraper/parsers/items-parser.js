const { has, skip } = require('./navigation');
const removeHtml = require('./remove-html');
const parenSplit = require('./paren-split');

function itemsParser(haystack) {
  if (!has({ haystack, needle: '<b>Items</b>'})) {
    return;
  }

  const items = parenSplit(removeHtml(skip({ haystack, needle: '<b>Items</b>' }).take()));
  
  console.log(`found items: ${JSON.stringify(items)}`);
  return { items };
}

module.exports = itemsParser;