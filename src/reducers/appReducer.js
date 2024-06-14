import { STATES } from "@/constants";
import data from "../../mocks/data_questions.json";
// import data from "../../mocks/data_with_answers.json";
const questions = data.data.map((q) => {
  return {
    ...q,
    status: STATES.normal,
  };
});

export const initialState = {
  currentQuestion: 0,
  questions: questions,
  passedQuestions: [],
  errorQuestions: [],
};

export const AppReducer = (state, action) => {
  const { type, id, status } = action;
  switch (type) {
    case "next":
      return {
        ...state,
        currentQuestion: id,
      };
    case "answered": {
      let aPassed = state.passedQuestions;
      let aError = state.errorQuestions;
      if (status === STATES.passed) {
        aPassed = fnChangeStateQuestion(aPassed, id, STATES.passed);
      }
      if (status === STATES.error) {
        aError = fnChangeStateQuestion(aError, id, STATES.error);
      }
      return {
        ...state,
        passedQuestions: aPassed,
        errorQuestions: aError,
      };
    }
  }
};

const fnChangeStateQuestion = (aQuestion, id, status) => {
  const aQuestionR = structuredClone(aQuestion);
  aQuestionR.push(id);
  return aQuestionR;
};
