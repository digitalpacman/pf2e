const template = require('./template');

module.exports = {
  ...template,
  action_cost: 'Reaction',
  effect: `You snap your shield in place to ward off a blow. Your shield prevents you from taking an amount of damage up to the shield's Hardness. You and the shield each take any remaining damage, possibly breaking or destroying the shield.`,
  name: 'Shield Block',
  raw_description: `**Shield Block** [Reaction] **Trigger** While you have your shield raised, you would take damage from a physical attack. **Effect** You snap your shield in place to ward off a blow. Your shield prevents you from taking an amount of damage up to the shield's Hardness. You and the shield each take any remaining damage, possibly breaking or destroying the shield.`,
  trigger: `While you have your shield raised, you would take damage from a physical attack.`,
};