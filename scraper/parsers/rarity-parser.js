const found = require('./found');
const { has } = require('./navigation');

function rarityParser(haystack) {
  const rarity = unique(haystack) || rare(haystack) || uncommon(haystack);
  if (!rarity) {
    return;
  }

  found('rarity', rarity);
  return { rarity };
}

function rare(haystack) {
  if (has({ haystack, needle: '>Rare<'})) {
    return 'Rare';
  }
}

function uncommon(haystack) {
  if (has({ haystack, needle: 'class="traituncommon"'})) {
    return 'Uncommon';
  }
}

function unique(haystack) {
  if (has({ haystack, needle: '>Unique<'})) {
    return 'Unique';
  }
}

module.exports = rarityParser;