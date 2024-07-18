"use client";
import Question from "@/components/Question";
import Questions from "@/components/Questions";
import Tests from "@/components/Tests";
import { AppReducer, initialState } from "@/reducers/appReducer";
import { createContext, useReducer } from "react";
export const AppContext = createContext(null);
export default function Home() {
  const [state, fnDispatch] = useReducer(AppReducer, initialState);
  const { currentTest } = state;
  return (
    <AppContext.Provider value={{ state, fnDispatch }}>
      <main className="flex min-h-screen flex-col items-center  p-24">
        <input type="text" className="text-black w-1/2" />
        <div className="w-full flex ">
          <Tests />
          {currentTest && <Question />}
          {currentTest && <Questions />}
        </div>
      </main>
    </AppContext.Provider>
  );
}
