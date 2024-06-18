export const ACTIONS = {
  move: "move",
  answer: "answer",
  test: "test"
};

export const STATES = {
  clicked: 'clicked',
  passed: "passed",
  error: "error",
  normal: "normal",
};

export const haveSameElements = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  if (set1.size !== set2.size) return false;
  for (let elem of set1) {
    if (!set2.has(elem)) return false;
  }
  return true;
};
