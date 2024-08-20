import React from "react";
import { AppContext } from "@/app/page";
import { ACTIONS } from "@/constants";

export default function Results() {
  const { state, fnDispatch } = React.useContext(AppContext);
  const { results, searchText } = state;
  const fnMoveQuestion = (index) => {
    const { test, questionNumber } = results[index];
    let id = questionNumber - 1;
    fnDispatch({
      type: ACTIONS.test,
      test: test,
    });
    fnDispatch({
      type: ACTIONS.move,
      id: id,
    });
  };
  return (
    <div className="overflow-y-auto h-[500px]">
      <p>
        Results: <b>{results.length}</b>
      </p>
      {results.map((result, index) => {
        let parts = result.text.split(new RegExp(`(${searchText})`, "gi"));
        return (
          <div className="border" onClick={() => fnMoveQuestion(index)} key={index}>
            <p>
              Test:<b>{`${result.test}`}</b>
              {` | Question: ${result.questionNumber}`}
            </p>
            <p className="my-2">
              {parts.map((part, index) =>
                part.toLowerCase() === searchText.toLowerCase() ? (
                  <span key={index} style={{ backgroundColor: "green", fontWeight: "bold" }}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
