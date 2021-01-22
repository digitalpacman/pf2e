const immunitiesParser = require('./immunities-parser');

it('parse immunities from treerazer', () => {
  const input = `<b>AC</b> 54; <b>Fort</b> +42, <b>Ref</b> +40, <b>Will</b> +43; +2 status to all saves vs. magic<br /><b>HP</b> 550, regeneration 50 (deactivated by good); <b>Immunities</b> death effects, disease, mental, poison; <b>Resistances</b> acid 20, cold 15, fire 15, physical 20 (except cold iron); <b>Weaknesses</b> good 20<br /><b>Aura of Corruption</b> (<a style="text-decoration:underline" href="Traits.aspx?ID=206">aura</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=125">plant</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=134">primal</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=157">transmutation</a>) 120 feet. Plants near Treerazer twist, deform, and transform into thorny or fungoid parodies of their natural shapes. A living creature in this area must succeed at a DC 47 Fortitude save each round or become partially transformed into plantlike matter. Those who fail this saving throw are treated as if they were plants for the purposes of any effect that particularly harms or inconveniences plant creatures more than other creatures, but do not gain any benefits of being plant creatures. This effect lasts as long as the creature remains within the area of corruption and for 1 minute thereafter.<br /> <b>Attack of Opportunity</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;
  const fields = immunitiesParser(input);

  expect(fields.immunities).toEqual([
    'death effects',
    'disease',
    'mental',
    'poison',
  ]);
});

it('parse immunities from ancient brine dragon', () => {
  const input = `<b>AC</b> 33; <b>Fort</b> +25, <b>Ref</b> +20, <b>Will</b> +21; +1 status to all saves vs. magic<br /><b>HP</b> 222; <b>Immunities</b> acid, <a style="text-decoration:underline" href="Conditions.aspx?ID=28">paralyzed</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=145">sleep</a><br /><b><a style="text-decoration:underline" href="MonsterAbilities.aspx?ID=17">Frightful Presence</a></b> (<a style="text-decoration:underline" href="Traits.aspx?ID=206">aura</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=60">emotion</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=68">fear</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=106">mental</a>) 90 feet, DC 30<br /><b>Brine Spit <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png"></b> <b>Trigger </b>A creature the brine dragon observes within 30 feet uses a <a style="text-decoration:underline" href="Traits.aspx?ID=32">concentrate</a> action; <b>Effect </b>The dragon spits a glob of caustic salt water at the creature. The creature takes 5d6 acid damage (DC 30 basic Reflex save). On a failure, the concentrate action is disrupted.`;
  const fields = immunitiesParser(input);

  expect(fields.immunities).toEqual([
    'acid',
    '__paralyzed__',
    '__sleep__',
  ]);
});
