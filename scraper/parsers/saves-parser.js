const { has, skip } = require('./navigation');
const removeHtml = require('./remove-html');
const { br } = require('./constants');

function savesParser(haystack) {
  if (!has({ haystack, needle: '<b>Fort</b>'})) {
    return;
  }

  const fort = skip({ haystack, needle: '<b>Fort</b>' }).takeNumber();
  const ref = skip({ haystack, needle: '<b>Ref</b>' }).takeNumber();
  const will = skip({ haystack, needle: '<b>Will</b>' }).takeNumber();

  const fort_misc = miscFromParens(skip({ haystack, needle: '<b>Fort</b>' }).take(','));
  const ref_misc = miscFromParens(skip({ haystack, needle: '<b>Ref</b>' }).take(','));
  const will_misc = miscFromParens(
    skip({ haystack, needle: '<b>Will</b>' }).limit(';').limit(br).take()
  );

  const misc = skip({ haystack, needle: '<b>Will</b>' }).limit(br).skip(';').take() || null;

  const saves = {
    fort,
    fort_misc,
    ref,
    ref_misc,
    will,
    will_misc,
    misc,
  };
  
  console.log(`found saves: ${JSON.stringify(saves)}`);
  return { saves };
}

function miscFromParens(value) {
  return removeHtml(value).split(/\(|\)/g).map(x => x.trim())[1] || null;
}

module.exports = savesParser;