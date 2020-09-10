const savesParser = require('./saves-parser');

it('parse saves from aasimar redeemer', () => {
  const input = `<b>AC</b> 23 (25 with shield raised); <b>Fort</b> +12, <b>Ref</b> +8, <b>Will</b> +11; +1 status to all saves vs. disease (against diseases, critical failures become failures)<br /><b>HP</b> 73<br /><b>Divine Grace</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"> <b>Trigger</b> The angelkin is targeted by a spell that allows a saving throw. <b>Effect</b> The scion gains a +2 circumstance bonus to the saving throw.<br /> <b>Glimpse of Redemption</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"> <b>Trigger</b> An enemy damages one of the angelkin's allies. Both the enemy and ally must be within 15 feet of the angelkin. <b>Effect</b> The angelkin causes its foe to hesitate under the weight of its sins as visions of possible redemption play out in its mind's eye. The foe chooses one of two options: <ul><li>The ally is completely unharmed by the triggering damage.</li> <li>The ally gains resistance 7 to all damage against the triggering damage. After the damaging effect resolves, the enemy becomes enfeebled 2 until the end of its next turn.</li></ul> <b>Shield Block</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;
  const fields = savesParser(input);

  expect(fields.saves).toEqual({
    fort: 12,
    fort_misc: null,
    misc: '+1 status to all saves vs. disease (against diseases, critical failures become failures)',
    ref: 8,
    ref_misc: null,
    will: 11,
    will_misc: null,
  });
});

it('parse saves from aapoph serpentfolk', () => {
  const input = `<b>AC</b> 18; <b>Fort</b> +10, <b>Ref</b> +7, <b>Will</b> +6 (+2 status vs. <a style="text-decoration:underline" href="Traits.aspx?ID=106">mental</a>)<br /><b>HP</b> 60; <b>Resistances</b> poison 5<br /><b><a style="text-decoration:underline" href="MonsterAbilities.aspx?ID=3">Attack of Opportunity</a> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"></b> `;
  const fields = savesParser(input);

  expect(fields.saves).toEqual({
    fort: 10,
    fort_misc: null,
    misc: null,
    ref: 7,
    ref_misc: null,
    will: 6,
    will_misc: '+2 status vs. mental',
  });
});

