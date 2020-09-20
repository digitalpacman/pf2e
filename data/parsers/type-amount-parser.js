const regAmount = /([^\d]+)? ?(\d+)?/i;
const regAmount2 = /(\d+)? ?([^\d\(]+)?/i;
const regMisc = /\((.+)\)/i;

function typeAndAmount(value) {
  let [, type, amount] = regAmount.exec(value) || [];

  if (!type) {
    return;
  }

  type = type ? type.trim() : null;
  amount = parseInt(amount) || null;

  return { type, amount };
}

function amountAndType(value) {
  let [, amount, type] = regAmount2.exec(value);

  type = type ? type.trim() : null;
  amount = parseInt(amount) || null;

  return { type, amount };
}

function typeAmountParse(value) {
  const { type, amount } = typeAndAmount(value) || amountAndType(value);

  let [, misc] = regMisc.exec(value) || [];
  misc = misc ? misc.trim() : null;
  return { type, amount, misc };
}

module.exports = typeAmountParse;