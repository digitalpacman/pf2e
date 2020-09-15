const armorClassParser = require('./armor-class-parser');

it('parse armor class from aasimar redeemer', () => {
  const input = `<b>AC</b> 23 (25 with shield raised); <b>Fort</b> +12, <b>Ref</b> +8, <b>Will</b> +11; +1 status to all saves vs. disease (against diseases, critical failures become failures)<br /><b>HP</b> 73<br /><b>Divine Grace</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"> <b>Trigger</b> The angelkin is targeted by a spell that allows a saving throw. <b>Effect</b> The scion gains a +2 circumstance bonus to the saving throw.<br /> <b>Glimpse of Redemption</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"> <b>Trigger</b> An enemy damages one of the angelkin's allies. Both the enemy and ally must be within 15 feet of the angelkin. <b>Effect</b> The angelkin causes its foe to hesitate under the weight of its sins as visions of possible redemption play out in its mind's eye. The foe chooses one of two options: <ul><li>The ally is completely unharmed by the triggering damage.</li> <li>The ally gains resistance 7 to all damage against the triggering damage. After the damaging effect resolves, the enemy becomes enfeebled 2 until the end of its next turn.</li></ul> <b>Shield Block</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;
  const fields = armorClassParser(input);

  expect(fields).toEqual({
    ac: 23,
    ac_special: [
      { descr: '25 with shield raised' }
    ]
  });
});

it('parse armor class from werewolf', () => {
  const input = `<b>AC</b> 19; <b>Fort</b> +11, <b>Ref</b> +9, <b>Will</b> +7<br /><b>HP</b> 63; <b>Weaknesses</b> silver 5<br /><b>Attack of Opportunity</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;
  const fields = armorClassParser(input);

  expect(fields).toEqual({
    ac: 19,
    ac_special: null,
  });
});

it('parse armor class from duskwalker ghost hunter', () => {
  const input = `<b>AC</b> 21 (22 against prey; see Hunt Prey); <b>Fort</b> +9, <b>Ref</b> +12, <b>Will</b> +10; +1 status to all saves vs. death effects<br /><b>HP</b> 56; <b>Immunities</b> effects that would transform their body or soul to an undead; <b>Resistances</b> negative energy 2`;
  const fields = armorClassParser(input);

  expect(fields).toEqual({
    ac: 21,
    ac_special: [
      { descr: '22 against prey' },
      { descr: 'see Hunt Prey' },
    ],
  });
});