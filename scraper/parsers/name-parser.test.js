const nameParser = require('./name-parser');

it('parse name from adamantine golem', () => {
  const input = ` class="title"><a href="Monsters.aspx?ID=243">Adamantine Golem</a><span style="float:right;">Creature 18</span>`;
  const fields = nameParser(input);

  expect('Adamantine Golem').toEqual(fields.name);
});