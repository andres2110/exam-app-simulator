import { ACTIONS, STATES, createTests, removeDuplicates } from "@/constants";
import data from "../../mocks/data_questions.json";
// import data from "../../mocks/data_with_answers.json";
// const questions = data.data.map((q) => {
//   return {
//     ...q,
//     status: STATES.normal,
//   };
// });
let aTotalQuestion = [];
Object.keys(data).forEach((t) => {
  aTotalQuestion = aTotalQuestion.concat(data[t]);
});
let { aReturn } = removeDuplicates(aTotalQuestion);
let oTests = createTests(aReturn, 40);

export const initialState = {
  currentQuestion: 0,
  questions: [],
  passedQuestions: [],
  errorQuestions: [],
  tests: oTests,
  currentTest: "",
  searchText: "",
};

export const AppReducer = (state, action) => {
  const { type, id, status, test, text } = action;
  switch (type) {
    case ACTIONS.search:
      
      return {
        ...state,
        searchText: text,
      };

    case ACTIONS.move:
      return {
        ...state,
        currentQuestion: id,
      };
    case ACTIONS.answer:
      fnChangeStateQuestion(id, state.currentTest, status);
      return {
        ...state,
        passedQuestions: fnGetDataLS(state.currentTest, STATES.passed),
        errorQuestions: fnGetDataLS(state.currentTest, STATES.error),
      };
    case ACTIONS.test:
      let aTest = state.tests;
      let aQuestionsTmp = [];
      if (test === "allTest") {
        Object.keys(state.tests).forEach((t) => {
          let aQuestionsId = fnGetDataLS(t, STATES.error);
          aQuestionsTmp = aQuestionsTmp.concat(aTest[t].filter((q) => aQuestionsId.includes(q.id)));
        });
        aQuestionsTmp = aQuestionsTmp.map((q, index) => ({
          ...q,
          id: index,
        }));
      }
      aTest = test === "allTest" ? aQuestionsTmp : aTest[test];
      return {
        ...state,
        currentQuestion: aTest[0].id,
        currentTest: test,
        questions: aTest,
        errorQuestions: fnGetDataLS(test, STATES.error),
        passedQuestions: fnGetDataLS(test, STATES.passed),
      };
  }
};

const fnChangeStateQuestion = (id, test, status) => {
  let oStorage = {
    passed: [],
    error: [],
  };
  if (localStorage.getItem(test)) {
    oStorage = JSON.parse(localStorage.getItem(test));
  }
  if (!oStorage[status].includes(id)) {
    oStorage[status].push(id);
  }
  localStorage.setItem(test, JSON.stringify(oStorage));
};

const fnGetDataLS = (test, object) => {
  const oStorage = JSON.parse(localStorage.getItem(test));
  if (!oStorage || oStorage[object].length === 0) return [];
  return oStorage[object];
};
