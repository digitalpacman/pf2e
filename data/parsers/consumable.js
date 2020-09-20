function consumable(items) {
  let remaining = [...items];
  return (consumer) => {
    const consumedItems = [];
    const removable = [];
    for (let i = 0; i < remaining.length; ++i) {
      const consumed = consumer(remaining[i]);
      if (consumed) {
        consumedItems.push(consumed);
        removable.push(remaining[i]);
      }
    }

    remaining = remaining.filter(x => removable.indexOf(x) === -1);
    return consumedItems.length > 0 ? consumedItems : null;
  };
}

module.exports = consumable;