function parenSplit(value) {
  if (!value) {
    return null;
  }

  const parts = [];
  let capture = '';
  let depth = 0;
  for (let i = 0; i < value.length; ++i) {
    const char = value[i];
    if (char === '(') {
      ++depth;
      capture += '(';
    } else if (char === ')') {
      if (depth > 0) {
        --depth;
      }
      capture += ')';
    } else if (depth === 0 && (char === ',' || char === ';')) {
      if (capture.length > 0) {
        parts.push(capture);
        capture = '';
      }
    } else if (capture.length > 0 || char !== ' ') {
      capture += char;
    }
  }
  
  if (capture.length > 0) {
    parts.push(capture);
  }

  if (parts.length === 0) {
    return null;
  }

  return parts;
}

function semicolonSplit(value) {
  if (!value) {
    return null;
  }

  const parts = [];
  let capture = '';
  let depth = 0;
  for (let i = 0; i < value.length; ++i) {
    const char = value[i];
    if (char === '(') {
      ++depth;
      capture += '(';
    } else if (char === ')') {
      if (depth > 0) {
        --depth;
      }
      capture += ')';
    } else if (depth === 0 && char === ';') {
      if (capture.length > 0) {
        parts.push(capture);
        capture = '';
      }
    } else if (capture.length > 0 || char !== ' ') {
      capture += char;
    }
  }
  
  if (capture.length > 0) {
    parts.push(capture);
  }

  if (parts.length === 0) {
    return null;
  }

  return parts;
}

module.exports = { parenSplit, semicolonSplit };

/*
public IEnumerable<string> SpecialSplit(string input, char[] splitCharacters = null)
{
	if (splitCharacters == null)
	{
		splitCharacters = new[] { ',', ';' };
	}
	var splits = new List<string>();
	var parts = input.Split(splitCharacters);

	var grouping = false;
	var group = string.Empty;
	foreach (var part in parts)
	{
		if (part.IndexOf('(') != -1)
		{
			grouping = true;
			group = part;
		}
		else if (grouping)
		{
			group += ',' + part;
		}
		else
		{
			splits.Add(part.Trim());
		}

		if (part.IndexOf(')') != -1)
		{
			splits.Add(group.Trim());
			grouping = false;
			group = string.Empty;
		}
	}
	
	return splits;
}
*/