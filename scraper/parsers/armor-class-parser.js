const { has, skip } = require('./navigation');
const removeHtml = require('./remove-html');
const parenSplit = require('./paren-split');
function armorClassParser(haystack) {
  if (!has({ haystack, needle: '<b>AC</b>'})) {
    return;
  }

  const ac = skip({ haystack, needle: '<b>AC</b>' }).takeNumber();
  const [_, miscs] = removeHtml(skip({ haystack, needle: '<b>AC</b>' }).take(';'))
    .split(/\(|\)/g);
  const ac_special = parenSplit(miscs).map(descr => ({ descr }));
  
  console.log(`found armor class: ${JSON.stringify(ac)} ${JSON.stringify(ac_special)}`);
  return { ac, ac_special };
}

module.exports = armorClassParser;