import { AppContext } from "@/app/page";
import { haveSameElements } from "@/constants";
import React, { useContext, useState } from "react";

export default function Question() {
  const { state, fnDispatch } = useContext(AppContext);
  const [sMessage, setMessage] = useState("");
  const [bError, setError] = useState(false);
  const [answers, fnSetAnswers] = useState([]);
  const oQuestion = state.questions.filter((e) => e.id === state.currentQuestion)[0];
  const aCorret = oQuestion.answers.filter((e) => e.valid === true).map((e) => e.id);
  const fnValidate = () => {
    const bErrorArray = haveSameElements(answers, aCorret);
    setError(!bErrorArray);
    if (bErrorArray) {
      setMessage("Bien hecho");
      fnDispatch({
        type: "answer",
        id: oQuestion.id,
      });
      setTimeout(() => {
        fnMove("next");
      }, 500);
    } else {
      setMessage("Vuelve a intentarlo");
    }
  };
  const fnRefresh = () => {
    setError(false);
    fnSetAnswers([]);
    setMessage("");
  };
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
  return (
    <div className=" flex-col w-5/6 p-11">
      <h1>Question {iQuestion}</h1>
      <p> {oQuestion.question}</p>
      <p className="text-gray-600">{aCorret.length} Respuestas correctas </p>
      <div className="ml-10">
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
      <button className="bg-black text-white border-2    border-white" onClick={() => fnSetAnswers(aCorret)}>
        Ver respuestas
      </button>
      <button className="bg-green-600 ml-6" onClick={() => fnRefresh()}>
        Refrescar
      </button>
      <button className="bg-yellow-400 ml-6" onClick={() => fnValidate()}>
        Validar
      </button>
      {sMessage.length > 0 && <p className={bError ? "text-red-600" : "text-green-500"}>{sMessage}</p>}
      <div className="m-10 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <button className="bg-red-300" onClick={() => fnMove("prev")}>
          Atras
        </button>
        <button className="bg-blue-300" onClick={() => fnMove("next")}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
