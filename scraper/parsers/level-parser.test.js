const levelParser = require('./level-parser');

it('parse level from adamantine golem', () => {
  const input = ` class="title"><a href="Monsters.aspx?ID=243">Adamantine Golem</a><span style="float:right;">Creature 18</span>`;
  const fields = levelParser(input);

  expect(fields.level).toEqual('18');
});