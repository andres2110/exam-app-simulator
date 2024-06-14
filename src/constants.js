export const ACTIONS = {
  move: "move",
};

export const STATES = {
  clicked: 'w-5 text-white bg-blue-800 ',
  passed: "w-5 text-white bg-green-400",
  error: "",
  normal: "w-5 text-white bg-gray-600",
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
