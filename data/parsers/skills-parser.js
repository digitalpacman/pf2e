const found = require('./found');
const removeHtml = require('./remove-html');
const { parenSplit } = require('./paren-split');
const { has, skip, br } = require('./navigation');
const { skillPartsParser } = require('./skill-parts-parser');

function skillsParser(haystack) {
  if (!has({ haystack, needle: '<b>Skills</b>'})) {
    return;
  }

  const skillsHtml = skip({ haystack, needle: '<b>Skills</b>' }).take(br);
  const skills = parenSplit(removeHtml(skillsHtml))
    .map(skillPartsParser);
  
  found('skills', skills);
  return { skills };
}

module.exports = skillsParser;