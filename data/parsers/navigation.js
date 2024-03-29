function has({ haystack, needle }) {
  const pos = haystack.indexOf(needle);
  return pos !== -1;
}

function skip({ haystack, needle }) {
  const pos = haystack.indexOf(needle);

  if (pos !== -1) {
    haystack = haystack.substr(pos + needle.length);
  } else {
    haystack = '';
  }

  return {
    skip: (needle) => skip({ haystack, needle }),
    take: (needle) => take({ haystack, needle }),
    takeNumber: () => takeNumber({ haystack }),
    limit: (needle) => limit({ haystack, needle }),
    next: (needle) => next({ haystack, needle }),
  };
}

function next({ haystack, needle }) {
  for (let i = 0; i < haystack.length - needle.length; ++i) {
    const char = haystack[i];
    if (char !== ' ') {
      if (haystack.substr(i, needle.length) === needle) {
        haystack = haystack.substr(0, i);
      }
    }
  }

  return {
    skip: (needle) => skip({ haystack, needle }),
    take: (needle) => take({ haystack, needle }),
    takeNumber: () => takeNumber({ haystack }),
    limit: (needle) => limit({ haystack, needle }),
    next: (needle) => next({ haystack, needle }),
  }
}

function limit({ haystack, needle }) {
  const pos = haystack.indexOf(needle);
  if (pos !== -1) {
    haystack = haystack.substr(0, pos);
  }

  return {
    skip: (needle) => skip({ haystack, needle }),
    take: (needle) => take({ haystack, needle }),
    takeNumber: () => takeNumber({ haystack }),
    limit: (needle) => limit({ haystack, needle }),
    next: (needle) => next({ haystack, needle }),
  }
}

function takeNumber({ haystack }) {
  let number = '';
  for (let i = 0; i < haystack.length; ++i) {
    const char = haystack[i];
    if (!isNaN(char) && char !== ' ') {
      if (number.length === 0 && i > 0 && haystack[i - 1] === '-') {
        number += '-';
      }
      number += char;
    } else if (number.length > 0) {
      break;
    }
  }

  return parseInt(number);
}

function take({ haystack, needle }) {
  if (!needle) {
    return haystack.trim();
  }

  const pos = haystack.indexOf(needle);
  const taken = haystack.substr(0, pos).trim();
  return taken;
}

const br = '<br />';
const hangingIndent = '<span class="hanging-indent">';

module.exports = {
  has, 
  skip,
  take,
  br,
  hangingIndent,
};