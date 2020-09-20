const removeHtml = (html) => {
  let s;
  if (!html) {
    return '';
  }

  while ((s = html.indexOf('<')) !== -1) {
    const e = html.indexOf('>', s);
    if (e === -1) {
      return html.substr(0, s);
    }
    html = html.substr(0, s) + html.substr(e + 1);
  }

  return html.trim();
};

module.exports = removeHtml;