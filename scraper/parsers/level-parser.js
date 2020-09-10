const { has, skip } = require('./navigation');

function levelParser(haystack) {
  if (!has({ haystack, needle: '>Creature '})) {
    return;
  }

  const level = skip({ haystack, needle: '>Creature ' })
    .take('<');
  
  console.log(`found level: ${level}`);
  return { level };
}

module.exports = levelParser;