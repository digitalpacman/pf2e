const found = require('./found');
const { has, skip } = require('./navigation');

function levelParser(haystack) {
  if (!has({ haystack, needle: '>Creature '})) {
    return;
  }

  const level = skip({ haystack, needle: '>Creature ' }).takeNumber();
  
  found('level', level);
  return { level };
}

module.exports = levelParser;