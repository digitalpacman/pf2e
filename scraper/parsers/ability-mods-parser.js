const { has, skip } = require('./navigation');

function abilityModsParser(haystack) {
  if (!has({ haystack, needle: '<b>Str</b>'})) {
    return;
  }
  
  const str_mod = skip({ haystack, needle: '<b>Str</b>' }).takeNumber();
  const dex_mod = skip({ haystack, needle: '<b>Dex</b>' }).takeNumber();
  const con_mod = skip({ haystack, needle: '<b>Con</b>' }).takeNumber();
  const int_mod = skip({ haystack, needle: '<b>Int</b>' }).takeNumber();
  const wis_mod = skip({ haystack, needle: '<b>Wis</b>' }).takeNumber();
  const cha_mod = skip({ haystack, needle: '<b>Cha</b>' }).takeNumber();

  const ability_mods = {
    str_mod,
    dex_mod, 
    con_mod, 
    int_mod, 
    wis_mod, 
    cha_mod,
  };
  
  console.log(`found ability_mods: ${JSON.stringify(ability_mods)}`);
  return { ability_mods };
}

module.exports = abilityModsParser;