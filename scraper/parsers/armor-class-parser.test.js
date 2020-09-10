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