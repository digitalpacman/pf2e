const found = require('./found');
const removeHtml = require('./remove-html');
const { parenSplit } = require('./paren-split');
const { has, skip } = require('./navigation');

function itemsParser(haystack) {
  if (!has({ haystack, needle: '<b>Items</b>'})) {
    return;
  }

  const items = parenSplit(removeHtml(skip({ haystack, needle: '<b>Items</b>' }).take()));
  
  found('items', items);
  return { items };
}

module.exports = itemsParser;