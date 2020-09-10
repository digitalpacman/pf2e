const { has, skip } = require('./navigation');
const removeHtml = require('./remove-html');
const parenSplit = require('./paren-split');
const { br } = require('./constants');

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
  
  console.log(`found skills: ${JSON.stringify(skills)}`);
  return { skills };
}

module.exports = skillsParser;