const miscBefore = /[^(]+\(.+\)\s+\+\d+/;
const miscAfter = /[^(]+\s+\+\d+\s+\(.+\)/;
const withoutMisc = /[^(]+\s+\+\d+/;

function skillPartsParser(skill) {
  if (miscAfter.test(skill)) {
    const parts = skill.split('+', 2);
    return {
      name: parts[0].trim(),
      bonus: parseInt(parts[1]),
      misc: skill.split(/\(|\)/g)[1].trim(),
    }
  }

  if (miscBefore.test(skill)) {
    const parts = skill.split(/\(|\)/g);
    return {
      name: parts[0].trim(),
      bonus: parseInt(parts[2]),
      misc: parts[1].trim(),
    }
  }

  if (withoutMisc.test(skill)) {
    const parts = skill.split('+');
    return {
      name: parts[0].trim(),
      bonus: parseInt(parts[1]),
      misc: null,
    };
  }

  return {
    name: null,
    bonus: null,
    misc: null,
  };
}

module.exports = { skillPartsParser };