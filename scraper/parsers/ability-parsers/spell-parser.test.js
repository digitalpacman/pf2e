const spellParser = require('./spell-parser');

it('parse divine innate spells from gelugon', () => {
  const input = `<b>Divine Innate Spells</b> DC 33; <b>7th</b> <i><u><a href="Spells.aspx?ID=47">cone of cold</a></u></i> (x2); <b>6th</b> <i><u><a href="Spells.aspx?ID=161">illusory scene</a></u></i>; <b>5th</b> <i><u><a href="Spells.aspx?ID=69">dimension door</a></u></i>, <i><u><a href="Spells.aspx?ID=364">wall of ice</a></u></i> (x3); <b>4th</b> <i><u><a href="Spells.aspx?ID=69">dimension door</a></u></i> (at will); <b>Cantrips</b> <b>(7th)</b> <i><u><a href="Spells.aspx?ID=245">ray of frost</a></u></i>; <b>Constant</b> <b>(4th)</b> <i><u><a href="Spells.aspx?ID=125">fly</a></u></i>`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Divine Innate Spells',
    dc: 33,
    attack_bonus: null,
    misc: null,
    focus_points: null,
    spell_lists: [
      { level: 7, spells: [{ name: 'cone of cold', misc: 'x2' }] },
      { level: 6, spells: [{ name: 'illusory scene', misc: null }] },
      { level: 5, spells: [{ name: 'dimension door', misc: null }, { name: 'wall of ice', misc: 'x3' }] },
      { level: 4, spells: [{ name: 'dimension door', misc: 'at will' }] },
    ],
    cantrips: [
      { level: 7, spells: [{ name: 'ray of frost', misc: null }] },
    ],
    constants: [
      { level: 4, spells: [{ name: 'fly', misc: null }] },
    ],
  });
});

it('parse rituals from gelugon', () => {
  const input = `<b>Rituals</b> DC 33; <b>1st</b> <i><u><a href="Rituals.aspx?ID=23">infernal pact</a></u></i>`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Rituals',
    dc: 33,
    attack_bonus: null,
    misc: null,
    focus_points: null,
    spell_lists: [
      { level: 1, spells: [{ name: 'infernal pact', misc: null }] },
    ],
    cantrips: null,
    constants: null,
  });
});

it('parse primal innate spells from crag linnorm', () => {
  const input = `<b>Primal Innate Spells</b> DC 33; <b>Constant</b> <b>(6th)</b> <i><u><a href="Spells.aspx?ID=128">freedom of movement</a></u></i>; <b>(5th)</b> <i><u><a href="Spells.aspx?ID=344">true seeing</a></u></i>`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Primal Innate Spells',
    dc: 33,
    attack_bonus: null,
    misc: null,
    focus_points: null,
    spell_lists: null,
    cantrips: null,
    constants: [
      { level: 6, spells: [{ name: 'freedom of movement', misc: null }] },
      { level: 5, spells: [{ name: 'true seeing', misc: null }] },
    ],
  });
});

it('parse divine innate spells from aasimar redeemer', () => {
  const input = `<b>Divine Innate Spells</b> DC 20; <b>Cantrips</b> <b>(3rd)</b> <i><u><a href="Spells.aspx?ID=171">light</a></u></i>`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Divine Innate Spells',
    dc: 20,
    attack_bonus: null,
    misc: null,
    focus_points: null,
    spell_lists: null,
    cantrips: [
      { level: 3, spells: [{ name: 'light', misc: null }] },
    ],
    constants: null,
  });
});

it('parse champion devotion spells from aasimar redeemer', () => {
  const input = `<b>Champion Devotion Spells</b> DC 20; <b>3rd</b> (1 Focus Point) <a style="text-decoration:underline" href="Spells.aspx?ID=395"><i>lay on hands</i></a>`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Champion Devotion Spells',
    dc: 20,
    attack_bonus: null,
    misc: null,
    focus_points: 1,
    spell_lists: [
      { level: 3, spells: [{ name: 'lay on hands', misc: null }] },
    ],
    cantrips: null,
    constants: null,
  });
});

it('parse arcane prepared spells from drider', () => {
  const input = `<b>Arcane Prepared Spells</b> DC 24, attack +17; <b>3rd</b> <i><u><a href="Spells.aspx?ID=119">fireball</a></u></i>; <b>2nd</b> <i><u><a href="Spells.aspx?ID=2">acid arrow</a></u></i>, <i><u><a href="Spells.aspx?ID=164">invisibility</a></u></i>; <b>1st</b> <i><u><a href="Spells.aspx?ID=180">magic missile</a></u></i> (x2), <i><u><a href="Spells.aspx?ID=244">ray of enfeeblement</a></u></i>; <b>Cantrips</b> <b>(3rd)</b> <i><u><a href="Spells.aspx?ID=132">ghost sound</a></u></i>, <i><u><a href="Spells.aspx?ID=177">mage hand</a></u></i>, <i><u><a href="Spells.aspx?ID=245">ray of frost</a></u></i>`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Arcane Prepared Spells',
    dc: 24,
    attack_bonus: 17,
    misc: null,
    focus_points: null,
    spell_lists: [
      { level: 3, spells: [{ name: 'fireball', misc: null }] },
      { level: 2, spells: [{ name: 'acid arrow', misc: null }, { name: 'invisibility', misc: null }] },
      { level: 1, spells: [{ name: 'magic missile', misc: 'x2' }, { name: 'ray of enfeeblement', misc: null }] },
    ],
    cantrips: [
      { level: 3, spells: [{ name: 'ghost sound', misc: null }, { name: 'mage hand', misc: null }, { name: 'ray of frost', misc: null }] },
    ],
    constants: null,
  });
});

it('parse occult innate spells from devourer', () => {
  const input = `<b>Occult Innate Spells</b> DC 31, see soul spells below; <b>6th</b> <i><u><a href="Spells.aspx?ID=112">feeblemind</a></u></i>, <i><u><a href="Spells.aspx?ID=344">true seeing</a></u></i>; <b>4th</b> <i><u><a href="Spells.aspx?ID=48">confusion</a></u></i>, <i><u><a href="Spells.aspx?ID=315">suggestion</a></u></i>; <b>3rd</b> <i><u><a href="Spells.aspx?ID=22">bind undead</a></u></i>, <i><u><a href="Spells.aspx?ID=213">paralyze</a></u></i>; <b>2nd</b> <i><u><a href="Spells.aspx?ID=63">death knell</a></u></i>; <b>1st</b> <i><u><a href="Spells.aspx?ID=146">harm</a></u></i>`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Occult Innate Spells',
    dc: 31,
    attack_bonus: null,
    misc: 'see soul spells below',
    focus_points: null,
    spell_lists: [
      { level: 6, spells: [{ name: 'feeblemind', misc: null }, { name: 'true seeing', misc: null }] },
      { level: 4, spells: [{ name: 'confusion', misc: null }, { name: 'suggestion', misc: null }] },
      { level: 3, spells: [{ name: 'bind undead', misc: null }, { name: 'paralyze', misc: null }] },
      { level: 2, spells: [{ name: 'death knell', misc: null }] },
      { level: 1, spells: [{ name: 'harm', misc: null }] },
    ],
    cantrips: null,
    constants: null,
  });
});

it('parse cleric focus spells from herecite of zevgavizeb', () => {
  const input = `<b>Cleric Focus Spells</b> 2 Focus Points, DC 28; <b>4th</b> <i><u><a href="Spells.aspx?ID=419">enduring might</a></u></i>, <i><u><a href="Spells.aspx?ID=435">nature's bounty</a></u></i>; <b>1st</b> <i><u><a href="Spells.aspx?ID=402">athletic rush</a></u></i>, <i><u><a href="Spells.aspx?ID=467">vibrant thorns</a></u></i>`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Cleric Focus Spells',
    dc: 28,
    attack_bonus: null,
    misc: null,
    focus_points: 2,
    spell_lists: [
      { level: 4, spells: [{ name: 'enduring might', misc: null }, { name: `nature's bounty`, misc: null }] },
      { level: 1, spells: [{ name: 'athletic rush', misc: null }, { name: 'vibrant thorns', misc: null }] },
    ],
    cantrips: null,
    constants: null,
  });
});

it('parse druid order spells from changeling exile', () => {
  const input = `<b>Druid Order Spells</b> DC 21; <b>2nd</b> <i><u><a href="Spells.aspx?ID=480">wild morph</a></u></i>, <i><u><a href="Spells.aspx?ID=481">wild shape</a></u></i> (1 Focus Point)`;

  const fields = spellParser(input);

  expect(fields).toEqual({
    spells_source: 'Druid Order Spells',
    dc: 21,
    attack_bonus: null,
    misc: null,
    focus_points: 1,
    spell_lists: [
      { level: 2, spells: [{ name: 'wild morph', misc: null }, { name: `wild shape`, misc: null }] },
    ],
    cantrips: null,
    constants: null,
  });
});

it('parse skip soul spells ability from devourer', () => {
  const input = `<b>Soul Spells</b> A devourer casts occult innate spells, but to do so it must expend a number of soul charges equal to the spell's level (similar to casting a spell using charges from a staff). It can heighten any spell to a maximum of 6th level by expending more charges as it Casts the Spell. When encountered, a devourer typically has one trapped soul with 10 soul charges.`;

  const fields = spellParser(input);

  expect(fields).toEqual(undefined);
});