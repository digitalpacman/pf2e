const { allMonsters, addMonster } = require('./custom-monsters');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

it('add monsters', async () => {
  const monstersBefore = await allMonsters();

  await addMonster(uuidv4(), {
    name: 'Test Monsters',
  });

  await addMonster({
    name: 'Test Monsters',
  });

  const monstersAfter = await allMonsters();

  expect(monstersBefore.length + 2).toEqual(monstersAfter.length);
});

afterAll(() => {
  db.end();
});
