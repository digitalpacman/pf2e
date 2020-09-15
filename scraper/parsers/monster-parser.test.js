const fs = require('fs');
const monsterParser = require('./monster-parser');
const abilityTemplate = require('./universal-abilities/template');

it('parse armor class from aasimar redeemer', () => {
  const input = fs.readFileSync(__dirname + '/../downloads/aon/grim reaper.html').toString();

  const monster = monsterParser(input);

  expect(monster).toEqual({
    description: `The Grim Reaper is the unflinching personification of death. Silent as the grave and as inevitable as time itself, this legendary being hunts down and finishes creatures that have evaded death for far too long. Sometimes the Grim Reaper comes without warning, while at others it comes to finish the work that other creatures could not. The Grim Reaper serves no god, fiend, or aeon. It is both despised and feared by psychopomps and celestials, but few—if any—dare to stand in its way. Like some eternal plague, it kills those who try to cure the multiverse of its presence. It stands alone and holds only its own council, and the pleading and reasoning of mortals and immortals alike fall on deaf ears once the Grim Reaper closes on its quarry. Its own reasoning is silent to mortal ears and inscrutable to the mortal mind, but no matter the reason, the result is unyielding and final.\n\n\n\nWhile some legends hold that the Grim Reaper appears before everyone as they die, the truth is quite a bit more disturbing. Such vigils in fact lie within the providence of the psychopomps, a race of immortals charged with the protection and guidance of mortal souls through the afterlife. The Grim Reaper has little interest in protecting souls or guiding them. It is instead compelled by sinister agendas arising within the nighted realm of Abaddon, where the Horsemen of the Apocalypse rule. Indeed there are many similarities in shape and form between the Grim Reaper and Charon, the Horseman of Death, but no recorded instance exists of these two powerful entities working together. Instead, the Grim Reaper serves as something of a manifestation of Abaddon itself, and in this regard is believed by some to be an incarnation of the mysterious First Horseman. When the Grim Reaper comes to a world, it does so not as an angel of mercy, but as a relentless harvester of life. Those who fall to the Grim Reaper were not destined to die as much as they were selected, hunted, and murdered.\n\n\n\nPerhaps the most frightening legends surrounding the Grim Reaper concern its nature as a singular entity, for some believe that more than one grim reaper exists in the Great Beyond. These whispers tell of a cabal of at least nine of these creatures that stalk reality, culling the living as inexplicable servants of true entropy. According to the teaching of some death cults, the final goal of the Grim Reaper is to end the entire cycle of life and death and serve as a silent lord of an empty universe.\n\n\n\n**__Recall Knowledge - Undead__ (__Religion__)**: DC 52`,
    name: 'Grim Reaper',
    level: 21,
    rarity: 'Unique',
    alignment: 'NE',
    size: 'Medium',
    traits: [
      'Undead'
    ],
    sources: [
      { abbr: 'Bestiary', page_start: '196', page_stop: null },
    ],
    perception: 41,
    senses: ['darkvision', 'see invisibility', 'status sight', 'true seeing'],
    languages: ['Common', 'Necril'],
    skills: [
      { name: 'Acrobatics', bonus: 43, misc: null },
      { name: 'Athletics', bonus: 38, misc: null },
      { name: 'Deception', bonus: 40, misc: null },
      { name: 'Intimidation', bonus: 43, misc: null },
      { name: 'Religion', bonus: 39, misc: null },
      { name: 'Society', bonus: 36, misc: null },
      { name: 'Stealth', bonus: 43, misc: null },
    ],
    ability_mods: {
      str_mod: 8,
      dex_mod: 10,
      con_mod: 8,
      int_mod: 5,
      wis_mod: 7,
      cha_mod: 8,
    },
    sense_abilities: [
      {
        ...abilityTemplate,
        name: `Death's Grace`,
        description: 'The grim reaper can choose whether or not it counts as undead for effects that affect undead differently. Even if it does not count as undead, the grim reaper still never counts as a living creature.',
        raw_description: `**Death's Grace** The grim reaper can choose whether or not it counts as undead for effects that affect undead differently. Even if it does not count as undead, the grim reaper still never counts as a living creature.`,
      },
      {
        ...abilityTemplate,
        name: 'Status Sight',
        description: 'The grim reaper automatically knows the Hit Points, conditions, afflictions, and emotions of all creatures it can see.',
        raw_description: `**Status Sight** The grim reaper automatically knows the Hit Points, conditions, afflictions, and emotions of all creatures it can see.`,
      },
    ],
    items: ['scythe'],
    ac: 47,
    ac_special: null,
    saves: {
      fort: 37,
      fort_misc: null,
      ref: 41,
      ref_misc: null,
      will: 38,
      will_misc: null,
      misc: '+1 status to all saves vs. magic',
    },
    hp: 320,
    hp_misc: 'negative healing',
    immunities: ['death effects', 'disease', 'paralyzed', 'poison', 'unconscious'],
    resistances: [
      { amount: 15, type: 'all damage', misc: null },
    ],
    automatic_abilities: [
      {
        ...abilityTemplate,
        name: 'Aura of Misfortune',
        action_cost: 'None',
        traits: ['aura', 'divination', 'divine', 'misfortune'],
        range: '20 feet',
        description: 'Living creatures in the aura must roll twice on all d20 rolls and use the lower result.',
        raw_description: `**Aura of Misfortune** (__aura__, __divination__, __divine__, __misfortune__) 20 feet. Living creatures in the aura must roll twice on all d20 rolls and use the lower result.`,
      },
      {
        ...abilityTemplate,
        name: 'Negative Healing',
        action_cost: 'None',
        description: 'The grim reaper can choose whether or not it takes positive damage.',
        raw_description: `**Negative Healing** The grim reaper can choose whether or not it takes positive damage.`,
      },
      {
        ...abilityTemplate,
        name: 'Lurking Death',
        action_cost: 'None',
        action_cost: 'Reaction',
        traits: ['teleportation'],
        trigger: 'A creature within 100 feet makes a ranged attack or uses an action that has the concentrate, manipulate, or move trait.',
        effect: 'The grim reaper teleports to a square adjacent to the triggering creature and makes a melee Strike against it. If the Strike hits, the grim reaper disrupts the triggering action.',
        raw_description: `**Lurking Death** [Reaction] (__teleportation__); **Trigger** A creature within 100 feet makes a ranged attack or uses an action that has the concentrate, manipulate, or move trait. **Effect** The grim reaper teleports to a square adjacent to the triggering creature and makes a melee Strike against it. If the Strike hits, the grim reaper disrupts the triggering action.`,
      },
    ],
    speed: [
      { type: 'Land', amount: 50, misc: null },
      { type: 'fly', amount: 75, misc: null },
    ],
    melee_attacks: [
      {
        name: 'keen scythe',
        action_cost: 'One Action',
        to_hit: 40,
        traits: ['agile','deadly 3d10','magical','reach 10 feet','trip'],
        damage: {
          formula: '4d10+23',
          type: 'slashing'
        },
        plus_damage: [
          {
            formula: null,
            type: 'death strike'
          },
          {
            formula: null,
            type: 'energy drain'
          },
        ]
      }
    ],
    ranged_attacks: null,
    active_abilities: [
      {
        ...abilityTemplate,
        name: 'Death Strike',
        traits: ['death'],
        description: `A creature critically hit by any of the grim reaper's attacks or that critically fails against any of its spells must succeed at a DC 47 Fortitude save or die.`,
        raw_description: `**Death Strike** (__death__) A creature critically hit by any of the grim reaper's attacks or that critically fails against any of its spells must succeed at a DC 47 Fortitude save or die.`,
      },
      {
        ...abilityTemplate,
        name: 'Energy Drain',
        description: 'When the grim reaper hits and deals damage with its scythe, it regains 20 Hit Points, and the target must succeed at a DC 43 Fortitude save or become __doomed 1__. If the target is already doomed, the doomed value increases by 1 (to a maximum of doomed 3).',
        raw_description: `**Energy Drain** When the grim reaper hits and deals damage with its scythe, it regains 20 Hit Points, and the target must succeed at a DC 43 Fortitude save or become __doomed 1__. If the target is already doomed, the doomed value increases by 1 (to a maximum of doomed 3).`,
      },
      {
        ...abilityTemplate,
        name: 'Final Death',
        description: `A creature killed by the grim reaper can't be brought back to life by any means short of divine intervention.`,
        raw_description: `**Final Death** A creature killed by the grim reaper can't be brought back to life by any means short of divine intervention.`,
      },
      {
        ...abilityTemplate,
        name: 'Infuse Weapon',
        traits: ['divine','evocation'],
        description: `Any scythe gains the __agile__ trait, can't be disarmed, and becomes a +3 __major striking__ __keen__ scythe while the grim reaper wields it. If the grim reaper Strikes a creature with a weakness to any specific type of damage, the scythe's damage counts as that type of damage, in addition to slashing.`,
        raw_description: `**Infuse Weapon** (__divine__, __evocation__) Any scythe gains the __agile__ trait, can't be disarmed, and becomes a +3 __major striking__ __keen__ scythe while the grim reaper wields it. If the grim reaper Strikes a creature with a weakness to any specific type of damage, the scythe's damage counts as that type of damage, in addition to slashing.`,
      }
    ],
    spell_lists: [
      {
        spells_source: 'Divine Innate Spells',
        dc: 47,
        attack_bonus: 37,
        misc: null,
        focus_points: null,
        spell_lists: [
          { level: 10, spells: [{ name: 'finger of death', misc: 'x4' }] },
          { level: 7, spells: [{ name: 'plane shift', misc: null }] },
        ],
        constants: [
          { level: 6, spells: [{ name: 'true seeing', misc: null }] },
          { level: 3, spells: [{ name: 'haste', misc: null }] },
          { level: 2, spells: [{ name: 'see invisibility', misc: null }] },
        ],
        cantrips: null,
      }
    ]
  });
});