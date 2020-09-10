const resistancesParser = require('./resistances-parser');

it('parse resistances from treerazer', () => {
  const input = `<b>AC</b> 54; <b>Fort</b> +42, <b>Ref</b> +40, <b>Will</b> +43; +2 status to all saves vs. magic<br /><b>HP</b> 550, regeneration 50 (deactivated by good); <b>Immunities</b> death effects, disease, mental, poison; <b>Resistances</b> acid 20, cold 15, fire 15, physical 20 (except cold iron); <b>Weaknesses</b> good 20<br /><b>Aura of Corruption</b> (<a style="text-decoration:underline" href="Traits.aspx?ID=206">aura</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=125">plant</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=134">primal</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=157">transmutation</a>) 120 feet. Plants near Treerazer twist, deform, and transform into thorny or fungoid parodies of their natural shapes. A living creature in this area must succeed at a DC 47 Fortitude save each round or become partially transformed into plantlike matter. Those who fail this saving throw are treated as if they were plants for the purposes of any effect that particularly harms or inconveniences plant creatures more than other creatures, but do not gain any benefits of being plant creatures. This effect lasts as long as the creature remains within the area of corruption and for 1 minute thereafter.<br /> <b>Attack of Opportunity</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;
  const fields = resistancesParser(input);

  expect(fields.resistances).toEqual([
    { type: 'acid', amount: 20, misc: null },
    { type: 'cold', amount: 15, misc: null },
    { type: 'fire', amount: 15, misc: null },
    { type: 'physical', amount: 20, misc: 'except cold iron' },
  ]);
});
