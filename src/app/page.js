"use client";
import Question from "@/components/Question";
import Questions from "@/components/Questions";
import { AppReducer, initialState } from "@/reducers/appReducer";
import { createContext, useReducer, useState } from "react";
export const AppContext = createContext(null);
export default function Home() {
  const [state, fnDispatch] = useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider value={{ state, fnDispatch }}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full flex ">
          <Question/>
          <Questions />
        </div>
      </main>
    </AppContext.Provider>
  );
}
