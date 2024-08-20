"use client";
import Question from "@/components/Question";
import Questions from "@/components/Questions";
import Results from "@/components/Results";
import Tests from "@/components/Tests";
import { ACTIONS } from "@/constants";
import { AppReducer, initialState } from "@/reducers/appReducer";
import { createContext, useReducer } from "react";
export const AppContext = createContext(null);
export default function Home() {
  const [state, fnDispatch] = useReducer(AppReducer, initialState);
  const { currentPage, results } = state;
  const fnOnChange = (event) => {
    if (event.key === "Enter") {
      fnDispatch({
        type: ACTIONS.search,
        text: event.target.value,
      });
    }
  };
  return (
    <AppContext.Provider value={{ state, fnDispatch }}>
      <main className="flex min-h-screen flex-col items-center  p-24">
        <input type="text" className="text-black w-1/2" onKeyDown={fnOnChange} />
        <div className="w-full flex ">
          {currentPage !== "search" && <Tests />}
          {results.length > 0 && currentPage === "search" && <Results />}
          {currentPage === "test" && <Question />}
          {currentPage === "test" && <Questions />}
        </div>
      </main>
    </AppContext.Provider>
  );
}
