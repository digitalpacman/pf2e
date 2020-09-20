function trimit(value, char) {
  while (value[0] === char) {
    value = value.substr(1).trim();
  }

  while (value[value.length - 1] === char) {
    value = value.substr(0, value.length - 1).trim();
  }

  return value;
}

module.exports = trimit;