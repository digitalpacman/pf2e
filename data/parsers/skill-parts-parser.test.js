const { skillPartsParser } = require('./skill-parts-parser');

it('parse normal skill', () => {
  const input = `Athletics +5`;
  const skill = skillPartsParser(input);

  expect(skill).toEqual({
    name: 'Athletics',
    bonus: 5,
    misc: null,
  });
});

it('parse bonus then misc', () => {
  const input = `Athletics +5 (+7 with shove)`;
  const skill = skillPartsParser(input);

  expect(skill).toEqual({
    name: 'Athletics',
    bonus: 5,
    misc: '+7 with shove',
  });
});

it('parse misc then bonus', () => {
  const input = `Lore (all) +5`;
  const skill = skillPartsParser(input);

  expect(skill).toEqual({
    name: 'Lore',
    bonus: 5,
    misc: 'all',
  });
});