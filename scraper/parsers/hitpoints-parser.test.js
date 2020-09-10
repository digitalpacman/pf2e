const hitpointsParser = require('./hitpoints-parser');

it('parse hitpoints from aasimar redeemer', () => {
  const input = `<b>AC</b> 23 (25 with shield raised); <b>Fort</b> +12, <b>Ref</b> +8, <b>Will</b> +11; +1 status to all saves vs. disease (against diseases, critical failures become failures)<br /><b>HP</b> 73<br /><b>Divine Grace</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"> <b>Trigger</b> The angelkin is targeted by a spell that allows a saving throw. <b>Effect</b> The scion gains a +2 circumstance bonus to the saving throw.<br /> <b>Glimpse of Redemption</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"> <b>Trigger</b> An enemy damages one of the angelkin's allies. Both the enemy and ally must be within 15 feet of the angelkin. <b>Effect</b> The angelkin causes its foe to hesitate under the weight of its sins as visions of possible redemption play out in its mind's eye. The foe chooses one of two options: <ul><li>The ally is completely unharmed by the triggering damage.</li> <li>The ally gains resistance 7 to all damage against the triggering damage. After the damaging effect resolves, the enemy becomes enfeebled 2 until the end of its next turn.</li></ul> <b>Shield Block</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;
  const fields = hitpointsParser(input);

  expect(fields).toEqual({
    hp: 73,
    hp_misc: null,
  });
});

it('parse hitpoints from binumir', () => {
  const input = `<b>AC</b> 19; <b>Fort</b> +9, <b>Ref</b> +12, <b>Will</b> +8<br><b>HP</b> 25 (<a style="text-decoration:underline" href="https://2e.aonprd.com/MonsterAbilities.aspx?ID=42">negative healing</a>); <b>Immunities</b> <a style="text-decoration:underline" href="https://2e.aonprd.com/Traits.aspx?ID=40">death</a> effects, <a style="text-decoration:underline" href="https://2e.aonprd.com/Traits.aspx?ID=46">disease</a>, <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=28">paralyzed</a>, <a style="text-decoration:underline" href="https://2e.aonprd.com/Traits.aspx?ID=126">poison</a>, precision, <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=38">unconscious</a>; <b>Resistances</b> all damage 2 (except <a style="text-decoration:underline" href="https://2e.aonprd.com/Traits.aspx?ID=75">force</a>, <i><a style="text-decoration:underline" href="https://2e.aonprd.com/Equipment.aspx?ID=297">ghost touch</a></i>, or <a style="text-decoration:underline" href="https://2e.aonprd.com/Traits.aspx?ID=128">positive</a><br><b>Delay Condition</b> The binumir's dual spirit takes longer to be affected by detrimental effects. When the binumir is the target of an effect that imparts the <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=5">confused</a>, <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=6">controlled</a>, <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=14">fascinated</a>, <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=19">frightened</a>, <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=34">sickened</a>, <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=35">slowed</a>, or <a style="text-decoration:underline" href="https://2e.aonprd.com/Conditions.aspx?ID=36">stunned</a> condition, the condition is automatically suppressed until the end of the binumir's next turn.`;
  const fields = hitpointsParser(input);

  expect(fields).toEqual({
    hp: 25,
    hp_misc: '(negative healing)',
  });
});

it('parse hitpoints from troll', () => {
  const input = `<b>AC</b> 20; <b>Fort</b> +17, <b>Ref</b> +11, <b>Will</b> +7<br><b>HP</b> 115, regeneration 20 (deactivated by acid or fire); <b>Weaknesses</b> fire 10<br><b>Attack of Opportunity</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="./troll_files/Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="./troll_files/Reaction_I.png">`;
  const fields = hitpointsParser(input);

  expect(fields).toEqual({
    hp: 115,
    hp_misc: 'regeneration 20 (deactivated by acid or fire)',
  });
});

