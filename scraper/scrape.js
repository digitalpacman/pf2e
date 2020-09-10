const commandLineArgs = require('command-line-args');
const fs = require('fs');
const parsers = require('./parsers');
const fetch = require('node-fetch');

const optionDefinitions = [
  { name: 'monster', alias: 'm', type: String },
];

const options = commandLineArgs(optionDefinitions);

const dir = __dirname + '/downloads/aon';
const monsterListUrl = 'https://2e.aonprd.com/Monsters.aspx?Letter=All';
const baseUrl = 'https://2e.aonprd.com/';

(async () => {
  const allMonsters = await get(monsterListUrl);

  const reg = /<td><a href="([^"]+)"><u>([^>]+)<\/u>/g;

  let match;
  while (match = reg.exec(allMonsters)) {
    const [, uri, name] = match;
    if (options.monster && name.toLowerCase() !== options.monster) {
      continue;
    }
    console.log(uri, name);

    const monsterHtml = await get(baseUrl + uri);
    fs.writeFileSync(dir + '/' + name.toLowerCase() + '.html', monsterHtml);
  }
})();

async function get(url) {
  const response = await fetch(url);
  const body = await response.text();
  return body;
}