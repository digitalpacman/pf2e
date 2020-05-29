[
  {
    "name": "Young Magma Dragon",
    "source": [
      {
        "abbr": "Bestiary 2",
        "page_start": "94",
        "page_stop": null
      }
    ],
    "description": "Magma dragons have a reputation among other dragons for being unpredictable and brash. Their temperament and tendency for violent outbursts ensure that the typical magma dragon lives a solitary life, with hatchlings often bickering or fighting to establish dominance among themselves before they leave the nest. A magma dragon always has a reason for their outbursts and can always justify their sudden turns in mood, yet they rarely feel the need to do so.\n\n\n\nMagma dragons build lairs within volcanically active mountains or deep underground amid vast lakes of bubbling magma. As with all true dragons, magma dragons keep hoards of treasure, but the nature of their searing lairs limits the type of valuables they collect to metals, gems, and items capable of resisting the heat of a volcano's core.\n\n\n\n**__Recall Knowledge - Dragon__ (__Arcana__)**: DC 28\n\n**__Recall Knowledge - Elemental__ (__Arcana__, __Nature__)**: DC 28",
    "level": "9",
    "rarity": "Uncommon",
    "type": "Creature",
    "alignment": "CN",
    "size": "Large",
    "traits": [
      "Uncommon",
      "CN",
      "Large",
      "Dragon",
      "Elemental",
      "Fire"
    ],
    "senses": [
      "Perception +18",
      "darkvision",
      "scent (imprecise) 60 feet"
    ],
    "languages": [
      "Common",
      "Draconic",
      "Ignan"
    ],
    "skills": [
      {
        "name": "Acrobatics ",
        "bonus": "16",
        "misc": null
      },
      {
        "name": "Athletics ",
        "bonus": "19",
        "misc": null
      },
      {
        "name": "Deception ",
        "bonus": "14",
        "misc": null
      },
      {
        "name": "Intimidation ",
        "bonus": "18",
        "misc": null
      },
      {
        "name": "Nature ",
        "bonus": "15",
        "misc": null
      },
      {
        "name": "Stealth ",
        "bonus": "16",
        "misc": null
      },
      {
        "name": "Survival ",
        "bonus": "18",
        "misc": null
      }
    ],
    "perception": "18",
    "ability_mods": {
      "str_mod": "6",
      "dex_mod": "1",
      "con_mod": "4",
      "int_mod": "0",
      "wis_mod": "3",
      "cha_mod": "3"
    },
    "sense_abilities": null,
    "items": null,
    "ac": "28",
    "ac_special": null,
    "saves": {
      "fort": "19",
      "ref": "16",
      "will": "18",
      "misc": null
    },
    "saves_special": {
      "fort": null,
      "ref": null,
      "will": null,
      "misc": null
    },
    "hp": "175",
    "hp_misc": null,
    "immunities": [
      "fire",
      "paralyzed",
      "sleep"
    ],
    "resistances": [
      {
        "amount": "10",
        "type": "cold"
      }
    ],
    "weaknesses": null,
    "automatic_abilities": [
      {
        "name": "Frightful Presence",
        "action_cost": "None",
        "traits": null,
        "description": " (__aura__, __emotion__, __fear__, __mental__) 90 feet, DC 24",
        "raw_description": "**Frightful Presence**  (__aura__, __emotion__, __fear__, __mental__) 90 feet, DC 24 A creature that first enters the area must attempt a Will save. Regardless of the result of the saving throw, the creature is temporarily immune to this monster's Frightful Presence for 1 minute.\nCritical Success The creature is unaffected by the presence.\nSuccess The creature is frightened 1.\nFailure The creature is frightened 2.\nCritical Success The creature is frightened 4.",
        "generic_description": "A creature that first enters the area must attempt a Will save. Regardless of the result of the saving throw, the creature is temporarily immune to this monster's Frightful Presence for 1 minute.",
        "frequency": null,
        "trigger": null,
        "effect": null,
        "range": null,
        "effects": null,
        "critical_success": "The creature is unaffected by the presence.",
        "success": "The creature is frightened 1.",
        "failure": "The creature is frightened 2.",
        "critical_failure": "The creature is frightened 4.",
        "full_description": null
      },
      {
        "name": "Wing Deflection ",
        "action_cost": "Reaction",
        "traits": null,
        "description": null,
        "raw_description": "**Wing Deflection [Reaction]** **Trigger **The dragon is targeted with an attack; **Effect **The dragon raises a wing, gaining a +2 circumstance bonus to AC against the triggering attack. If the dragon is Flying, they descend 10 feet after the attack.",
        "generic_description": null,
        "frequency": null,
        "trigger": "The dragon is targeted with an attack",
        "effect": "The dragon raises a wing, gaining a +2 circumstance bonus to AC against the triggering attack. If the dragon is Flying, they descend 10 feet after the attack.",
        "range": null,
        "effects": null,
        "critical_success": null,
        "success": null,
        "failure": null,
        "critical_failure": null,
        "full_description": null
      }
    ],
    "speed": [
      {
        "amount": "30",
        "type": "Land"
      },
      {
        "amount": "100",
        "type": "fly"
      },
      {
        "amount": "30",
        "type": "swim"
      },
      {
        "amount": null,
        "type": "magma swim"
      }
    ],
    "melee": [
      {
        "action_cost": "One Action",
        "name": "jaws",
        "to_hit": "21",
        "traits": [
          "fire",
          "reach 10 feet"
        ],
        "damage": {
          "formula": "2d10+10",
          "type": "piercing"
        },
        "plus_damage": [
          {
            "formula": "2d6",
            "type": "fire"
          }
        ]
      },
      {
        "action_cost": "One Action",
        "name": "claw",
        "to_hit": "21",
        "traits": [
          "agile"
        ],
        "damage": {
          "formula": "2d10+10",
          "type": "slashing"
        },
        "plus_damage": null
      },
      {
        "action_cost": "One Action",
        "name": "tail",
        "to_hit": "19",
        "traits": [
          "reach 15 feet"
        ],
        "damage": {
          "formula": "2d12+10",
          "type": "bludgeoning"
        },
        "plus_damage": null
      },
      {
        "action_cost": "One Action",
        "name": "horns",
        "to_hit": "19",
        "traits": [
          "reach 10 feet"
        ],
        "damage": {
          "formula": "1d10+10",
          "type": "piercing"
        },
        "plus_damage": null
      }
    ],
    "ranged": null,
    "spell_lists": [
      {
        "name": "Primal Innate Spells",
        "dc": "26",
        "to_hit": "18",
        "misc": "",
        "spell_groups": [
          {
            "level": "4",
            "heightened_level": null,
            "spells": [
              {
                "name": "burning hands",
                "frequency": "at will",
                "requirement": null
              }
            ]
          },
          {
            "level": "0",
            "heightened_level": "4",
            "spells": [
              {
                "name": "produce flame",
                "frequency": null,
                "requirement": null
              }
            ]
          }
        ]
      }
    ],
    "ritual_lists": null,
    "proactive_abilities": [
      {
        "name": "Breath Weapon",
        "action_cost": "Two Actions",
        "traits": [
          "evocation",
          "fire",
          "primal"
        ],
        "description": "The dragon breathes a blast of magma that deals 5d6 fire damage and 3d12 bludgeoning damage in a 30-foot cone (DC 28 basic Reflex save). They can't use Breath Weapon again for 1d4 rounds.",
        "raw_description": "**Breath Weapon** [Two Actions]  (__evocation__, __fire__, __primal__) The dragon breathes a blast of magma that deals 5d6 fire damage and 3d12 bludgeoning damage in a 30-foot cone (DC 28 basic Reflex save). They can't use Breath Weapon again for 1d4 rounds.",
        "generic_description": null,
        "frequency": null,
        "trigger": null,
        "effect": null,
        "range": null,
        "effects": null,
        "critical_success": null,
        "success": null,
        "failure": null,
        "critical_failure": null,
        "full_description": null
      },
      {
        "name": "Draconic Frenzy",
        "action_cost": "Two Actions",
        "traits": null,
        "description": "The dragon makes two claw Strikes and one horn Strike in any order.",
        "raw_description": "**Draconic Frenzy** [Two Actions]  The dragon makes two claw Strikes and one horn Strike in any order.",
        "generic_description": null,
        "frequency": null,
        "trigger": null,
        "effect": null,
        "range": null,
        "effects": null,
        "critical_success": null,
        "success": null,
        "failure": null,
        "critical_failure": null,
        "full_description": null
      },
      {
        "name": "Draconic Momentum",
        "action_cost": "None",
        "traits": null,
        "description": "The dragon recharges their Breath Weapon whenever they score a critical hit with a Strike.",
        "raw_description": "**Draconic Momentum** The dragon recharges their Breath Weapon whenever they score a critical hit with a Strike.",
        "generic_description": null,
        "frequency": null,
        "trigger": null,
        "effect": null,
        "range": null,
        "effects": null,
        "critical_success": null,
        "success": null,
        "failure": null,
        "critical_failure": null,
        "full_description": null
      },
      {
        "name": "Magma Swim",
        "action_cost": "None",
        "traits": null,
        "description": "A magma dragon's swim Speed functions only when the dragon is __Swimming__ through magma or molten lava.",
        "raw_description": "**Magma Swim** A magma dragon's swim Speed functions only when the dragon is __Swimming__ through magma or molten lava.",
        "generic_description": null,
        "frequency": null,
        "trigger": null,
        "effect": null,
        "range": null,
        "effects": null,
        "critical_success": null,
        "success": null,
        "failure": null,
        "critical_failure": null,
        "full_description": null
      }
    ],
    "search_text": "Young Magma Dragon. Magma dragons have a reputation among other dragons for being unpredictable and brash. Their temperament and tendency for violent outbursts ensure that the typical magma dragon lives a solitary life, with hatchlings often bickering or fighting to establish dominance among themselves before they leave the nest. A magma dragon always has a reason for their outbursts and can always justify their sudden turns in mood, yet they rarely feel the need to do so.\n\n\n\nMagma dragons build lairs within volcanically active mountains or deep underground amid vast lakes of bubbling magma. As with all true dragons, magma dragons keep hoards of treasure, but the nature of their searing lairs limits the type of valuables they collect to metals, gems, and items capable of resisting the heat of a volcano's core.\n\n\n\n**__Recall Knowledge - Dragon__ (__Arcana__)**: DC 28\n\n**__Recall Knowledge - Elemental__ (__Arcana__, __Nature__)**: DC 28. fire. paralyzed. sleep. Large"
  }
]