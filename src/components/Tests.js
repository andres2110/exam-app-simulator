import React, { useContext } from "react";
import { ACTIONS } from "@/constants";
import { AppContext } from "@/app/page";

export default function Tests() {
  const { state, fnDispatch } = useContext(AppContext);
  const { currentTest } = state;
  let aTests = Object.keys(state.tests);
  aTests = aTests.map((t, idx) => ({
    target: t,
    name: `Test ${idx + 1}`,
  }));
  aTests.push({
    target: "allTest",
    name: "Only incorrect",
  });
  const fnSetTest = (test) => {
    fnDispatch({
      type: ACTIONS.test,
      test: test,
    });
  };
  return (
    <div className="m-10">
      <div className="grid grid-cols-1 gap-1">
        {aTests.map((t) => (
          <button
            className={`w-15 bg-blue-${t.target === currentTest ? "500" : "400"} ml-5`}
            key={t.target}
            onClick={() => fnSetTest(t.target)}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
