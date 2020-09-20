const parsers = require('./');

function monsterParser(html) {
  const monsterBlock = html.substr(html.indexOf('ctl00_MainContent_DetailedOutput'));
  const sections = monsterBlock.split(/<hr \/>|<hr>|<h1|<h2|<h3|<\/h1>|<\/h2>|<\/h3>|<\/div>/gi);

  let monster = {};
  for (let parser of parsers) {
    for (let section of sections) {
      const fields = parser(section);
      if (fields) {
        monster = { ...monster, ...fields };
        break;
      }
    }
  }

  return monster;
}

module.exports = monsterParser;