const abilityParser = require('./ability-parser');
const template = require('../universal-abilities/template');

it('parse ability implant core from grikkitog', () => {
  const input = `<b>Implant Core</b> <img class="actiondark" alt="Three Actions" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\ThreeActions.png"><img class="actionlight" alt="Three Actions" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\ThreeActions_I.png"> (<a style="text-decoration:underline" href="Traits.aspx?ID=104">manipulate</a>) The grikkitog implants its core into an adjacent section of earth or stone, melding seamlessly and changing its visual appearance to match the surrounding rock. It's immobilized but automatically succeeds at its Deception check to Impersonate the stone around it; creatures actively searching for it can still attempt Perception checks against its Deception DC as normal. A grikkitog can release its implantation as a free action, which has the manipulate trait. A grikkitog's infestation aura and manifold vision are only active while implanted.`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'Three Actions',
    description: `The grikkitog implants its core into an adjacent section of earth or stone, melding seamlessly and changing its visual appearance to match the surrounding rock. It's immobilized but automatically succeeds at its Deception check to Impersonate the stone around it; creatures actively searching for it can still attempt Perception checks against its Deception DC as normal. A grikkitog can release its implantation as a free action, which has the manipulate trait. A grikkitog's infestation aura and manifold vision are only active while implanted.`,
    name: 'Implant Core',
    raw_description: `**Implant Core** [Three Actions] (__manipulate__) The grikkitog implants its core into an adjacent section of earth or stone, melding seamlessly and changing its visual appearance to match the surrounding rock. It's immobilized but automatically succeeds at its Deception check to Impersonate the stone around it; creatures actively searching for it can still attempt Perception checks against its Deception DC as normal. A grikkitog can release its implantation as a free action, which has the manipulate trait. A grikkitog's infestation aura and manifold vision are only active while implanted.`,
    traits: ['manipulate'],
  });
});

it('parse ability manifold vision from grikkitog', () => {
  const input = `<b>Manifold Vision</b> While its core is implanted, the grikkitog can see through the eyes it creates throughout the area of its infestation aura, gaining the benefits of all-around vision.`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'None',
    description: 'While its core is implanted, the grikkitog can see through the eyes it creates throughout the area of its infestation aura, gaining the benefits of all-around vision.',
    name: 'Manifold Vision',
    raw_description: `**Manifold Vision** While its core is implanted, the grikkitog can see through the eyes it creates throughout the area of its infestation aura, gaining the benefits of all-around vision.`,
  });
});

it('parse ability aura of corruption from treerazer', () => {
  const input = `<b>Aura of Corruption</b> (<a style="text-decoration:underline" href="Traits.aspx?ID=206">aura</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=125">plant</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=134">primal</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=157">transmutation</a>) 120 feet. Plants near Treerazer twist, deform, and transform into thorny or fungoid parodies of their natural shapes. A living creature in this area must succeed at a DC 47 Fortitude save each round or become partially transformed into plantlike matter. Those who fail this saving throw are treated as if they were plants for the purposes of any effect that particularly harms or inconveniences plant creatures more than other creatures, but do not gain any benefits of being plant creatures. This effect lasts as long as the creature remains within the area of corruption and for 1 minute thereafter.`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'None',
    description: 'Plants near Treerazer twist, deform, and transform into thorny or fungoid parodies of their natural shapes. A living creature in this area must succeed at a DC 47 Fortitude save each round or become partially transformed into plantlike matter. Those who fail this saving throw are treated as if they were plants for the purposes of any effect that particularly harms or inconveniences plant creatures more than other creatures, but do not gain any benefits of being plant creatures. This effect lasts as long as the creature remains within the area of corruption and for 1 minute thereafter.',
    name: 'Aura of Corruption',
    range: '120 feet',
    raw_description: `**Aura of Corruption** (__aura__, __plant__, __primal__, __transmutation__) 120 feet. Plants near Treerazer twist, deform, and transform into thorny or fungoid parodies of their natural shapes. A living creature in this area must succeed at a DC 47 Fortitude save each round or become partially transformed into plantlike matter. Those who fail this saving throw are treated as if they were plants for the purposes of any effect that particularly harms or inconveniences plant creatures more than other creatures, but do not gain any benefits of being plant creatures. This effect lasts as long as the creature remains within the area of corruption and for 1 minute thereafter.`,
    traits: ['aura','plant','primal','transmutation'],
  });
});

it('parse ability attack of opportunity from treerazer', () => {
  const input = `<b>Attack of Opportunity</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'Reaction',
    effect: `You lash out at a foe that leaves an opening. Make a melee Strike against the triggering creature. If your attack is a critical hit and the trigger was a manipulate action, you disrupt that action. This Strike doesn't count toward your multiple attack penalty, and your multiple attack penalty doesn't apply to this Strike.`,
    name: 'Attack of Opportunity',
    raw_description: `**Attack of Opportunity** [Reaction] **Trigger** A creature within your reach uses a manipulate action or a move action, makes a ranged attack, or leaves a square during a move action it's using. **Effect** You lash out at a foe that leaves an opening. Make a melee Strike against the triggering creature. If your attack is a critical hit and the trigger was a manipulate action, you disrupt that action. This Strike doesn't count toward your multiple attack penalty, and your multiple attack penalty doesn't apply to this Strike.`,
    trigger: `A creature within your reach uses a manipulate action or a move action, makes a ranged attack, or leaves a square during a move action it's using.`,
  });
});

it('parse ability defoliation from treerazer', () => {
  const input = `<b>Defoliation</b> <img class="actiondark" alt="Two Actions" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\TwoActions.png"><img class="actionlight" alt="Two Actions" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\TwoActions_I.png">  (<a href="Traits.aspx?ID=134"><u>primal</a></u>, <a href="Traits.aspx?ID=117"><u>necromancy</a></u>, <a href="Traits.aspx?ID=125"><u>plant</a></u>) Treerazer exudes a pulse of sickly green light in a 30-foot-radius emanation. All plants in the area (including creatures under the effect of his aura of corruption) blacken and wither. Non-creature plants immediately wither and die. Plant creatures take 20d8 negative damage with a DC 49 basic Fortitude save. A creature that fails its save is doomed 1 for 1 minute and sickened 3. Treerazer can choose to exclude any number of plants in the area from this effect, and generally does so to preserve twisted and corrupted plants or fungi, or plant creatures that are allied to his cause. Treerazer can't use Defoliation for 1d4 rounds.</span>`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'Two Actions',
    description: `Treerazer exudes a pulse of sickly green light in a 30-foot-radius emanation. All plants in the area (including creatures under the effect of his aura of corruption) blacken and wither. Non-creature plants immediately wither and die. Plant creatures take 20d8 negative damage with a DC 49 basic Fortitude save. A creature that fails its save is doomed 1 for 1 minute and sickened 3. Treerazer can choose to exclude any number of plants in the area from this effect, and generally does so to preserve twisted and corrupted plants or fungi, or plant creatures that are allied to his cause. Treerazer can't use Defoliation for 1d4 rounds.`,
    name: 'Defoliation',
    raw_description: `**Defoliation** [Two Actions]  (__primal__, __necromancy__, __plant__) Treerazer exudes a pulse of sickly green light in a 30-foot-radius emanation. All plants in the area (including creatures under the effect of his aura of corruption) blacken and wither. Non-creature plants immediately wither and die. Plant creatures take 20d8 negative damage with a DC 49 basic Fortitude save. A creature that fails its save is doomed 1 for 1 minute and sickened 3. Treerazer can choose to exclude any number of plants in the area from this effect, and generally does so to preserve twisted and corrupted plants or fungi, or plant creatures that are allied to his cause. Treerazer can't use Defoliation for 1d4 rounds.`,
    traits: ['primal', 'necromancy', 'plant'],
  });
});

it('parse ability dispelling strike from treerazer', () => {
  const input = `<b>Dispelling Strike</b> <img class="actiondark" alt="Free Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\FreeAction.png"><img class="actionlight" alt="Free Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\FreeAction_I.png">  (<a href="Traits.aspx?ID=2"><u>abjuration</a></u>, <a href="Traits.aspx?ID=134"><u>primal</a></u>) <b>Frequency</b> once per round; <b>Trigger</b> Treerazer hits a creature, object, or spell effect with a weapon Strike or a defoliation attack. <b>Effect</b> Treerazer casts his innate dispel magic, targeting the creature he hit with his Strike or one spell affecting that creature.</span>`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'Free Action',
    effect: `Treerazer casts his innate dispel magic, targeting the creature he hit with his Strike or one spell affecting that creature.`,
    frequency: `once per round`,
    name: 'Dispelling Strike',
    raw_description: `**Dispelling Strike** [Free Action]  (__abjuration__, __primal__) **Frequency** once per round; **Trigger** Treerazer hits a creature, object, or spell effect with a weapon Strike or a defoliation attack. **Effect** Treerazer casts his innate dispel magic, targeting the creature he hit with his Strike or one spell affecting that creature.`,
    traits: ['abjuration', 'primal'],
    trigger: `Treerazer hits a creature, object, or spell effect with a weapon Strike or a defoliation attack.`,
  });
});

it('parse ability staggering strike from treerazer', () => {
  const input = `<b>Staggering Strike</b> When Treerazer scores a critical hit with a melee attack, the target is stunned 2.</span>`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'None',
    description: `When Treerazer scores a critical hit with a melee attack, the target is stunned 2.`,
    name: 'Staggering Strike',
    raw_description: `**Staggering Strike** When Treerazer scores a critical hit with a melee attack, the target is stunned 2.`,
  });
});

it('parse ability attack of opportunity from aapoph serpentfolk', () => {
  const input = `<b><a style="text-decoration:underline" href="MonsterAbilities.aspx?ID=3">Attack of Opportunity</a> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"></b> `;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'Reaction',
    effect: `You lash out at a foe that leaves an opening. Make a melee Strike against the triggering creature. If your attack is a critical hit and the trigger was a manipulate action, you disrupt that action. This Strike doesn't count toward your multiple attack penalty, and your multiple attack penalty doesn't apply to this Strike.`,
    name: 'Attack of Opportunity',
    raw_description: `**Attack of Opportunity** [Reaction] **Trigger** A creature within your reach uses a manipulate action or a move action, makes a ranged attack, or leaves a square during a move action it's using. **Effect** You lash out at a foe that leaves an opening. Make a melee Strike against the triggering creature. If your attack is a critical hit and the trigger was a manipulate action, you disrupt that action. This Strike doesn't count toward your multiple attack penalty, and your multiple attack penalty doesn't apply to this Strike.`,
    trigger: `A creature within your reach uses a manipulate action or a move action, makes a ranged attack, or leaves a square during a move action it's using.`,
  });
});

it('parse ability serpentfolk venom from aapoph serpentfolk', () => {
  const input = `<b>Serpentfolk Venom</b> (<a href="Traits.aspx?ID=126"><u>poison</a></u>) <b>Saving Throw</b> DC 20 Fortitude; <b>Maximum Duration</b> 6 rounds; <b>Stage 1</b> 1d4 poison damage and <a style="text-decoration:underline" href="Conditions.aspx?ID=13">enfeebled 1</a> (1 round); <b>Stage 2</b> 2d4 poison damage and enfeebled 1 (1 round)</span>`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'None',
    name: 'Serpentfolk Venom',
    raw_description: `**Serpentfolk Venom** (__poison__) **Saving Throw** DC 20 Fortitude; **Maximum Duration** 6 rounds; **Stage 1** 1d4 poison damage and __enfeebled 1__ (1 round); **Stage 2** 2d4 poison damage and enfeebled 1 (1 round)`,
    traits: ['poison'],
    saving_throw: 'DC 20 Fortitude',
    maximum_duration: '6 rounds',
    stages: [
      { effect: '1d4 poison damage and __enfeebled 1__ (1 round)' },
      { effect: '2d4 poison damage and enfeebled 1 (1 round)' },
    ],
  });
});

it('parse ability glimpse of redemption from aasimar redeemer', () => {
  const input = `<b>Glimpse of Redemption</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"> <b>Trigger</b> An enemy damages one of the angelkin's allies. Both the enemy and ally must be within 15 feet of the angelkin. <b>Effect</b> The angelkin causes its foe to hesitate under the weight of its sins as visions of possible redemption play out in its mind's eye. The foe chooses one of two options: <ul><li>The ally is completely unharmed by the triggering damage.</li> <li>The ally gains resistance 7 to all damage against the triggering damage. After the damaging effect resolves, the enemy becomes enfeebled 2 until the end of its next turn.</li></ul> `;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'Reaction',
    effect: `The angelkin causes its foe to hesitate under the weight of its sins as visions of possible redemption play out in its mind's eye. The foe chooses one of two options:\n\n  * The ally is completely unharmed by the triggering damage.\n\n  * The ally gains resistance 7 to all damage against the triggering damage. After the damaging effect resolves, the enemy becomes enfeebled 2 until the end of its next turn.`,
    name: 'Glimpse of Redemption',
    raw_description: `**Glimpse of Redemption** [Reaction] **Trigger** An enemy damages one of the angelkin's allies. Both the enemy and ally must be within 15 feet of the angelkin. **Effect** The angelkin causes its foe to hesitate under the weight of its sins as visions of possible redemption play out in its mind's eye. The foe chooses one of two options:\n\n  * The ally is completely unharmed by the triggering damage.\n\n  * The ally gains resistance 7 to all damage against the triggering damage. After the damaging effect resolves, the enemy becomes enfeebled 2 until the end of its next turn.`,
    trigger: `An enemy damages one of the angelkin's allies. Both the enemy and ally must be within 15 feet of the angelkin.`,
  });
});

it('parse ability shield block from aasimar redeemer', () => {
  const input = `<b>Shield Block</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'Reaction',
    effect: `You snap your shield in place to ward off a blow. Your shield prevents you from taking an amount of damage up to the shield's Hardness. You and the shield each take any remaining damage, possibly breaking or destroying the shield.`,
    name: 'Shield Block',
    raw_description: `**Shield Block** [Reaction] **Trigger** While you have your shield raised, you would take damage from a physical attack. **Effect** You snap your shield in place to ward off a blow. Your shield prevents you from taking an amount of damage up to the shield's Hardness. You and the shield each take any remaining damage, possibly breaking or destroying the shield.`,
    trigger: `While you have your shield raised, you would take damage from a physical attack.`,
  });
});

it('parse ability inexorable march from adamantine golem', () => {
  const input = `<b>Inexorable March</b> <img class="actiondark" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction.png"><img class="actionlight" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction_I.png">  The adamantine golem Strides up to its Speed, pushing back each creature whose space it moves into and damaging them if they try to stop its movement. A creature can try to bar the way by attempting a DC 45 Fortitude save.<br /> <b>Critical Success</b> The creature takes no damage and its armor takes no damage.<br /> <b>Success</b> The golem halts its movement and cannot enter the creature's square.<br /> <b>Failure</b> The resisting creature is damaged and its armor takes damage as if hit by the adamantine golem's fist.</span>`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'One Action',
    description: 'The adamantine golem Strides up to its Speed, pushing back each creature whose space it moves into and damaging them if they try to stop its movement. A creature can try to bar the way by attempting a DC 45 Fortitude save.',
    name: 'Inexorable March',
    raw_description: `**Inexorable March** [One Action]  The adamantine golem Strides up to its Speed, pushing back each creature whose space it moves into and damaging them if they try to stop its movement. A creature can try to bar the way by attempting a DC 45 Fortitude save.\n\n**Critical Success** The creature takes no damage and its armor takes no damage.\n\n**Success** The golem halts its movement and cannot enter the creature's square.\n\n**Failure** The resisting creature is damaged and its armor takes damage as if hit by the adamantine golem's fist.`,
    critical_success: 'The creature takes no damage and its armor takes no damage.',
    success: `The golem halts its movement and cannot enter the creature's square.`,
    failure: `The resisting creature is damaged and its armor takes damage as if hit by the adamantine golem's fist.`,
  });
});


it('parse ability frightful presence from adult bronze dragon', () => {
  const input = `<b>Frightful Presence</b> (<a style="text-decoration:underline" href="Traits.aspx?ID=206">aura</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=60">emotion</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=68">fear</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=106">mental</a>) 90 feet, DC 31`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'None',
    description: `A creature that first enters the area must attempt a Will save. Regardless of the result of the saving throw, the creature is temporarily immune to this monster's Frightful Presence for 1 minute.`,
    name: 'Frightful Presence',
    range: '90 feet',
    saving_throw: 'DC 31',
    raw_description: `**Frightful Presence** A creature that first enters the area must attempt a Will save. Regardless of the result of the saving throw, the creature is temporarily immune to this monster's Frightful Presence for 1 minute.\n\n**Critical Success** The creature is unaffected by the presence.\n\n**Success** The creature is __frightened 1__.\n\n**Failure** The creature is __frightened 2__.\n\n**Critical Failure** The creature is __frightened 4__.`,
    critical_success: 'The creature is unaffected by the presence.',
    success: `The creature is __frightened 1__.`,
    failure: `The creature is __frightened 2__.`,
    critical_failure: 'The creature is __frightened 4__.',
    traits: ['aura','emotion','fear','mental'],
  });
});

it('parse ability breath weapon from adult bronze dragon', () => {
  const input = `<b>Breath Weapon </b> <img class="actiondark" alt="Two Actions" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\TwoActions.png"><img class="actionlight" alt="Two Actions" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\TwoActions_I.png">  The bronze dragon breathes in one of two ways. The dragon can't use Breath Weapon again for 1d4 rounds.<ul><li><b>Lightning</b> (<a style="text-decoration:underline" href="Traits.aspx?ID=11">arcane</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=56">electricity</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=65">evocation</a>); The dragon breathes lightning in a 80-foot line that deals 8d12 electricity damage (DC 33 basic Reflex save).</li><li><b>Repulsion Gas</b> (<a style="text-decoration:underline" href="Traits.aspx?ID=2">abjuration</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=11">arcane</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=93">incapacitation</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=106">mental</a>); The dragon breathes a 80-foot line of repulsive gas. Each creature in the area must succeed at a DC 33 Will save or become <a style="text-decoration:underline" href="Conditions.aspx?ID=17">fleeing</a> from the dragon for 1 round (or 2 rounds on a critical failure).</li></ul></span>`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'Two Actions',
    description: `The bronze dragon breathes in one of two ways. The dragon can't use Breath Weapon again for 1d4 rounds.\n\n  * **Lightning** (__arcane__, __electricity__, __evocation__); The dragon breathes lightning in a 80-foot line that deals 8d12 electricity damage (DC 33 basic Reflex save).\n\n  * **Repulsion Gas** (__abjuration__, __arcane__, __incapacitation__, __mental__); The dragon breathes a 80-foot line of repulsive gas. Each creature in the area must succeed at a DC 33 Will save or become __fleeing__ from the dragon for 1 round (or 2 rounds on a critical failure).`,
    name: 'Breath Weapon',
    raw_description: `**Breath Weapon ** [Two Actions]  The bronze dragon breathes in one of two ways. The dragon can't use Breath Weapon again for 1d4 rounds.\n\n  * **Lightning** (__arcane__, __electricity__, __evocation__); The dragon breathes lightning in a 80-foot line that deals 8d12 electricity damage (DC 33 basic Reflex save).\n\n  * **Repulsion Gas** (__abjuration__, __arcane__, __incapacitation__, __mental__); The dragon breathes a 80-foot line of repulsive gas. Each creature in the area must succeed at a DC 33 Will save or become __fleeing__ from the dragon for 1 round (or 2 rounds on a critical failure).`,
  });
});

it('parse ability tail drag from ahuizotl', () => {
  const input = `<b>Tail Drag</b> <img class="actiondark" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction.png"><img class="actionlight" alt="Single Action" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\OneAction_I.png">  <b>Requirements </b>The ahuizotl has a Medium or smaller creature grabbed with its tail claw; <b>Effect </b>The ahuizotl attempts an <a style="text-decoration:underline" href="Skills.aspx?ID=3">Athletics</a> check against the creature's Fortitude DC. <br /><b>Critical Success </b>If the creature is 10 feet away from the ahuizotl, it is dragged into a square adjacent to the ahuizotl. The ahuizotl can make a jaws Strike against the creature. <br /><b>Success </b>If the creature is 10 feet away from the ahuizotl, it is dragged into a square adjacent to the ahuizotl. <br /><b>Failure </b>The creature is not dragged. <br /><b>Critical Failure</b> The creature is not dragged and the ahuizotl no longer has the creature grabbed.</span>`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    action_cost: 'One Action',
    description: null,
    name: 'Tail Drag',
    raw_description: `**Tail Drag** [One Action]  **Requirements **The ahuizotl has a Medium or smaller creature grabbed with its tail claw; **Effect **The ahuizotl attempts an __Athletics__ check against the creature's Fortitude DC.\n\n**Critical Success **If the creature is 10 feet away from the ahuizotl, it is dragged into a square adjacent to the ahuizotl. The ahuizotl can make a jaws Strike against the creature.\n\n**Success **If the creature is 10 feet away from the ahuizotl, it is dragged into a square adjacent to the ahuizotl.\n\n**Failure **The creature is not dragged.\n\n**Critical Failure** The creature is not dragged and the ahuizotl no longer has the creature grabbed.`,
    requirements: 'The ahuizotl has a Medium or smaller creature grabbed with its tail claw',
    effect: `The ahuizotl attempts an __Athletics__ check against the creature's Fortitude DC.`,
    critical_success: 'If the creature is 10 feet away from the ahuizotl, it is dragged into a square adjacent to the ahuizotl. The ahuizotl can make a jaws Strike against the creature.',
    success: 'If the creature is 10 feet away from the ahuizotl, it is dragged into a square adjacent to the ahuizotl.',
    failure: 'The creature is not dragged.',
    critical_failure: 'The creature is not dragged and the ahuizotl no longer has the creature grabbed.',
  });
});

it('parse ability curse of the werewolf from werewolf', () => {
  const input = `<b>Curse of the Werewolf</b> (<a href="Traits.aspx?ID=38"><u>curse</a></u>, <a href="Traits.aspx?ID=117"><u>necromancy</a></u>, <a href="Traits.aspx?ID=134"><u>primal</a></u>) This curse affects only humanoids. <b>Saving Throw</b> DC 19 Fortitude save. On each full moon, the cursed creature must succeed at another Fortitude save or turn into a werewolf until dawn. The creature is under the GM's control and goes on a rampage for half the night before falling unconscious until dawn.`;

  const fields = abilityParser(input);

  expect(fields).toEqual({
    ...template,
    description: 'This curse affects only humanoids.',
    name: 'Curse of the Werewolf',
    raw_description: `**Curse of the Werewolf** (__curse__, __necromancy__, __primal__) This curse affects only humanoids. **Saving Throw** DC 19 Fortitude save. On each full moon, the cursed creature must succeed at another Fortitude save or turn into a werewolf until dawn. The creature is under the GM's control and goes on a rampage for half the night before falling unconscious until dawn.`,
    traits: ['curse','necromancy','primal'],
    saving_throw: `DC 19 Fortitude save. On each full moon, the cursed creature must succeed at another Fortitude save or turn into a werewolf until dawn. The creature is under the GM's control and goes on a rampage for half the night before falling unconscious until dawn.`
  });
});