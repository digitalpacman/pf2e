const skillsParser = require('./skills-parser');

it('parse skills from ahvothian', () => {
  const input = `<span alt="Uncommon Trait" class="traituncommon" title="Something of uncommon rarity requires special training or comes from a particular culture or part of the world. Some character choices give access to uncommon options, and the GM can choose to allow access for anyone. Less is known about uncommon creatures than common creatures. They typically can't be summoned. The DC of Recall Knowledge checks related to these creature is increased by 2."><a href="Traits.aspx?ID=159">Uncommon</a></span><span alt="Chaotic Evil" class="traitalignment" title="Chaotic Evil">CE</span><span alt="Medium" class="traitsize" title="Medium">Medium</span><span alt="Fiend Trait" class="trait" title="Creatures that hail from or have a strong connection to the evil-aligned planes are called fiends. Fiends can survive the basic environmental effects of planes in the Outer Sphere."><a href="Traits.aspx?ID=70">Fiend</a></span><br /><b>Source</b> <a href="https://paizo.com/products/btq023hg" target="_blank" class="external-link"><i>The Slithering pg. 62</i></a><br /><b>Perception</b> +18; <a style="text-decoration:underline" href="MonsterAbilities.aspx?ID=12">darkvision</a><br /><b>Languages</b> <a href="Languages.aspx?ID=12"><u>Abyssal</a></u>, <a href="Languages.aspx?ID=1"><u>Common</a></u>; <a style="text-decoration:underline" href="Spells.aspx?ID=293"><i>speak with animals</i></a><br /><b>Skills</b> <a href="Skills.aspx?ID=3"><u>Athletics</a></u> +19, <a href="Skills.aspx?ID=4"><u>Crafting</a></u> +11, <a href="Skills.aspx?ID=7"><u>Intimidation</a></u> +15 (+17 against <a style="text-decoration:underline" href="Traits.aspx?ID=91">humanoids</a>), <a href="Skills.aspx?ID=13"><u>Religion</a></u> +11, <a href="Skills.aspx?ID=16"><u>Survival</a></u> +17<br /><b>Str</b> +6, <b>Dex</b> +2, <b>Con</b> +4, <b>Int</b> +0, <b>Wis</b> +4, <b>Cha</b> +2<br /><b>Items</b> and humanoid), beast, <a href="Weapons.aspx?ID=71"><u>javelins (3)</u></a>, <a href="Weapons.aspx?ID=6"><u>longspear</u></a>, trophies`;
  const fields = skillsParser(input);

  expect(fields.skills).toEqual([
    { bonus: 19, misc: null, name: 'Athletics' },
    { bonus: 11, misc: null, name: 'Crafting' },
    { bonus: 15, misc: '+17 against humanoids', name: 'Intimidation' },
    { bonus: 11, misc: null, name: 'Religion' },
    { bonus: 17, misc: null, name: 'Survival' },
  ]);
});