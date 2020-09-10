const abilityModsParser = require('./ability-mods-parser');

it('parse ability mods from animated broom', () => {
  const input = `<a target="_blank" href="Images\Monsters\AnimatedObject_AnimatedBroom.png"><img class="thumbnail" src="Images\Monsters\AnimatedObject_AnimatedBroom.png"></a><span alt="Neutral" class="traitalignment" title="Neutral">N</span><span alt="Small" class="traitsize" title="Small">Small</span><span alt="Construct Trait" class="trait" title="A construct is an artificial creature empowered by a force other than necromancy. Constructs are often mindless; they are immune to disease, the paralyzed condition, and poison; and they may have Hardness based on the materials used to construct their bodies. Constructs are not living creatures, nor are they undead. When reduced to 0 Hit Points, a construct creature is destroyed."><a href="Traits.aspx?ID=35">Construct</a></span><span alt="Mindless Trait" class="trait" title="A mindless creature has either programmed or rudimentary mental attributes. Most, if not all, of their mental ability modifiers are -5. They are immune to all mental effects."><a href="Traits.aspx?ID=108">Mindless</a></span><br /><b>Source</b> <a href="https://paizo.com/products/btq01y0m?Pathfinder-Bestiary" target="_blank" class="external-link"><i>Bestiary pg. 20</i></a><br /><b>Perception</b> +3; darkvision<br /><b>Skills</b> <a href="Skills.aspx?ID=3"><u>Athletics</a></u> +5<br /><b>Str</b> +0, <b>Dex</b> +1, <b>Con</b> +0, <b>Int</b> -5, <b>Wis</b> +0, <b>Cha</b> -5`;
  const fields = abilityModsParser(input);

  expect(fields.ability_mods).toEqual({
    str_mod: 0,
    dex_mod: 1,
    con_mod: 0,
    int_mod: -5,
    wis_mod: 0,
    cha_mod: -5,
  });
});