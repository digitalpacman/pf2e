const { allMonsters, addMonster } = require('./custom-monsters');
const db = require('./db');

it('add monsters', async () => {
  const monstersBefore = await allMonsters();

  await addMonster({
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
