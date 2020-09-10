const { has, skip } = require('./navigation');

function perceptionParser(haystack) {
  if (!has({ haystack, needle: '<b>Perception</b>'})) {
    return;
  }

  const perception = skip({ haystack, needle: '<b>Perception</b>' })
    .skip('+')
    .takeNumber();
  
  console.log(`found alignment: ${perception}`);
  return { perception };
}

module.exports = perceptionParser;