const found = require('./found');
const { has, skip } = require('./navigation');

function perceptionParser(haystack) {
  if (!has({ haystack, needle: '<b>Perception</b>'})) {
    return;
  }

  const perception = skip({ haystack, needle: '<b>Perception</b>' })
    .skip('+')
    .takeNumber();
  
  found('alignment', perception);
  return { perception };
}

module.exports = perceptionParser;