import trim from 'trim';

export const fromPF2Tools = (o) => {
  const t = {};
  t.name = o.name;
  t.traits = split(o.traits);
  t.level = o.level;
  t.automatic_abilities = o.specials.filter(x => x.type === 'defense')
    .map(fromAbility);
  t.proactive_abilities = o.specials.filter(x => x.type === 'offense')
    .map(fromAbility);
  t.sense_abilities = o.specials.filter(x => x.type === 'general')
    .map(fromAbility);
  
  return t;
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
  t.description = trim(desc);

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
    } else if (!parens && s[i] === ',') {
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