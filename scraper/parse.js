const commandLineArgs = require('command-line-args');
const fs = require('fs');
const monsterParser = require('./parsers/monster-parser');
const yaml = require('js-yaml');

const optionDefinitions = [
  { name: 'monster', alias: 'm', type: String },
  { name: 'write', alias: 'w', type: Boolean },
];

const options = commandLineArgs(optionDefinitions);

const dir = __dirname + '/downloads/aon';
const outDir = `C:\\Users\\brad\\Desktop\\repos\\pathfinder-2-sqlite\\data\\monsters\\`;
const allFiles = fs.readdirSync(dir);
const files = options.monster ? allFiles.filter(x => x.indexOf(options.monster) !== -1) : allFiles;
for (let file of files) {
  const html = fs.readFileSync(`${dir}/${file}`).toString();
  console.log('starting ' + file);
  const monster = monsterParser(html);

  if (options.write) {
    const outFile = outDir + monster.name.toLowerCase() + '.yaml';
    const monsterYaml = yaml.safeDump(monster, { sortKeys: true, noArrayIndent: true });
    fs.writeFileSync(outFile, monsterYaml);
    console.log('write ' + outFile);
  }
  //console.log(monster);
}