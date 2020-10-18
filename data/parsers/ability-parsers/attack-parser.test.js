const attackParser = require('./attack-parser');

const template = {
  action_cost: null,
  name: null,
  to_hit: null,
  traits: null,
  damage: null,
};

it('parse melee attack frost longspear from gelugon', () => {
  const input = `<b>Melee</b> <img class="actiondark" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction.png"><img class="actionlight" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction_I.png"> <i>frost longspear</i> +28 [<a style="text-decoration:underline" href="Rules.aspx?ID=322"><u>+23/+18</u></a>] (<a href="Traits.aspx?ID=27"><u>cold</a></u>, <a href="Traits.aspx?ID=64"><u>evil</a></u>, <a href="Traits.aspx?ID=103"><u>magical</a></u>, <a href="Traits.aspx?ID=192"><u>reach 15 feet</a></u>), <b>Damage</b> 2d8+12 piercing plus 1d6 cold, 1d6 evil, and slowing frost`;

  const fields = attackParser('Melee', input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'One Action',
    name: 'frost longspear',
    to_hit: 28,
    traits: ['cold','evil','magical','reach 15 feet'],
    damage: [
      { formula: '2d8+12', type: 'piercing', },
      { formula: '1d6', type: 'cold' },
      { formula: '1d6', type: 'evil' },
      { formula: null, type: 'slowing frost' },
    ],
  });
});

it('parse melee attack tail from gelugon', () => {
  const input = `<b>Melee</b> <img class="actiondark" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction.png"><img class="actionlight" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction_I.png"> tail +25 [<a style="text-decoration:underline" href="Rules.aspx?ID=322"><u>+21/+17</u></a>] (<a href="Traits.aspx?ID=170"><u>agile</a></u>, <a href="Traits.aspx?ID=27"><u>cold</a></u>, <a href="Traits.aspx?ID=64"><u>evil</a></u>, <a href="Traits.aspx?ID=103"><u>magical</a></u>, <a href="Traits.aspx?ID=192"><u>reach 10 feet</a></u>), <b>Damage</b> 2d6+12 bludgeoning plus 2d6 cold, 1d6 evil, and slowing frost`;

  const fields = attackParser('Melee', input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'One Action',
    name: 'tail',
    to_hit: 25,
    traits: ['agile','cold','evil','magical','reach 10 feet'],
    damage: [
      { formula: '2d6+12', type: 'bludgeoning' },
      { formula: '2d6', type: 'cold' },
      { formula: '1d6', type: 'evil' },
      { formula: null, type: 'slowing frost' },
    ],
  });
});

it('parse ranged attack frost longspear from gelugon', () => {
  const input = `<b>Ranged</b> <img class="actiondark" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction.png"><img class="actionlight" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction_I.png"> <i>frost longspear</i> +27 [<a style="text-decoration:underline" href="Rules.aspx?ID=322"><u>+22/+17</u></a>] (<a href="Traits.aspx?ID=27"><u>cold</a></u>, <a href="Traits.aspx?ID=103"><u>magical</a></u>, <a href="Traits.aspx?ID=195"><u>thrown 20 feet</a></u>), <b>Damage</b> 2d8+12 piercing plus 1d6 cold`;

  const fields = attackParser('Ranged', input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'One Action',
    name: 'frost longspear',
    to_hit: 27,
    traits: ['cold','magical','thrown 20 feet'],
    damage: [
      { formula: '2d8+12', type: 'piercing' },
      { formula: '1d6', type: 'cold' },
    ],
  });
});

it('parse ranged attack sphere of oblivion from pleroma', () => {
  const input = `<b>Ranged</b> <img class="actiondark" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction.png"><img class="actionlight" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction_I.png"> Sphere of Oblivion +37 [<a style="text-decoration:underline" href="Rules.aspx?ID=322"><u>+32/+27</u></a>] (<a href="Traits.aspx?ID=103"><u>magical</a></u>), <b>Effect</b> see Sphere of Oblivion`;

  const fields = attackParser('Ranged', input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'One Action',
    name: 'Sphere of Oblivion',
    to_hit: 37,
    traits: ['magical'],
    damage: [{
      formula: null,
      type: 'see Sphere of Oblivion',
    }],
  });
});

it('parse melee fangs from aapoph serpentfolk', () => {
  const input = `<b>Melee</b> <img class="actiondark" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction.png"><img class="actionlight" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction_I.png"> fangs +11 [<a style="text-decoration:underline" href="Rules.aspx?ID=322"><u>+6/+1</u></a>], <b>Damage</b> 1d8+6 piercing plus serpentfolk venom`;

  const fields = attackParser('Melee', input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'One Action',
    name: 'fangs',
    to_hit: 11,
    traits: null,
    damage: [
      { formula: '1d8+6', type: 'piercing' },
      { formula: null, type: 'serpentfolk venom' },
    ],
  });
});