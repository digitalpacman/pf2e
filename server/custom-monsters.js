const db = require('./db');
const { normalizePath } = require('../src/normalize-path');

console.log(normalizePath)

const allMonsters = async () => {
  try {
    const query = await db.query('select path, name, json from custom_monsters');
    const monsters = query.rows.map(x => JSON.parse(x.json.toString())) || [];
    return monsters;
  } catch (err) {
    console.log(`failed retrieving custom monsters ${err}`);
    return [];
  }
};

const nextPath = async (path) => {
  let version;
  while (true) {
    const versionedPath = version ? `${path}-${version}` : path;
    const available = await monsterPathAvailable(versionedPath);
    if (available) {
      return versionedPath;
    }
    version = generateVersion();
  }
};

const monsterPathAvailable = async (path) => {
  const query = await db.query(
    `select path from custom_monsters where path = $1`, [path]);
  return query.rows.length === 0;
};

const generateVersion = () => {
  let version = '';
  for (let i = 0; i < 2; ++i) {
    version += String.fromCharCode(getRandomInt(97, 123));
  }
  return version;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const addMonster = async (token, monster) => {
  try {
    const name = monster.name;
    const path = await nextPath(normalizePath(name));
    monster.path = path;
    monster.thirdParty = true;
    const json = JSON.stringify(monster);

    await db.query(`insert into custom_monsters (path, name, ownership_token, json)
      values ($1, $2, $3, $4)`,
      [path, name, token, json]);
  }
  catch (err) {
    console.log(`failed adding custom monster ${err} ${err.stack}`);
    throw err;
  }
};

module.exports = { allMonsters, addMonster };
