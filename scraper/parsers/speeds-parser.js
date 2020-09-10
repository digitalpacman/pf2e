const { has, skip } = require('./navigation');
const parenSplit = require('./paren-split');
const removeHtml = require('./remove-html');
const { br } = require('./constants');

function speedsParser(haystack) {
  if (!has({ haystack, needle: '<b>Speed</b>'})) {
    return;
  }

  const speed = parenSplit(removeHtml(skip({ haystack, needle: '<b>Speed</b>' }).limit(br).take()))
    .map(typedAmount);

  console.log(`found speed: ${JSON.stringify(speed)}`);
  return { speed };
}

function typedAmount(value) {
  const regAmount = /([^\d]+)? ?(\d+)?/i;
  const regMisc = /\((.+)\)/i;

  let [, type, amount] = regAmount.exec(value);
  let [, misc] = regMisc.exec(value) || [];

  if (!type) {
    type = 'Land';
  } else {
    type = type.trim();
  }
  amount = parseInt(amount) || null;
  misc = misc ? misc.trim() : null;

  return { type, amount, misc };
}

module.exports = speedsParser;