import React, { useContext } from "react";
import { ACTIONS } from "@/constants";
import { AppContext } from "@/app/page";

export default function Tests() {
  const { state, fnDispatch } = useContext(AppContext);
  const { currentTest } = state;
  const aTests = [
    {
      link: "test1",
      name: "Test 1",
    },
    {
      link: "test2",
      name: "Test 2",
    },
    {
      link: "allTest",
      name: "Only Errors",
    },
  ];
  const fnSetTest = (test) => {
    fnDispatch({
      type: ACTIONS.test,
      test: test,
    });
  };
  return (
    <div className="h-1/4">
      {aTests.map((t) => (
        <button
          className={`w-15 bg-blue-${t.link === currentTest ? "500" : "400"} ml-5`}
          key={t.link}
          onClick={() => fnSetTest(t.link)}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
