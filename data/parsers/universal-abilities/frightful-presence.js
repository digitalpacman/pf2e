module.exports = {
  action_cost: 'None',
  description: `A creature that first enters the area must attempt a Will save. Regardless of the result of the saving throw, the creature is temporarily immune to this monster's Frightful Presence for 1 minute.`,
  name: 'Frightful Presence',
  raw_description: `**Frightful Presence** A creature that first enters the area must attempt a Will save. Regardless of the result of the saving throw, the creature is temporarily immune to this monster's Frightful Presence for 1 minute.\n\n**Critical Success** The creature is unaffected by the presence.\n\n**Success** The creature is __frightened 1__.\n\n**Failure** The creature is __frightened 2__.\n\n**Critical Failure** The creature is __frightened 4__.`,
  traits: ['aura', 'emotion', 'fear', 'mental'],
  critical_success: 'The creature is unaffected by the presence.',
  success: `The creature is __frightened 1__.`,
  failure: `The creature is __frightened 2__.`,
  critical_failure: 'The creature is __frightened 4__.',
};