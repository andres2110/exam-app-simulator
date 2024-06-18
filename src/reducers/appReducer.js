import { ACTIONS, STATES } from "@/constants";
import data from "../../mocks/data_questions.json";
// import data from "../../mocks/data_with_answers.json";
// const questions = data.data.map((q) => {
//   return {
//     ...q,
//     status: STATES.normal,
//   };
// });

export const initialState = {
  currentQuestion: 0,
  questions: [],
  passedQuestions: [],
  errorQuestions: [],
  tests: data,
  currentTest: "",
};

export const AppReducer = (state, action) => {
  const { type, id, status, test } = action;
  switch (type) {
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
      let aQuestions = state.tests;
      let aQuestionsTmp = [];
      if (test === "allTest") {
        Object.keys(state.tests).forEach((t) => {
          let aQuestionsId = fnGetDataLS(t, STATES.error);
          aQuestionsTmp = aQuestionsTmp.concat(aQuestions[t].filter((q) => aQuestionsId.includes(q.id)));
        });
        aQuestionsTmp = aQuestionsTmp.map((q, index) => ({
          ...q,
          id: index,
        }));
      }
      aQuestions = test === "allTest" ? aQuestionsTmp : aQuestions[test];
      return {
        ...state,
        currentTest: test,
        questions: aQuestions,
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
