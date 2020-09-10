const { has, skip } = require('./navigation');

function nameParser(haystack) {
  if (!has({ haystack, needle: '>Creature' })) {
    return;
  }

  const name = skip({ haystack, needle: 'Monsters.aspx'})
    .skip('>')
    .take('<');
  console.log(`found name: ${name}`);
  return { name };
}

module.exports = nameParser;