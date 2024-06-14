"use-client";

import { AppContext } from "@/app/page";
import { STATES } from "@/constants";
import { useContext } from "react";

export default function Questions() {
  const { state, fnDispatch } = useContext(AppContext);
  // const aQuestionIds = state.questions.map((e) => e.id);
  const aQuestions = state.questions;
  const fnGoTo = (id) => {
    fnDispatch({
      type: "answer",
      id: id,
      status: STATES.clicked,
    });
    fnDispatch({
      type: "next",
      id: id,
    });
  };
  console.log(aQuestions);
  return (
    <div className="w-1/3 h-1/5 grid grid-cols-5 gap-1">
      {aQuestions.map((oQuestion) => {
        return (
          <div
            className={oQuestion.status}
            key={oQuestion.id}
            onClick={() => fnGoTo(oQuestion.id)}
          >
            {oQuestion.id + 1}
          </div>
        );
      })}
    </div>
  );
}
