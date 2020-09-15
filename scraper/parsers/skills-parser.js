const found = require('./found');
const removeHtml = require('./remove-html');
const { parenSplit } = require('./paren-split');
const { has, skip, br } = require('./navigation');

function skillsParser(haystack) {
  if (!has({ haystack, needle: '<b>Skills</b>'})) {
    return;
  }

  const skillsHtml = skip({ haystack, needle: '<b>Skills</b>' }).take(br);
  const skills = parenSplit(removeHtml(skillsHtml))
    .map(x => {
      const [descPart, miscPart] = x.split(/\(|\)/g);
      const misc = miscPart ? miscPart.trim() : null;
      const [name, bonusString] = descPart.split('+').map(x => x.trim());
      const bonus = parseInt(bonusString);
      return { name, bonus, misc };
    });
  
  found('skills', skills);
  return { skills };
}

module.exports = skillsParser;