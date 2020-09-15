const found = require('./found');
const removeHtml = require('./remove-html');
const { has, skip, br } = require('./navigation');

function hitpointsParser(haystack) {
  if (!has({ haystack, needle: '<b>HP</b>'})) {
    return;
  }

  const marker = skip({ haystack, needle: '<b>HP</b>' });
  const hp = marker.takeNumber();
  const hp_misc = removeParens(removeHtml(marker.limit(';').limit(br).skip(' ').skip(' ').take())) || null;

  found('hitpoints', hp);
  found('hitpoints misc', hp_misc);
  return { hp, hp_misc };
}

function removeParens(value) {
  value = value.trim();

  if (value[0] === '(' && value[value.length - 1] === ')') {
    value = value.substr(1);
    value = value.substr(0, value.length - 1);
  }

  return value;
}

module.exports = hitpointsParser;