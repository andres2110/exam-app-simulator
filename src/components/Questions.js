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
  // const iPerError = (aError?.length * 100) / aQuestions.length;
  const iPerAcert = (aPassed?.length * 100) / aQuestions.length;
  const bShowPer = aPassed.length + aError.length >= aQuestions.length;
  const fnGoTo = (id) => {
    fnDispatch({
      type: ACTIONS.move,
      id: id,
    });
  };
  return (
    <div className="w-1/3 h-1/5 flex-col">
      <div className="mb-6 text-center">
        {/* <p>Incorrectas:{iPerError}</p> */}
        {bShowPer && <p>Correctas: {iPerAcert}%</p>}
      </div>
      <div className=" grid grid-cols-5 gap-1">
        {aQuestions.map((oQuestion) => {
          let color = "bg-gray-400";
          if (oQuestion.id === iCurrentQ) {
            color = "bg-blue-500";
          }
          if (aPassed.includes(oQuestion.id)) {
            color = "bg-green-400";
          }
          if (aError.includes(oQuestion.id)) {
            color = "bg-red-400";
          }
          return (
            <div
              className={`w-7 text-white ${color} text-center`}
              key={oQuestion.id}
              onClick={() => fnGoTo(oQuestion.id)}
            >
              {oQuestion.id + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Questions;
