const { has } = require('./navigation');

function rarityParser(haystack) {
  const rarity = rare(haystack) || uncommon(haystack);
  if (!rarity) {
    return;
  }

  console.log(`found rarity: ${rarity}`);
  return { rarity };
}

function rare(haystack) {
  if (has({ haystack, needle: 'class="traitrare"'})) {
    return 'Rare';
  }
}

function uncommon(haystack) {
  if (has({ haystack, needle: 'class="traituncommon"'})) {
    return 'Uncommon';
  }
}

module.exports = rarityParser;