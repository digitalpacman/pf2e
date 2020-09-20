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

    const html = await get(baseUrl + uri);
    const normalized = normalize(html);
    fs.writeFileSync(dir + '/' + name.toLowerCase() + '.html', normalized);
  }
})();

function normalize(html) {
  html = html.replace(/’/g, '\'');
  if (html.indexOf('Giant Aukashungi') !== -1) {
    html = html.replace('<%END', '</a>');
  }
  if (html.indexOf('Interlocutor') !== -1) {
    html = html.replace('Painsight (', '<b>Painsight</b> (');
  }
  if (html.indexOf('Nyogoth') !== -1) {
    html = html.replace(
      '<b>Resistances</b> mental 10; <b>Weaknesses</b> lawful 10<br />physical 10 (except cold iron)', 
      '<b>Resistances</b> mental 10, physical 10 (except cold iron); <b>Weaknesses</b> lawful 10<br />');
  }
  if (html.indexOf('Spiral Centurion') !== -1) {
    html = html.replace(
      '<br />Top-Heavy A spiral centurion',
      '<b>Top-Heavy</b> A spiral centurion');
  }
  if (html.indexOf('Stygira') !== -1) {
    html = html.replace(
      '<br />Light Sickness A stygira in an area',
      '<b>Light Sickness</b> A stygira in an area');
  }
  if (html.indexOf('Veranallia') !== -1) {
    html = html.replace(
      'DC 42 (also has Reincarnate; spell not out yet at time of printing)',
      'DC 42, also has Reincarnate (spell not out yet at time of printing)');
  }
  if (html.indexOf('Verdurous Ooze') !== -1) {
    html = html.replace(
      '<br />Motion Sense A verdurous ooze can',
      '<b>Motion Sense</b> A verdurous ooze can');
  }
  
  return html;
}

async function get(url) {
  const response = await fetch(url);
  const body = await response.text();
  return body;
}