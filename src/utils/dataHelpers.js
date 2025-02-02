export const updateData = (arr, label, callback) => {
  for (let item of arr) {
    if (item.label === label) {
      callback(item);
      return;
    }
    if (item.children) {
      updateData(item.children, label, callback);
    }
  }
};

export const updateParentTotals = (arr) => {
  for (let item of arr) {
    if (item.children) {
      const total = item.children.reduce((sum, child) => sum + child.value, 0);
      if (total !== item.value) {
        const variance = ((total - item.value) / item.value) * 100;
        item.value = total;
        item.variance = variance.toFixed(2) + "%";
      }
    }
  }
  return [...arr];
};
