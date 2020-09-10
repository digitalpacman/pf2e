const descriptionParser = require('./description-parser');

it('parse description from adamantine golem', () => {
  const input = `Crafted from a nigh-indestructible metal of great rarity, adamantine golems can't be destroyed except by the most powerful foes. Crafting an adamantine golem requires a quantity of adamantine so massive that collecting it usually requires mounting a mining expedition to a distant planet, the Plane of Earth, or an Outer Plane.<br /><br /><b><u><a href="Skills.aspx?ID=5&General=true">Recall Knowledge - Construct</a></u> (<u><a href="Skills.aspx?ID=2">Arcana</a></u>, <u><a href="Skills.aspx?ID=4">Crafting</a></u>)</b>: DC 43`;
  const fields = descriptionParser(input);
  
  const expected = `Crafted from a nigh-indestructible metal of great rarity, adamantine golems can't be destroyed except by the most powerful foes. Crafting an adamantine golem requires a quantity of adamantine so massive that collecting it usually requires mounting a mining expedition to a distant planet, the Plane of Earth, or an Outer Plane.\n\n\n\n**__Recall Knowledge - Construct__ (__Arcana__, __Crafting__)**: DC 43`;
  expect(expected).toEqual(fields.description);
});