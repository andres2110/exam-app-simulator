import { STATES } from "@/constants";
import data from "../../mocks/data_questions.json";
// import data from "../../mocks/data_with_answers.json";
const questions = data.data.map((q) => {
  return {
    ...q,
    status: STATES.clicked,
  };
});

export const initialState = {
  currentQuestion: 0,
  questions: questions,
};

export const AppReducer = (state, action) => {
  const { type, id , status} = action;
  switch (type) {
    case "next":
      return {
        ...state,
        currentQuestion: id,
      };
    case "answer": {
      return {
        ...state,
        questions: fnChangeStateQuestion(state.questions, id, status),
      };
    }
  }
};

const fnChangeStateQuestion = (aQuestion, id, status) => {
  const aQuestionR = structuredClone(aQuestion);
  aQuestionR[id].status = status;
  return aQuestionR;
};
