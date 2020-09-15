const abilityParser = require('./automatic-abilities-parser');
const template = require('./universal-abilities/template');

it('parse sense abilities from treerazer', () => {
  const input = `<b>AC</b> 54; <b>Fort</b> +42, <b>Ref</b> +40, <b>Will</b> +43; +2 status to all saves vs. magic<br /><b>HP</b> 550, regeneration 50 (deactivated by good); <b>Immunities</b> death effects, disease, mental, poison; <b>Resistances</b> acid 20, cold 15, fire 15, physical 20 (except cold iron); <b>Weaknesses</b> good 20<br /><b>Aura of Corruption</b> (<a style="text-decoration:underline" href="Traits.aspx?ID=206">aura</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=125">plant</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=134">primal</a>, <a style="text-decoration:underline" href="Traits.aspx?ID=157">transmutation</a>) 120 feet. Plants near Treerazer twist, deform, and transform into thorny or fungoid parodies of their natural shapes. A living creature in this area must succeed at a DC 47 Fortitude save each round or become partially transformed into plantlike matter. Those who fail this saving throw are treated as if they were plants for the purposes of any effect that particularly harms or inconveniences plant creatures more than other creatures, but do not gain any benefits of being plant creatures. This effect lasts as long as the creature remains within the area of corruption and for 1 minute thereafter.<br /> <b>Attack of Opportunity</b> <img class="actiondark" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction.png"><img class="actionlight" alt="Reaction" style="height:15px; padding:0px 2px 0px 2px" src="Images\Actions\Reaction_I.png">`;
  const fields = abilityParser(input);

  expect(fields.automatic_abilities).toEqual([
    {
      ...template,
      action_cost: 'None',
      description: `Plants near Treerazer twist, deform, and transform into thorny or fungoid parodies of their natural shapes. A living creature in this area must succeed at a DC 47 Fortitude save each round or become partially transformed into plantlike matter. Those who fail this saving throw are treated as if they were plants for the purposes of any effect that particularly harms or inconveniences plant creatures more than other creatures, but do not gain any benefits of being plant creatures. This effect lasts as long as the creature remains within the area of corruption and for 1 minute thereafter.`,
      name: 'Aura of Corruption',
      range: '120 feet',
      raw_description: `**Aura of Corruption** (__aura__, __plant__, __primal__, __transmutation__) 120 feet. Plants near Treerazer twist, deform, and transform into thorny or fungoid parodies of their natural shapes. A living creature in this area must succeed at a DC 47 Fortitude save each round or become partially transformed into plantlike matter. Those who fail this saving throw are treated as if they were plants for the purposes of any effect that particularly harms or inconveniences plant creatures more than other creatures, but do not gain any benefits of being plant creatures. This effect lasts as long as the creature remains within the area of corruption and for 1 minute thereafter.`,
      traits: ['aura','plant','primal','transmutation'],
    },
    {
      ...template,
      action_cost: 'Reaction',
      effect: `You lash out at a foe that leaves an opening. Make a melee Strike against the triggering creature. If your attack is a critical hit and the trigger was a manipulate action, you disrupt that action. This Strike doesn't count toward your multiple attack penalty, and your multiple attack penalty doesn't apply to this Strike.`,
      name: 'Attack of Opportunity',
      raw_description: `**Attack of Opportunity** [Reaction] **Trigger** A creature within your reach uses a manipulate action or a move action, makes a ranged attack, or leaves a square during a move action it's using. **Effect** You lash out at a foe that leaves an opening. Make a melee Strike against the triggering creature. If your attack is a critical hit and the trigger was a manipulate action, you disrupt that action. This Strike doesn't count toward your multiple attack penalty, and your multiple attack penalty doesn't apply to this Strike.`,
      trigger: `A creature within your reach uses a manipulate action or a move action, makes a ranged attack, or leaves a square during a move action it's using.`,
    },
  ]);
});
