const { has, skip } = require('./navigation');
const removeHtml = require('./remove-html');
const { br } = require('./constants');

function hitpointsParser(haystack) {
  if (!has({ haystack, needle: '<b>HP</b>'})) {
    return;
  }

  const marker = skip({ haystack, needle: '<b>HP</b>' });
  const hp = marker.takeNumber();
  const hp_misc = removeHtml(marker.limit(';').limit(br).skip(' ').skip(' ').take()) || null;

  console.log(`found hitpoints: ${JSON.stringify(hp)} ${JSON.stringify(hp_misc)}`);
  return { hp, hp_misc };
}

module.exports = hitpointsParser;