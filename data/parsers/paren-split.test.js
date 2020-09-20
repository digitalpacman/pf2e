const { parenSplit } = require('./paren-split');

it('single item split', () => {
  const parts = parenSplit('foo');

  expect(parts).toEqual(['foo']);
});

it('multi item split', () => {
  const parts = parenSplit('foo, bar; foobar');

  expect(parts).toEqual(['foo', 'bar', 'foobar']);
});

it('multi item split with paren and commas', () => {
  const parts = parenSplit('foo ( b,a,r ), bar ( f,o,o ),,,');

  expect(parts).toEqual(['foo ( b,a,r )', 'bar ( f,o,o )']);
});