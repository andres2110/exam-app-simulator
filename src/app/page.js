"use client";
import { AppReducer, initialState } from "@/reducers/appReducer";
import { createContext, useContext, useReducer, useState } from "react";
export const AppContext = createContext(null);
export default function Home() {
  const [state, fnDispatch] = useReducer(AppReducer, initialState);
  const oQuestion = state.questions.filter(
    (e) => e.id === state.currentQuestion
  )[0];
  const aCorret = oQuestion.answers
    .filter((e) => e.valid === true)
    .map((e) => e.id);
  const [answers, fnSetAnswers] = useState([]);
  const [sMessage, setMessage] = useState("");
  const [bError, setError] = useState(false);
  const fnMove = (direction) => {
    let id = state.currentQuestion;
    if (id === 0 && direction === "prev") return;
    if (id === 79 && direction === "next") return;
    id = direction === "next" ? ++id : --id;
    fnDispatch({
      type: "next",
      id: id,
    });
    fnRefresh();
  };
  const iQuestion = oQuestion.id + 1;
  const fnOnChange = (event) => {
    const { id, checked } = event.target;
    fnSetAnswers((prevState) => {
      if (checked) {
        // Si el checkbox está marcado, agregar su ID al estado
        return [...prevState, parseInt(id)];
      } else {
        // Si el checkbox está desmarcado, eliminar su ID del estado
        return prevState.filter((item) => item !== parseInt(id));
      }
    });
  };
  const fnSeeAnswers = () => {
    fnSetAnswers(aCorret);
  }
  const haveSameElements = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    if (set1.size !== set2.size) return false;
    for (let elem of set1) {
      if (!set2.has(elem)) return false;
    }
    return true;
  };
  const fnValidate = () => {
    // console.log(aCorret);
    const bErrorArray = haveSameElements(answers, aCorret);
    setError(!bErrorArray);
    if (bErrorArray) {
      setMessage("Bien hecho");
    } else {
      setMessage("Vuelve a intentarlo");
    }
  };

  const fnRefresh = () => {
    setError(false);
    fnSetAnswers([]);
    setMessage('');
  };
  return (
    <AppContext.Provider value={{ state, fnDispatch }}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {sMessage.length > 0 && (
            <p className={bError ? "text-red-600" : "text-green-500"}>
              {sMessage}
            </p>
          )}
        </div>

        <div className="">
          <h1>Question {iQuestion}</h1>
          <p> {oQuestion.question}</p>
          <div>
            {oQuestion.answers.map((answer) => (
              <div className="flex" key={answer.id}>
                <input
                  type="checkbox"
                  id={answer.id}
                  checked={answers.includes(answer.id)}
                  onChange={fnOnChange}
                />
                <p>{answer.text}</p>
              </div>
            ))}
          </div>
          <button className="bg-yellow-400" onClick={() => fnValidate()}>
            Validar
          </button>
          <button className="bg-green-600 ml-6" onClick={() => fnRefresh()}>
            Refrescar
          </button>
          <button className="bg-black text-white ml-6" onClick={() => fnSeeAnswers()}>
            Ver respuestas
          </button>
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <button className="bg-red-300" onClick={() => fnMove("prev")}>
            Atras
          </button>
          <button className="bg-blue-300" onClick={() => fnMove("next")}>
            Siguiente
          </button>
        </div>
      </main>
    </AppContext.Provider>
  );
}
