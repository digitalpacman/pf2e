import trim from 'trim';

export const fromPF2Tools = (o) => {
  const t = {};
  t.name = o.name;
  const traits = split(o.traits) || [];
  if (t.type) {
    traits.push(t.type);
  }
  t.traits = traits;
  t.level = o.level;
  t.automatic_abilities = o.specials?.filter(x => x.type === 'defense')
    ?.map(fromAbility);
  t.proactive_abilities = o.specials?.filter(x => x.type === 'offense')
    ?.map(fromAbility);
  t.sense_abilities = o.specials?.filter(x => x.type === 'general')
    ?.map(fromAbility);

  t.alignment = o.alignment?.toUpperCase();
  t.size = o.size;
  t.description = o.description;

  t.ability_mods = {};
  t.ability_mods.str_mod = parseInt(o.strength?.value) || 0;
  t.ability_mods.dex_mod = parseInt(o.dexterity?.value) || 0;
  t.ability_mods.con_mod = parseInt(o.constitution?.value) || 0;
  t.ability_mods.int_mod = parseInt(o.intelligence?.value) || 0;
  t.ability_mods.wis_mod = parseInt(o.wisdom?.value) || 0;
  t.ability_mods.cha_mod = parseInt(o.charisma?.value) || 0;

  t.ac = o.ac?.value || 10;
  if (o.ac?.note) {
    t.ac_special = [
      { desc: o.ac.note }
    ];
  }

  t.hp = o.hp?.value || 0;
  t.hp_misc = o.hp?.note;

  t.saves = {};
  t.saves.fort = parseInt(o.fortitude?.value) || 0;
  t.saves.fort_misc = parseInt(o.fortitude?.note);
  t.saves.ref = parseInt(o.reflex?.value) || 0;
  t.saves.ref_misc = parseInt(o.reflex?.note);
  t.saves.will = parseInt(o.will?.value) || 0;
  t.saves.will_misc = parseInt(o.will?.note);
  t.saves.misc = o.savenote;

  t.immunities = split(o.immunity?.value);
  t.resistances = split(o.resistance?.value)?.map(fromTypeWithValue);
  t.weaknesses = split(o.weakness?.value)?.map(fromTypeWithValue);

  t.melee = o.strikes?.filter(x => x.type === 'Melee').map(fromStrike);
  t.ranged = o.strikes?.filter(x => x.type === 'Ranged').map(fromStrike);
  t.skills = fromSkills(o);
  t.speed = fromSpeed(o.speed);

  t.items = split(o.items);

  t.perception = parseInt(o.perception?.value);
  t.senses = split(o.perception?.note)?.concat(`Perception +${t.perception}`);

  const baseSpells = fromSpells(o);
  if (baseSpells.spell_groups) {
    t.spell_lists = baseSpells.concat(o.morespells?.map(fromSpells));
  }

  return t;
};

export const fromSpells = (o) => {
  const t = {};
  t.dc = parseInt(o.spelldc?.value);
  t.misc = o.spelldc?.note;
  t.name = o.spelltype || o.name;
  t.to_hit = parseInt(o.spellattack?.value) || undefined;

  const groups = o.spells?.map((x, i) => ({
    level: 10 - i,
    spells: split(x),
  }))?.filter(x => x.spells);

  t.spell_groups = groups?.map(x => ({
    level: x.level,
    heightened_level: x.level === 0 ? o.cantriplevel || 0 : undefined,
    spells: x.spells.map(s => ({
      name: s,
    }))
  }));
  return t;
};

export const fromSpeed = (s) => {
  if (!s) {
    return [];
  }

  const speed = split(s)?.map(fromTypeWithValue);
  if (speed.filter(x => !x.type).length === 1) {
    speed.find(x => !x.type).type = 'Land';
  }
  return speed;
};

export const fromSkills = (o) => {
  const skillMap = {
    acrobatics: 'Acrobatics',
    arcana: 'Arcana',
    athletics: 'Athletics',
    crafting: 'Crafting',
    deception: 'Deception',
    diplomacy: 'Diplomacy',
    intimidation: 'Intimidation',
    medicine: 'Medicine',
    nature: 'Nature',
    occultism: 'Occultism',
    performance: 'Performance',
    religion: 'Religion',
    society: 'Society',
    stealth: 'Stealth',
    survival: 'Survival',
    thievery: 'Thievery',
    lore: 'Lore',
    lorealt: 'Lore',
  };

  const skills = [];
  for (let p of Object.entries(skillMap)) {
    const prop = p[0];
    const name = o[prop]?.name ? o[prop]?.name : p[1];

    const bonus = parseInt(o[prop]?.value);
    if (bonus > 0) {
      const misc = o[prop]?.note;
      skills.push({ name, bonus, misc });
    }
  }

  return skills;
};

export const fromTypeWithValue = (s) => {
  const parts = s.split(' ');
  let type = '';
  let amount;
  for (let p of parts) {
    if (amount !== undefined ||  isNaN(parseInt(p))) {
      type += ' ' + p;
    } else {
      amount = parseInt(p);
    }
  }

  type = trim(type);
  if (type.length === 0) {
    type = undefined;
  }
  return { type, amount };
};

export const fromStrike = (o) => {
  const t = {};
  t.action_cost = 'One Action';
  const damage = fromDamage(o.damage);
  t.damage = { formula: damage.formula, type: damage.type };
  t.plus_damage = damage.plusDamage;
  t.to_hit = parseInt(o.attack) || 0;
  t.traits = split(o.traits);
  return t;
};

export const fromPlusDamage = (s) => {
  const parts = split(s);
  for (let i = 0; i < parts.length; ++i) {
    if (parts[i].substr(0, 4) === 'and ') {
      parts[i] = parts[i].substr(4);
    }
  }

  const plusDamage = parts.map(fromDamage);
  return plusDamage;
};

export const fromDamage = (s) => {
  const parts = s.split(' ');
  let formula = '';
  let type = '';
  let plusDamage;
  for (let i = 0; i < parts.length; ++i) {
    if (parts[i].length === 0) {
      continue;
    }

    if (parts[i] === 'plus') {
      const leftOver = parts.slice(i + 1).join(' ');
      plusDamage = fromPlusDamage(leftOver);
      break;
    }

    if (parseInt(parts[i])) {
      formula = parts[i];
    } else {
      type += ' ' + parts[i];
    }
  }

  formula = trim(formula);
  type = trim(type);
  return { formula, type, plusDamage };
};

export const fromDescription = (s) => {
  const comps = components(s);
  const t = {};
  const componentParts = [
    { prop: 'requirements', name: 'Requirements' },
    { prop: 'trigger', name: 'Trigger' },
    { prop: 'effect', name: 'Effect' },
    { prop: 'frequency', name: 'Frequency' },
    { prop: 'critical_success', name: 'Critical Success' },
    { prop: 'success', name: 'Success' },
    { prop: 'failure', name: 'Failure' },
    { prop: 'critical_failure', name: 'Critical Failure' },
  ];

  for (let part of componentParts) {
    t[part.prop] = comps.filter(x => x.name === part.name).map(x => x.desc).shift();
  }

  const descIndex = lowestIndexOf(s, componentParts.map(x => `**${x.name}**`));
  const desc = descIndex === -1 ? s : s.substring(0, descIndex);
  t.description = desc.length === 0 ? undefined : trim(desc);

  return t;
};

export const lowestIndexOf = (s, needles) => {
  let lowest = -1;
  for (let i = 0; i < needles.length; ++i) {
    const index = s.indexOf(needles[i]);
    if (index === -1) {
      continue;
    }

    if (index < lowest || lowest === -1) {
      lowest = index;
    }
  }

  return lowest;
};

export const components = (s) => {
  const parts = [];
  let readingName = false;
  let shouldAdd = false;
  let desc = '';
  let name = '';
  let capture = false;
  for (let i = 0; i < s.length; ++i) {
    shouldAdd = false;
    if (s[i] === '*' && i + 1 < s.length && s[i + 1] === '*') {
      readingName = !readingName;
      shouldAdd = true;
      ++i;
      capture = true;
    } else if (!capture) {
      continue;
    } else if (readingName) {
      name += s[i];
    } else {
      desc += s[i];
    }

    if (i + 1 === s.length) {
      shouldAdd = true;
    }

    if (shouldAdd && name.length > 0 && desc.length > 0) {
      name = trim(name);
      desc = trim(desc);
      parts.push({ name, desc });
      name = '';
      desc = '';
    }
  }

  return parts;
};

export const fromAbility = (o) => {
  const t = {};
  t.name = o.name;
  t.traits = split(o.traits);

  const desc = fromDescription(o.description);
  t.requirements = desc.requirements;
  t.trigger = desc.trigger;
  t.effect = desc.effect;
  t.frequency = desc.frequency;
  t.description = desc.description;
  t.critical_success = desc.critical_success;
  t.success = desc.success;
  t.failure = desc.failure;
  t.critical_failure = desc.critical_failure;

  t.action_cost = fromAction(o.actions);

  return t;
};

export const fromAction = (s) => {
  switch (s) {
    case 'one': return 'One Action';
    case 'two': return 'Two Actions';
    case 'three': return 'Three Actions';
    case 'reaction': return 'Reaction';
    case 'free': return 'Free';
  }

  return null;
};

export const split = (s) => {
  if (!s) return null;

  const parts = [];

  let parens = false;
  let part = '';
  for (let i = 0; i < s.length; ++i) {
    if (s[i] === '(') {
      part += '(';
      parens = true;
    } else if (s[i] === ')') {
      part += ')';
      parens = false;
    } else if (!parens && (s[i] === ',' || s[i] === ';')) {
      parts.push(part);
      part = '';
    } else {
      part += s[i];
    }
  }

  if (part !== '') {
    parts.push(trim(part));
  }

  return parts;
};