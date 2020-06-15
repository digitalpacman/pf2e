import { split, components, lowestIndexOf, fromPF2Tools, fromDamage, fromTypeWithValue, fromSkills, fromSpeed, fromSpells } from './tool-conversion';

it('custom split', () => {
  expect(split('hello, world')).toEqual(['hello', 'world']);
  expect(split('hello (wonderful,wonderful), world'))
    .toEqual(['hello (wonderful,wonderful)', 'world']);
});

it('read ability description', () => {
  expect(components('**First** #1 **Second** #2'))
    .toEqual([
      { name: 'First', desc: '#1' },
      { name: 'Second', desc: '#2' },
    ]);

  expect(components('Basic desc **First** #1 **Second** #2'))
    .toEqual([
      { name: 'First', desc: '#1' },
      { name: 'Second', desc: '#2' },
    ]);
});

it('lowest index', () => {
  expect(lowestIndexOf('find the needle in the stack', ['needle']))
    .toEqual(9);

  expect(lowestIndexOf('find the needle in the stack', ['needle', 'the']))
    .toEqual(5);
});

it('fromPF2Tools defense abilities', () => {
  const monster = fromPF2Tools({
    "specials": [
      {
        "id": "_chv2428jg34",
        "name": "Defense Ability",
        "traits": "defense_traits1",
        "range": "",
        "actions": "three",
        "type": "defense",
        "description": "Basic defense text "
      }
    ]
  });

  expect(monster.automatic_abilities).toEqual([
    {
      name: 'Defense Ability',
      action_cost: 'Three Actions',
      traits: ['defense_traits1'],
      description: 'Basic defense text',
    }
  ])
});

it('fromPF2Tools general abilities', () => {
  const monster = fromPF2Tools({
    "specials": [
      {
        "id": "_20voqoslze6",
        "name": "Fire Breath",
        "traits": "general_ability_traits1,general_ability_traits2",
        "range": "",
        "actions": "none",
        "type": "general",
        "description": "This is the best description in all the lands\n**Critical Success** My critical success text\n**Success** My success text\n**Failure** My failure text\n**Critical Failure** My critical failure text"
      }
    ]
  });

  expect(monster.sense_abilities).toEqual([
    {
      name: 'Fire Breath',
      action_cost: null,
      traits: ['general_ability_traits1', 'general_ability_traits2'],
      description: 'This is the best description in all the lands',
      critical_success: 'My critical success text',
      success: 'My success text',
      failure: 'My failure text',
      critical_failure: 'My critical failure text',
    }
  ])
});

it('fromPF2Tools offense abilities', () => {
  const monster = fromPF2Tools({
    "specials": [
      {
        "id": "_28zgeip2f4g",
        "name": "MyOffense",
        "traits": "offense_traits1,offense_traits2",
        "range": "",
        "actions": "one",
        "type": "offense",
        "description": "This is the best description in all the lands **Requirements** On the ground. **Trigger** Takes damage **Effect** Blows up"
      }
    ]
  });

  expect(monster.proactive_abilities).toEqual([
    {
      name: 'MyOffense',
      action_cost: 'One Action',
      traits: ['offense_traits1', 'offense_traits2'],
      description: 'This is the best description in all the lands',
      requirements: 'On the ground.',
      trigger: 'Takes damage',
      effect: 'Blows up',
    }
  ])
});

it('Strikes', () => {
  expect(fromDamage('2d6+10 piercing plus 1 fire, and 2 cold')).toEqual({
    formula: '2d6+10',
    type: 'piercing',
    plusDamage: [
      { formula: '1', type: 'fire' },
      { formula: '2', type: 'cold' },
    ],
  });

  expect(fromDamage('2d6+10  deadly piercing')).toEqual({
    formula: '2d6+10',
    type: 'deadly piercing',
  });
});

it('Type with value', () => {
  expect(fromTypeWithValue('fire 5'))
    .toEqual({ type: 'fire', amount: 5 });

    expect(fromTypeWithValue('fire 0'))
      .toEqual({ type: 'fire', amount: 0 });

    expect(fromTypeWithValue('fire -1'))
      .toEqual({ type: 'fire', amount: -1 });

    expect(fromTypeWithValue('mega fire 5 explosion'))
      .toEqual({ type: 'mega fire explosion', amount: 5 });

    expect(fromTypeWithValue('fire 5 (magical only)'))
      .toEqual({ type: 'fire (magical only)', amount: 5 });

    expect(fromTypeWithValue('fire 5 (2x/day)'))
      .toEqual({ type: 'fire (2x/day)', amount: 5 });

    expect(fromTypeWithValue('30'))
      .toEqual({ amount: 30 });
});

it('Skills', () => {
  expect(fromSkills({
    "deception": {
      "value": "+15",
      "benchmark": "terrible",
      "note": "decept note"
    }
  })).toEqual([
    { name: 'Deception', bonus: 15, misc: 'decept note' }
  ]);

  expect(fromSkills({
    "lorealt": {
      "value": "+19",
      "benchmark": "moderate",
      "note": "mountain lore note",
      "name": "mountain lore"
    }
  })).toEqual([
    { name: 'mountain lore', bonus: 19, misc: 'mountain lore note' }
  ]);
});

it('Speed', () => {
  expect(fromSpeed('30')).toEqual([{ type: 'Land', amount: 30 }]);
  expect(fromSpeed('30 land')).toEqual([{ type: 'land', amount: 30 }]);
  expect(fromSpeed('30 fly, 60'))
  .toEqual([
    { type: 'fly', amount: 30 },
    { type: 'Land', amount: 60 },
  ]);
  expect(fromSpeed('30 fly, 60 cave'))
  .toEqual([
    { type: 'fly', amount: 30 },
    { type: 'cave', amount: 60 },
  ]);
});

it('Spell Lists', () => {
  expect(fromSpells({
    "spellattack": {
      "value": "+25",
      "benchmark": "extreme",
      "note": "spell attack note"
    },
    "spelldc": {
      "value": 29,
      "benchmark": "high",
      "note": "spell dc note"
    },
    "spelltype": "arcane",
    "focuspoints": 0,
    "cantriplevel": 6,
    "spells": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "fireball",
      "",
      "grease",
      "shield, flame"
    ],
    "constant": "true seeing",    
  })).toEqual({
    dc: 29,
    misc: 'spell dc note',
    name: 'arcane',
    to_hit: 25,
    spell_groups: [
      { level: 3, spells: [{ name: 'fireball' }]},
      { level: 1, spells: [{ name: 'grease' }]},
      { level: 0, heightened_level: 6, spells: [{ name: 'shield' }, { name: 'flame' }]},
    ],
  });
});