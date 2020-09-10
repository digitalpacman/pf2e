const itemsParser = require('./items-parser');

it('parse items from aasimar redeemer', () => {
  const input = `<span alt="Neutral Good" class="traitalignment" title="Neutral Good">NG</span><span alt="Medium" class="traitsize" title="Medium">Medium</span><span alt="Aasimar Trait" class="trait" title="Note from Nethys: This trait was not listed in the Glossary, its only use is as a Trait for some monsters."><a href="Traits.aspx?ID=256">Aasimar</a></span><span alt="Human Trait" class="trait" title="A creature with this trait is a member of the human ancestry. Humans are a diverse array of people known for their adaptability. An ability with this trait can be used or selected only by humans."><a href="Traits.aspx?ID=90">Human</a></span><span alt="Humanoid Trait" class="trait" title="Humanoid creatures reason and act much like humans. They typically stand upright and have two arms and two legs."><a href="Traits.aspx?ID=91">Humanoid</a></span><br /><b>Source</b> <a href="https://paizo.com/products/btq01y0m?Pathfinder-Bestiary" target="_blank" class="external-link"><i>Bestiary pg. 263</i></a><br /><b>Perception</b> +11; darkvision<br /><b>Languages</b> <a href="Languages.aspx?ID=16"><u>Celestial</a></u>, <a href="Languages.aspx?ID=1"><u>Common</a></u><br /><b>Skills</b> <a href="Skills.aspx?ID=3"><u>Athletics</a></u> +11, <a href="Skills.aspx?ID=6"><u>Diplomacy</a></u> +12, <a href="Skills.aspx?ID=9"><u>Medicine</a></u> +9, <a href="Skills.aspx?ID=13"><u>Religion</a></u> +11, <a href="Skills.aspx?ID=14"><u>Society</a></u> +7<br /><b>Str</b> +4, <b>Dex</b> +1, <b>Con</b> +3, <b>Int</b> +0, <b>Wis</b> +2, <b>Cha</b> +3<br /><b>Items</b> <a href="Weapons.aspx?ID=67"><u>crossbow (10 bolts)</u></a>, <a href="Armor.aspx?ID=12"><u>half plate</u></a>, <a href="Weapons.aspx?ID=31"><u>longsword</u></a>, <a style="text-decoration:underline" href="Shields.aspx?ID=3">steel shield</a> (Hardness 5, HP 20, BT 10)`;
  const fields = itemsParser(input);

  expect(fields.items).toEqual([
    'crossbow (10 bolts)',
    'half plate',
    'longsword',
    'steel shield (Hardness 5, HP 20, BT 10)',
  ]);
});