"use-client";

import { AppContext } from "@/app/page";
import { ACTIONS, STATES } from "@/constants";
import React, { useContext } from "react";

export const Questions = React.memo(() => {
  const { state, fnDispatch } = useContext(AppContext);
  const aQuestions = state.questions;
  const aPassed = state.passedQuestions;
  const aError = state.errorQuestions;
  const iCurrentQ = state.currentQuestion;
  const fnGoTo = (id) => {
    fnDispatch({
      type: ACTIONS.move,
      id: id,
    });
  };
  return (
    <div className="w-1/3 h-1/5 grid grid-cols-5 gap-1">
      {aQuestions.map((oQuestion) => {
        if (oQuestion.id === iCurrentQ) {
          return (
            <div
              className="w-5 text-white bg-blue-500"
              key={oQuestion.id}
              onClick={() => fnGoTo(oQuestion.id)}
            >
              {oQuestion.id + 1}
            </div>
          );
        }
        if (aPassed.includes(oQuestion.id)) {
          return (
            <div
              className="w-5 text-white bg-green-400"
              key={oQuestion.id}
              onClick={() => fnGoTo(oQuestion.id)}
            >
              {oQuestion.id + 1}
            </div>
          );
        }

        if (aError.includes(oQuestion.id)) {
          return (
            <div
              className="w-5 text-white bg-red-400"
              key={oQuestion.id}
              onClick={() => fnGoTo(oQuestion.id)}
            >
              {oQuestion.id + 1}
            </div>
          );
        }
        return (
          <div className="w-5 text-white bg-gray-400" key={oQuestion.id} onClick={() => fnGoTo(oQuestion.id)}>
            {oQuestion.id + 1}
          </div>
        );
      })}
    </div>
  );
});

export default Questions;
