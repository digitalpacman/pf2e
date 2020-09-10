const commandLineArgs = require('command-line-args');
const fs = require('fs');
const parsers = require('./parsers');

const optionDefinitions = [
  { name: 'monster', alias: 'm', type: String },
];

const options = commandLineArgs(optionDefinitions);

const dir = __dirname + '/downloads/aon';
const allFiles = fs.readdirSync(dir);
const files = options.monster ? allFiles.filter(x => x.indexOf(options.monster) !== -1) : allFiles;
for (let file of files) {
  const html = fs.readFileSync(`${dir}/${file}`).toString();
  console.log('starting ' + file)
  const monsterBlock = html.substr(html.indexOf('ctl00_MainContent_DetailedOutput'));
  const sections = monsterBlock.split(/<hr \/>|<h1|<h3|<\/h1>|<\/h3>/gi);
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

  console.log(monster);
}