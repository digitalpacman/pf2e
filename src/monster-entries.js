const entries = [
  {
    "url": null,
    "name": "Unseen Servant",
    "traits": [
      "No Alignment",
      "Medium",
      "Mindless"
    ],
    "level": -1,
    "perception": 0,
    "alignment": "None",
    "size": "Medium",
    "skills": {
      "Stealth": 8
    },
    "senses": [
      "darkvision"
    ],
    "languages": [
      " - (understands its creator)"
    ],
    "items": null,
    "description": "This creature can be summoned with the spell *Unseen Servant*.",
    "automaticAbilities": [
      {
        "name": "Invisible",
        "description": "An unseen servant is invisible, though it normally doesn’t Sneak, so it is usually only hidden."
      }
    ],
    "proactiveAbilities": [
      {
        "name": "Force Body",
        "description": "An unseen servant’s physical body is made of force. It can’t use attack actions. It can move and use Interact actions to do things such as fetch objects, open unstuck or unlocked doors, hold chairs, and clean. It can’t pass through solid objects."
      }
    ],
    "str": -4,
    "dex": 2,
    "con": 0,
    "int": -5,
    "wis": 0,
    "cha": 0,
    "ac": 13,
    "fort": 0,
    "ref": 4,
    "will": 0,
    "savesExtraText": null,
    "hp": 4,
    "immunities": [
      "disease",
      "mental",
      "non-magical attacks",
      "paralysis",
      "poison",
      "precision",
      "unconscious"
    ],
    "weaknesses": null,
    "speed": {
      "Fly": 30
    },
    "resistances": {
      "all damage (except force or ghost touch)": 5
    },
    "spells": [],
    "rituals": null,
    "meleeAttacks": [],
    "rangedAttacks": []
  },
  {
    "url": null,
    "name": "Alghollthu Master (Aboleth)",
    "traits": [
      "Uncommon",
      "LE",
      "Huge",
      "Aberration",
      "Aquatic"
    ],
    "level": 7,
    "perception": 17,
    "alignment": "None",
    "size": "Medium",
    "skills": {
      "Athletics": 16,
      "Deception": 15,
      "Intimidation": 15,
      "Lore": 14,
      "Occultism": 16
    },
    "senses": [
      "darkvision"
    ],
    "languages": [
      "Aklo",
      "Alghollthu",
      "Aquan",
      "Common",
      "Undercommon"
    ],
    "items": null,
    "description": "Aboleths form the core of alghollthu society, and while they are the “common folk” of their own societies, they see themselves as masters of all others. Unlike their leaders, who mask their actions using magical disguises, aboleths revel in their monstrous forms, appearing as primeval fish with tentacles. Masters of psychic manipulation, they are a species so ancient that they were present in the world when it was young, before the gods had turned their attention to the planet. They see all other life as something they have the right to control, so the idea that potential slaves might have faith in a higher power other than themselves enrages aboleths.",
    "automaticAbilities": [
      {
        "name": "Mucus Cloud",
        "description": "While underwater, an aboleth exudes a cloud of transparent slime. An air-breathing creature adjacent to an aboleth must succeed at a DC 25 Fortitude save each round or lose the ability to breathe air but gain the ability to breathe water for 3 hours."
      }
    ],
    "proactiveAbilities": [
      {
        "name": "Slime",
        "description": "**Saving Throw** Fortitude DC 25; **Stage 1** no ill effect (1 round); **Stage 2** the victim’s skin softens, inflicting drained 1 (1 round); **Stage 3** the victim’s skin transforms into a clear, slimy membrane, inflicting drained 2 until the curse ends; every hour this membrane remains dry, the creature’s drained condition increases by 1 (permanent). A remove disease spell can counteract this curse, but immunity to disease offers no protection against it."
      }
    ],
    "str": 5,
    "dex": 1,
    "con": 6,
    "int": 3,
    "wis": 5,
    "cha": 4,
    "ac": 23,
    "fort": 15,
    "ref": 10,
    "will": 16,
    "savesExtraText": null,
    "hp": 135,
    "immunities": [],
    "weaknesses": null,
    "speed": {
      "Land": 10,
      "Swim": 60
    },
    "resistances": {},
    "spells": [
      {
        "frequency": "at will",
        "name": "project image",
        "level": 7
      },
      {
        "frequency": "at will",
        "name": "veil",
        "level": 7
      },
      {
        "frequency": "x3",
        "name": "dominate",
        "level": 6
      },
      {
        "frequency": "x3",
        "name": "illusory scene",
        "level": 6
      },
      {
        "frequency": "at will",
        "name": "illusory object",
        "level": 5
      },
      {
        "frequency": "at will",
        "name": "hallucinatory terrain",
        "level": 4
      },
      {
        "frequency": "at will",
        "name": "hypnotic pattern",
        "level": 3
      }
    ],
    "rituals": null,
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "2d8+10 plus slime",
        "damageType": "bludgeoning",
        "name": "tentacle",
        "hitBonus": 16,
        "traits": [
          "agile",
          "magical",
          "reach 15 feet"
        ]
      }
    ],
    "rangedAttacks": []
  },
  {
    "url": null,
    "name": "Skum (Ulat-Kini)",
    "traits": [
      "LE",
      "Medium",
      "Amphibious",
      "Humanoid"
    ],
    "level": 2,
    "perception": 6,
    "alignment": "LE",
    "size": "Medium",
    "skills": {
      "Athletics": 8,
      "Intimidation": 4,
      "Stealth": 7
    },
    "senses": [
      "darkvision"
    ],
    "languages": [
      "Alghollthu",
      "Undercommon"
    ],
    "items": null,
    "description": "The most numerous of the alghollthus are the ulat-kinis, a servitor race created from human stock to serve as rank-and-file soldiers in alghollthu armies. At the zenith of alghollthu power, ulat-kinis formed massive legions and enjoyed significant power over other species. When the alghollthus retreated from the world, they abandoned teeming hordes of ulatkinis. Although these erstwhile soldiers tried to continue their conquering ways, their numbers declined rapidly in battlefield defeats and purposeful exterminations enacted by their enemies. Ulat-kini society degenerated, so that now only a few enclaves exist in the depths of the earth or along isolated coastlines. Few remember their own species’ name, instead using the epithet their foes gave them: “skum.”",
    "automaticAbilities": [],
    "proactiveAbilities": [],
    "str": 4,
    "dex": 1,
    "con": 3,
    "int": 0,
    "wis": 0,
    "cha": -2,
    "ac": 16,
    "fort": 7,
    "ref": 7,
    "will": 4,
    "savesExtraText": null,
    "hp": 40,
    "immunities": [],
    "weaknesses": null,
    "speed": {
      "Land": 20,
      "Swim": 40
    },
    "resistances": {
      "cold": 5
    },
    "spells": [],
    "rituals": null,
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "1d8+4",
        "damageType": "piercing",
        "name": "trident",
        "hitBonus": 10,
        "traits": []
      },
      {
        "actionCost": "One Action",
        "damageFormula": "1d6+4",
        "damageType": "slashing",
        "name": "claw",
        "hitBonus": 10,
        "traits": [
          "agile"
        ]
      },
      {
        "actionCost": "One Action",
        "damageFormula": "2d4+4",
        "damageType": "piercing",
        "name": "fangs",
        "hitBonus": 10,
        "traits": []
      }
    ],
    "rangedAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "1d8+3",
        "damageType": "piercing",
        "name": "trident",
        "hitBonus": 7,
        "traits": [
          "thrown 20 feet"
        ]
      }
    ]
  },
  {
    "url": null,
    "name": "Faceless Stalker (Ugothol)",
    "traits": [
      "CE",
      "Medium",
      "Aberration"
    ],
    "level": 4,
    "perception": 10,
    "alignment": "CE",
    "size": "Medium",
    "skills": {
      "Acrobatics": 12,
      "Athletics": 12,
      "Deception": 13,
      "Stealth": 13,
      "Thievery": 9
    },
    "senses": [
      "darkvision"
    ],
    "languages": [
      "Alghollthu",
      "Aquan",
      "Common"
    ],
    "items": [
      "longsword",
      "studded leather armor"
    ],
    "description": "Among the subtler of the alghollthu creations were the ugothols—also known as faceless stalkers. These twisted beings used shapeshifting to infiltrate settlements and assassinate key targets. They sowed discord and replaced leaders, causing unwanted organizations to implode and bothersome people to lose face and eventually disappear. Entirely terrestrial in nature, ugothols can easily extend alghollthu plots above the waves for extended periods of time, giving their aquatic masters enhanced reach into these unpleasantly dry realms. Today, most faceless stalkers—like the less dangerous ulat-kinis—pursue programmed goals without the guidance of alghollthu rule. Faceless stalkers prefer to live as close to the sea coast as possible, although they are not aquatic creatures themselves. Most dwell in tiny tribes in marshlands. Others live in the sewers of coastal towns.",
    "automaticAbilities": [],
    "proactiveAbilities": [
      {
        "name": "Assume Form",
        "description": "The faceless stalker spends 10 minutes reshaping its appearance to take on the shape of any Small or Medium humanoid. It gains a +4 circumstance bonus to Deception checks to pass as that creature."
      },
      {
        "name": "Blood Nourishment",
        "description": "The faceless stalker uses its three-pronged tongue to drink the blood of an adjacent restrained or unconscious creature. The creature gains drained 1."
      },
      {
        "name": "Compression",
        "description": "When the faceless stalker successfully Squeezes, it moves through the tight space at full speed. Narrow confines are not difficult terrain for a faceless stalker."
      },
      {
        "name": "Revert Form",
        "description": "The faceless stalker resumes its true form. Until the start of its next turn, it gains a +2 status bonus to attack rolls, damage rolls, saving throws, and skill checks."
      },
      {
        "name": "Sneak Attack",
        "description": "The faceless stalker deals 1d6 extra precision damage to flat-footed creatures."
      }
    ],
    "str": 4,
    "dex": 3,
    "con": 3,
    "int": 0,
    "wis": 2,
    "cha": 3,
    "ac": 21,
    "fort": 9,
    "ref": 9,
    "will": 12,
    "savesExtraText": null,
    "hp": 60,
    "immunities": [],
    "weaknesses": null,
    "speed": {
      "Land": 25
    },
    "resistances": {
      "bludgeoning": 5
    },
    "spells": [
      {
        "frequency": "constant",
        "name": "tongues",
        "level": 5
      }
    ],
    "rituals": null,
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "1d8+6",
        "damageType": "slashing",
        "name": "longsword",
        "hitBonus": 14,
        "traits": [
          "versatile P"
        ]
      },
      {
        "actionCost": "One Action",
        "damageFormula": "2d6+6 plus Grab",
        "damageType": "slashing",
        "name": "claw",
        "hitBonus": 12,
        "traits": [
          "agile"
        ]
      }
    ],
    "rangedAttacks": []
  },
  {
    "url": null,
    "name": "Veiled Master (Vidileth)",
    "traits": [
      "Rare",
      "LE",
      "Large",
      "Aberration",
      "Aquatic"
    ],
    "level": 14,
    "perception": 25,
    "alignment": "None",
    "size": "Medium",
    "skills": {
      "Arcana": 27,
      "Athletics": 24,
      "Deception": 28,
      "Intimidation": 26,
      "Lore": 29,
      "Occultism": 29,
      "Society": 27,
      "Stealth": 24
    },
    "senses": [
      "darkvision"
    ],
    "languages": [
      "Aklo",
      "Alghollthu",
      "Aquan",
      "Common",
      "Undercommon"
    ],
    "items": null,
    "description": "The powerful vidileths are the insidious veiled masters of the alghollthus. These manipulators of mind and body alike lead their species in the open, using their ability to change form to walk among and deceive humans and other sapient species. Many veiled masters are even more powerful than the typical specimen presented here and can use a wide range of arcane or occult spells and rituals. While veiled masters command significant combat prowess and impressive magical skills, the greatest danger they pose to others is their uncanny ability to infiltrate into societies much different than their own. The most paranoid of adventurers and conspiracy scholars worry that every major city has been infested by secret cabals of vidileths, while others dismiss this as hogwash and fearmongering. The truth is likely somewhere in between, but it doesn’t take many veiled masters pulling the strings behind the scenes to wreak havoc upon an entire nation!",
    "automaticAbilities": [
      {
        "name": "Mucus Cloud",
        "description": "While underwater, a veiled master exudes a cloud of transparent slime. An air-breathing creature within 30 feet of a veiled master must succeed at a DC 36 Fortitude save each round or lose the ability to breathe air but gain the ability to breathe water for 24 hours."
      }
    ],
    "proactiveAbilities": [
      {
        "name": "Change Shape",
        "description": "Once per round, a veiled master can take on the appearance of a humanoid of Large, Medium, or Small size or resume its true form. While in humanoid form, the veiled master’s Speed is 30 feet, and it loses its mucus cloud aura and swim Speed. If the humanoid form assumed lacks the aquatic trait, the veiled master loses its own aquatic trait as well. In humanoid form, the veiled master can use weapons, or it can make Strikes that work like its tentacle attack but use the reach of its current form. If the assumed form has fangs or claws, the veiled master can also make such Strikes, but these attacks lack the veiled master’s slime."
      },
      {
        "name": "Consume Memories",
        "description": "When a veiled master makes a fangs Strike against a creature, it can consume some of that creature’s memories. The target must succeed at a DC 37 Fortitude saving throw or become stupefied 1. A veiled master regains 5 Hit Points each time it successfully consumes memories. When a veiled master consumes memories, it learns some of the creature’s memories (subject to the GM’s discretion)."
      },
      {
        "name": "Delayed Suggestion",
        "description": "When a veiled master successfully casts *dominate* on a creature, a *suggestion* spell triggers when the *dominate* spell ends. This *suggestion* usually causes the target to return to the veiled master, so the creature can cast *dominate* again, but a veiled master can set the *suggestion* to different orders if it wishes."
      },
      {
        "name": "Slime",
        "description": "**Saving Throw** Fortitude DC 36; **Stage 1** no ill effect (1 round); **Stage 2** the victim’s skin softens, inflicting drained 1 (1 round); **Stage 3** the victim’s skin transforms into a clear, slimy membrane, inflicting drained 2 until the curse ends; every hour this membrane remains dry, the creature’s drained condition increases by 1 (permanent). A remove disease spell can counteract this curse, but immunity to disease offers no protection against it."
      },
      {
        "name": "Tentacle Flurry",
        "description": "The veiled master thrashes about with its tentacles. Make a tentacle Strike against each creature within its reach. Roll only one attack roll, and roll the damage only once for all targets."
      },
      {
        "name": "Thoughtlance",
        "description": "A creature touched by the veiled master’s tentacles, whether those tentacles deal damage or not, must attempt a DC 34 Will save, becoming slowed 1 on a failure or slowed 2 on a critical failure. Each time the affected creature ends its turn, its slowed value decreases by 1."
      }
    ],
    "str": 6,
    "dex": 6,
    "con": 8,
    "int": 7,
    "wis": 5,
    "cha": 6,
    "ac": 34,
    "fort": 26,
    "ref": 22,
    "will": 24,
    "savesExtraText": null,
    "hp": 270,
    "immunities": [
      "controlled",
      "electricity",
      "mental"
    ],
    "weaknesses": null,
    "speed": {
      "Land": 10,
      "Swim": 80
    },
    "resistances": {
      "cold": 20
    },
    "spells": [
      {
        "frequency": "at will",
        "name": "project image",
        "level": 9
      },
      {
        "frequency": "at will",
        "name": "illusory scene",
        "level": 8
      },
      {
        "frequency": "at will",
        "name": "suggestion",
        "level": 8
      },
      {
        "frequency": "at will",
        "name": "veil",
        "level": 7
      },
      {
        "frequency": "x3",
        "name": "dominate",
        "level": 6
      },
      {
        "frequency": "x3",
        "name": "dimension door",
        "level": 5
      },
      {
        "frequency": "x3",
        "name": "hallucinatory terrain",
        "level": 5
      },
      {
        "frequency": "x3",
        "name": "illusory object",
        "level": 5
      },
      {
        "frequency": "at will",
        "name": "hypnotic pattern",
        "level": 3
      },
      {
        "frequency": "at will",
        "name": "levitate",
        "level": 3
      },
      {
        "frequency": "at will",
        "name": "mind reading",
        "level": 3
      },
      {
        "frequency": "at will",
        "name": "secret page",
        "level": 3
      },
      {
        "frequency": "constant",
        "name": "tongues",
        "level": 5
      }
    ],
    "rituals": [
      {
        "frequency": null,
        "name": "geas",
        "level": 5
      }
    ],
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "3d10+12 plus slime",
        "damageType": "slashing",
        "name": "claw",
        "hitBonus": 30,
        "traits": [
          "agile",
          "magical",
          "reach 20 feet"
        ]
      },
      {
        "actionCost": "One Action",
        "damageFormula": "3d8+12 plus slime and consume memories",
        "damageType": "piercing",
        "name": "fangs",
        "hitBonus": 28,
        "traits": [
          "agile",
          "magical",
          "reach 10 feet",
          "versatile S"
        ]
      },
      {
        "actionCost": "One Action",
        "damageFormula": "7d6 plus thoughtlance",
        "damageType": "electricity",
        "name": "tentacle",
        "hitBonus": 28,
        "traits": [
          "agile",
          "electricity",
          "magical",
          "reach 20 feet"
        ]
      }
    ],
    "rangedAttacks": []
  },
  {
    "url": null,
    "name": "Arbiter",
    "traits": [
      "LN",
      "Tiny",
      "Aeon",
      "Inevitable",
      "Monitor"
    ],
    "level": 1,
    "perception": 7,
    "alignment": "LN",
    "size": "Medium",
    "skills": {
      "Acrobatics": 9,
      "Diplomacy": 6,
      "Stealth": 9
    },
    "senses": [
      "darkvision",
      "*detect alignment* (chaotic only)",
      "locate inevitable"
    ],
    "languages": [
      "Celestial",
      "Common",
      "Infernal",
      "Utopian"
    ],
    "items": [
      "shortsword"
    ],
    "description": "These spherical inevitables are scouts and diplomats. Found throughout the multiverse, they have traditionally kept watch over on chaos and its agents. With the announcement of the Convergence, many arbiters now serve as go-betweens among the aeon alliance and its mortal associates.",
    "automaticAbilities": [
      {
        "name": "Locate Inevitable",
        "description": "An arbiter can always sense the direction of the nearest non-arbiter inevitable on the plane, but it cannot sense the range of the inevitable."
      }
    ],
    "proactiveAbilities": [
      {
        "name": "Electrical Burst",
        "description": "The arbiter releases an electrical burst from its body that deals 3d6 electricity damage (DC 17 basic Reflex save). Following such a burst, the arbiter becomes stunned for 24 hours."
      }
    ],
    "str": 1,
    "dex": 4,
    "con": 2,
    "int": 0,
    "wis": 2,
    "cha": 1,
    "ac": 16,
    "fort": 5,
    "ref": 7,
    "will": 7,
    "savesExtraText": null,
    "hp": 22,
    "immunities": [
      "death effects",
      "disease",
      "emotion",
      "poison",
      "unconscious"
    ],
    "weaknesses": null,
    "speed": {
      "Land": 20,
      "Fly": 40
    },
    "resistances": {
      "electricity": 3
    },
    "spells": [
      {
        "frequency": null,
        "name": "read omens",
        "level": 4
      },
      {
        "frequency": null,
        "name": "command",
        "level": 1
      },
      {
        "frequency": "at will, chaotic only",
        "name": "detect alignment",
        "level": 1
      },
      {
        "frequency": "x3",
        "name": "mending",
        "level": 1
      }
    ],
    "rituals": null,
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "1d6+1 plus 1d4 lawful",
        "damageType": "piercing",
        "name": "shortsword",
        "hitBonus": 9,
        "traits": [
          "agile",
          "finesse",
          "lawful",
          "magical",
          "versatile S"
        ]
      }
    ],
    "rangedAttacks": []
  },
  {
    "url": null,
    "name": "Axiomite",
    "traits": [
      "LN",
      "Medium",
      "Aeon",
      "Monitor"
    ],
    "level": 8,
    "perception": 19,
    "alignment": "LN",
    "size": "Medium",
    "skills": {
      "Acrobatics": 16,
      "Crafting": 21,
      "Diplomacy": 15,
      "Occultism": 17,
      "Religion": 17
    },
    "senses": [
      "darkvision"
    ],
    "languages": [
      "Abyssal",
      "Celestial",
      "Common",
      "Draconic",
      "Infernal",
      "Utopian"
    ],
    "items": null,
    "description": "According to the axiomites, their kind rose from the raw mathematical underpinnings of the universe, manifesting as great builders who created the ancient, colossal cities of the Outer Planes and gave life to the mechanical inevitables. According to the aeons, axiomites are part of the Monad, having both risen from and rebelled against it long ago. Since the Convergence, most axiomites have recognized this as a fundamental truth, particularly after the aeons showed the axiomites how the Utopian language has formed as an amalgam of aeon envisioning and formulaic mathematical expression. Most axiomites live in the perfect city of Axis, which they continually act to improve, thus refining the concept of perfection itself.",
    "automaticAbilities": [],
    "proactiveAbilities": [
      {
        "name": "Crystalline Dust Form",
        "description": "The axiomite shifts between its humanoid form and that of a cloud of crystalline dust in which strange symbols and equations flash. In this form it gains a fly Speed of 40 feet and can fit through even tiny apertures, similarly to *gaseous form*. It can cast spells, but it can’t make melee or ranged attacks in this state. It can return to its humanoid form by using this action while in crystalline dust form."
      }
    ],
    "str": 5,
    "dex": 4,
    "con": 3,
    "int": 5,
    "wis": 5,
    "cha": 3,
    "ac": 26,
    "fort": 13,
    "ref": 16,
    "will": 18,
    "savesExtraText": null,
    "hp": 155,
    "immunities": [
      "disease",
      "emotion",
      "fear"
    ],
    "weaknesses": null,
    "speed": {
      "Land": 25
    },
    "resistances": {
      "electricity": 10,
      "mental": 10
    },
    "spells": [
      {
        "frequency": null,
        "name": "telekinetic haul",
        "level": 5
      },
      {
        "frequency": "lawful",
        "name": "dispel magic",
        "level": 4
      },
      {
        "frequency": "lawful",
        "name": "divine wrath",
        "level": 4
      },
      {
        "frequency": "lawful",
        "name": "lightning bolt",
        "level": 4
      },
      {
        "frequency": "x3",
        "name": "haste",
        "level": 3
      },
      {
        "frequency": "x3",
        "name": "paralyze",
        "level": 3
      },
      {
        "frequency": null,
        "name": "telekinetic maneuver",
        "level": 2
      },
      {
        "frequency": "at will",
        "name": "true strike",
        "level": 1
      }
    ],
    "rituals": null,
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "2d8+11 plus 1d6 lawful",
        "damageType": "bludgeoning",
        "name": "warhammer",
        "hitBonus": 20,
        "traits": [
          "lawful",
          "magical",
          "shove"
        ]
      },
      {
        "actionCost": "One Action",
        "damageFormula": "1d8+5 plus 1d6 lawful",
        "damageType": "bludgeoning",
        "name": "fist",
        "hitBonus": 17,
        "traits": [
          "agile",
          "lawful",
          "magical"
        ]
      }
    ],
    "rangedAttacks": []
  },
  {
    "url": null,
    "name": "Kolyarut",
    "traits": [
      "LN",
      "Medium",
      "Aeon",
      "Inevitable",
      "Monitor"
    ],
    "level": 12,
    "perception": 23,
    "alignment": "LN",
    "size": "Medium",
    "skills": {
      "Acrobatics": 22,
      "Athletics": 27,
      "Deception": 20,
      "Diplomacy": 20,
      "Survival": 22
    },
    "senses": [
      "(+27 to detect lies)"
    ],
    "languages": [
      "Celestial",
      "Infernal",
      "Utopian"
    ],
    "items": [
      "+1 striking bastard sword"
    ],
    "description": "Kolyarut inevitables are enforcers of bargains and punishers of those who fail to uphold them. Their humanoid shape, ability to disguise themselves among a humanoid population, and diplomatic leanings make them the most approachable inevitables, and thus more likely to ally themselves with others. They are among the most talkative of all inevitables, naturally possessing a courtly grace and an encyclopedic knowledge of social customs, which they use to assist their efforts in gathering information on their targets or issuing challenges in a legal manner.",
    "automaticAbilities": [
      {
        "name": "Truespeech",
        "description": "A kolyarut can speak with and understand any creature that has a language."
      }
    ],
    "proactiveAbilities": [],
    "str": 7,
    "dex": 4,
    "con": 5,
    "int": 1,
    "wis": 4,
    "cha": 2,
    "ac": 34,
    "fort": 23,
    "ref": 24,
    "will": 22,
    "savesExtraText": null,
    "hp": 215,
    "immunities": [
      "death effects",
      "disease",
      "emotion",
      "poison",
      "unconscious"
    ],
    "weaknesses": null,
    "speed": {
      "Land": 25
    },
    "resistances": {},
    "spells": [
      {
        "frequency": null,
        "name": "discern location",
        "level": 8
      },
      {
        "frequency": null,
        "name": "command",
        "level": 5
      },
      {
        "frequency": "at will",
        "name": "illusory disguise",
        "level": 4
      },
      {
        "frequency": "at will",
        "name": "suggestion",
        "level": 4
      },
      {
        "frequency": "x2",
        "name": "paralyze",
        "level": 3
      },
      {
        "frequency": "self only",
        "name": "silence",
        "level": 2
      }
    ],
    "rituals": null,
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "2d8+13 plus 1d6 lawful",
        "damageType": "slashing",
        "name": "bastard sword",
        "hitBonus": 26,
        "traits": [
          "lawful",
          "magical",
          "two-hand d12"
        ]
      },
      {
        "actionCost": "One Action",
        "damageFormula": "1d10+11 plus 1d6 lawful",
        "damageType": "bludgeoning",
        "name": "fist",
        "hitBonus": 23,
        "traits": [
          "agile",
          "lawful",
          "magical"
        ]
      }
    ],
    "rangedAttacks": []
  },
  {
    "url": null,
    "name": "Pleroma",
    "traits": [
      "LN",
      "Large",
      "Aeon",
      "Monitor"
    ],
    "level": 20,
    "perception": 37,
    "alignment": "LN",
    "size": "Medium",
    "skills": {
      "Acrobatics": 33,
      "Arcana": 38,
      "Deception": 34,
      "Diplomacy": 34,
      "Occultism": 38,
      "Religion": 39,
      "Stealth": 35
    },
    "senses": [
      "darkvision",
      "lifesense 120 feet",
      "*true seeing*"
    ],
    "languages": [
      "envisioning"
    ],
    "items": null,
    "description": "Among the most powerful of all the true aeons, pleromas are a manifestation of the duality of creation and destruction. Their physical manifestation is a constant state of flux between these two poles, their forms a shifting cloak of black where galaxies and other celestial objects flit in and out of existence, as if depicting the constant life, death, and rebirth of a miniature, self-contained universe.",
    "automaticAbilities": [
      {
        "name": "Envisioning",
        "description": "Pleromas care little for communication with other creatures, but when they do convey information, they do so wordlessly through a series of psychic projections. This acts as telepathy with a range of  but is understandable to all creatures regardless of whether they have a language, though the aeon’s meaning to non-aeons can be vague and is often mysterious. An aeon can use this ability to communicate flawlessly with any other aeon on the same plane as itself."
      }
    ],
    "proactiveAbilities": [
      {
        "name": "Energy Touch",
        "description": "A pleroma’s touch deals its choice of positive or negative damage, but neither energy can be used to heal a creature."
      },
      {
        "name": "Sphere of Creation",
        "description": "Three times per day, a pleroma can manifest a 2-foot-diameter sphere of white energy that hovers above its left hand. By using a single action, which has the concentrate trait, the pleroma can cause the sphere to fly 10 feet. The sphere can move in any direction, ignoring difficult terrain, but it can’t move farther than 300 feet away from the pleroma. Wherever the sphere travels, it leaves behind a 5-foot-wide path of new matter, creating either new terrain (the pleroma’s choice of normal, difficult, or greater difficult terrain) or a 5-foot-square solid barrier of a single natural substance (such as clay, wood, or stone). The sphere can enter the space of a creature; when it does, the creature must succeed at a DC 43 Fortitude save or be absorbed into the sphere. On a successful save, the creature is pushed to a space of the GM’s choice away from the sphere. Those who fail take 20d6 positive damage (even if they are living) and are pushed away as a success. Those who critically fail, or are reduced to 0 HP by the damage from a failure, become one with the new material and can be restored only via a 10th-level spell. A pleroma can have only one Sphere of Creation in existence at a time, and the sphere automatically vanishes in a flash of blinding light after 1d4 minutes. All creatures within 30 feet of the sphere of creation when it vanishes must succeed at a DC 43 Fortitude save or be permanently blinded."
      },
      {
        "name": "Sphere of Oblivion",
        "description": "Three times per day, a pleroma can manifest a 2-foot-diameter sphere of complete and utter darkness that hovers above its right hand. It can move and control the sphere in the same manner as its Sphere of Creation. The sphere is an empty void that lasts for 1 minute before collapsing in on itself and winking out of existence. Once manifested, the sphere can be used as a ranged attack, but it blinks out of existence immediately after that attack is resolved. Any unattended object that touches the void is sucked in and completely destroyed. Larger objects (such as ships or buildings) are destroyed at a rate of one 10-foot cube per round of contact. The sphere can enter the space of a creature, with effects similar to the Sphere of Creation except that it deals negative damage (even to undead) on a failure and annihilates rather than incorporating the creature into material. Such a destroyed creature can be restored only by a 10th-level spell."
      }
    ],
    "str": 6,
    "dex": 7,
    "con": 6,
    "int": 8,
    "wis": 9,
    "cha": 6,
    "ac": 45,
    "fort": 32,
    "ref": 31,
    "will": 37,
    "savesExtraText": null,
    "hp": 335,
    "immunities": [
      "negative",
      "positive"
    ],
    "weaknesses": null,
    "speed": {
      "Fly": 40
    },
    "resistances": {},
    "spells": [
      {
        "frequency": null,
        "name": "alter reality",
        "level": 10
      },
      {
        "frequency": null,
        "name": "banishment",
        "level": 9
      },
      {
        "frequency": null,
        "name": "blade barrier",
        "level": 9
      },
      {
        "frequency": null,
        "name": "disjunction",
        "level": 9
      },
      {
        "frequency": null,
        "name": "overwhelming presence",
        "level": 9
      },
      {
        "frequency": "x2",
        "name": "disintegrate",
        "level": 8
      },
      {
        "frequency": "x2",
        "name": "unrelenting observation",
        "level": 8
      },
      {
        "frequency": null,
        "name": "plane shift",
        "level": 7
      },
      {
        "frequency": null,
        "name": "retrocognition",
        "level": 7
      },
      {
        "frequency": "at will",
        "name": "creation",
        "level": 5
      },
      {
        "frequency": "at will",
        "name": "create food",
        "level": 4
      },
      {
        "frequency": "at will",
        "name": "shape stone",
        "level": 4
      },
      {
        "frequency": "at will",
        "name": "hypercognition",
        "level": 3
      },
      {
        "frequency": "at will",
        "name": "detect alignment",
        "level": 2
      },
      {
        "frequency": "at will",
        "name": "shape wood",
        "level": 2
      },
      {
        "frequency": "at will",
        "name": "create water",
        "level": 1
      },
      {
        "frequency": "constant",
        "name": "true seeing",
        "level": 8
      },
      {
        "frequency": "constant",
        "name": "freedom of movement",
        "level": 8
      },
      {
        "frequency": "constant",
        "name": "freedom of movement",
        "level": 4
      }
    ],
    "rituals": null,
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "5d8+18 or negative damage plus 1d6 lawful",
        "damageType": "positive",
        "name": "energy touch",
        "hitBonus": null,
        "traits": [
          "agile",
          "lawful",
          "magical"
        ]
      }
    ],
    "rangedAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": null,
        "damageType": null,
        "name": "Sphere of Oblivion",
        "hitBonus": 37,
        "traits": [
          "magical"
        ]
      }
    ]
  },
  {
    "url": null,
    "name": "Cassisian (Archive Angel)",
    "traits": [
      "NG",
      "Tiny",
      "Angel",
      "Celestial"
    ],
    "level": 1,
    "perception": 6,
    "alignment": "NG",
    "size": "Medium",
    "skills": {
      "Acrobatics": 6,
      "Diplomacy": 6,
      "Religion": 6,
      "Stealth": 6
    },
    "senses": [
      "darkvision"
    ],
    "languages": [
      "Celestial",
      "Common",
      "Draconic",
      "Infernal"
    ],
    "items": null,
    "description": "The weakest of angels, cassisians usually serve as lackey messengers for more powerful angels or as spiritual guides for mortals. Despite their limited intellect, cassisians have a knack for precise recollection, particularly with scripture. Most cassisians are formed from the souls of trustworthy mortals, but some arise from fragments of greater angels destroyed in service to the celestial realms.",
    "automaticAbilities": [],
    "proactiveAbilities": [
      {
        "name": "Change Shape",
        "description": "A cassisian can take the appearance of a dove, a winged humanoid, a dog, or a fish. Normally, this doesn’t change its Speed or the attack and damage bonuses for its Strikes, but it might change the damage type Strikes deal (typically to bludgeoning). Any further changes for specific forms are noted below. <ul><li>**Dog** size Small; scent (imprecise) 30 feet, Speed 40 feet; **Melee** jaws +7, Damage 1d6+2 piercing plus Knockdown</li><li>**Fish** swim Speed 30 feet</li></ul>"
      },
      {
        "name": "Eye Beams",
        "description": "The cassisian releases beams of heat or cold from its eyes, dealing 2d6 cold or fire damage (DC 17 basic Reflex save) to all creatures in a 15-foot line. It can’t use Eye Beams again for 1d4 rounds."
      },
      {
        "name": "Repository of Lore",
        "description": "While the cassisian isn't particularly intelligent, it has perfect memory and can remember everything it sears or hears. This allows it to attempt Lore checks on any topic, provided (at the GM's discretion) the cassisian has encountered the topic in question before. The cassisian’s limited intellect often prevents it from acting upon its knowledge, making it a better resource than agent in matters of information use."
      }
    ],
    "str": -1,
    "dex": 1,
    "con": 2,
    "int": -1,
    "wis": 1,
    "cha": 1,
    "ac": 18,
    "fort": 7,
    "ref": 6,
    "will": 4,
    "savesExtraText": null,
    "hp": 20,
    "immunities": [],
    "weaknesses": null,
    "speed": {
      "Fly": 40
    },
    "resistances": {
      "cold": 3,
      "fire": 3
    },
    "spells": [
      {
        "frequency": null,
        "name": "read omens",
        "level": 4
      },
      {
        "frequency": "at will, evil only",
        "name": "detect alignment",
        "level": 1
      },
      {
        "frequency": "at will, evil only",
        "name": "heal",
        "level": 1
      }
    ],
    "rituals": null,
    "meleeAttacks": [
      {
        "actionCost": "One Action",
        "damageFormula": "1d6-1 plus 1d4 good",
        "damageType": "bludgeoning",
        "name": "headbutt",
        "hitBonus": 6,
        "traits": [
          "agile",
          "finesse",
          "good",
          "magical"
        ]
      }
    ],
    "rangedAttacks": []
  }
]; export default entries;