function parseActionCost(value) {
  if (!value) {
    return 'None';
  }
  if (value.indexOf('ThreeActions') !== -1) {
    return 'Three Actions';
  }
  if (value.indexOf('TwoActions') !== -1) {
    return 'Two Actions';
  }
  if (value.indexOf('OneAction') !== -1) {
    return 'One Action';
  }
  if (value.indexOf('Reaction') !== -1) {
    return 'Reaction';
  }
  if (value.indexOf('FreeAction') !== -1) {
    return 'Free Action';
  }
  return 'None';
}

module.exports = parseActionCost;