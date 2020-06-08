import { split, components, lowestIndexOf, fromPF2Tools } from './tool-conversion';

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

