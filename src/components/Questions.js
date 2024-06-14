"use-client";

import { AppContext } from "@/app/page";
import { useContext } from "react";

export default function Questions() {
  const { state, fnDispatch } = useContext(AppContext);
  const aQuestionIds = state.questions.map((e) => e.id);
  const { currentQuestion } = state;
  const aQuestion = state.questions;
  const fnGoTo = (id) => {
    fnDispatch({
      type: "next",
      id: id,
    });
  };
  return (
    <div className="w-1/3 h-1/5 grid grid-cols-5 gap-1">
      {aQuestionIds.map((iQuestion) => (
        <div
          className={`w-5 text-white ${
            aQuestion.filter((e) => e.id === currentQuestion)[0].checked
              ? "bg-green-400"
              : iQuestion === currentQuestion
              ? "bg-blue-800"
              : "bg-gray-600"
          }`}
          key={iQuestion}
          onClick={() => fnGoTo(iQuestion)}
        >
          {iQuestion + 1}
        </div>
      ))}
    </div>
  );
}
