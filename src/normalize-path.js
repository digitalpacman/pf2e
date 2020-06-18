const normalizePath = (path) => {
  return path.toLowerCase()
  .replace(/[^a-z0-9]/g, '-')
  .replace('--', '-')
  .replace('--', '-')
  .replace('--', '-')
  .replace('--', '-');
};

module.exports = { normalizePath };