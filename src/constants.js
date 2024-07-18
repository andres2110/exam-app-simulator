export const ACTIONS = {
  move: "move",
  answer: "answer",
  test: "test",
  search:"search"
};

export const STATES = {
  clicked: "clicked",
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

export const removeDuplicates = (arr) => {
  const seen = {};
  const uniqueArray = [];
  let duplicatesCount = 0;

  arr.forEach((item) => {
    if (seen[item.question]) {
      duplicatesCount++;
    } else {
      seen[item.question] = true;
      uniqueArray.push(item);
    }
  });
  // const aReturn = uniqueArray.map((e, index) => ({
  //   ...e,
  //   id: index,
  // }));
  const aReturn = uniqueArray;
  return { aReturn, duplicatesCount };
};

export const createTests = (arr, numberQuestions) => {
  let oTests = {};
  let iRest = arr.length % numberQuestions;
  let iDivision = Math.floor(arr.length / numberQuestions);
  iDivision = arr.length / numberQuestions > iDivision ? iDivision + 1 : iDivision;
  let iStart = 0;
  let iEnd = numberQuestions;
  for (let index = 1; index <= iDivision; index++) {
    let sTest = `test${index}`;
    let aQuestions = arr.slice(iStart, iEnd);
    aQuestions = aQuestions.map((q, idx) => ({
      ...q,
      id: idx,
    }));
    oTests[sTest] = aQuestions;
    iStart = iEnd;
    if (iRest !== 0 && index === iDivision) {
      iEnd = iStart + iRest;
    } else {
      iEnd = iStart + numberQuestions;
    }
  }
  return oTests;
};
