import { AppContext } from "@/app/page";
import { ACTIONS, STATES, haveSameElements } from "@/constants";
import React, { useContext, useState } from "react";

export const Question = React.memo(() => {
  const { state, fnDispatch } = useContext(AppContext);
  const [sMessage, setMessage] = useState("");
  const [bError, setError] = useState(false);
  const [answers, fnSetAnswers] = useState([]);
  const oQuestion = state.questions.filter((e) => e.id === state.currentQuestion)[0];
  const aCorret = oQuestion.answers.filter((e) => e.valid === true).map((e) => e.id);
  const sImg = oQuestion.img !== undefined ? oQuestion.img : "";
  // const sImg = "https://www.erpprep.com/files/erpprep/download/C_FIORDEV_22-Daypo_7.png";
  const fnValidate = () => {
    const bErrorArray = haveSameElements(answers, aCorret);
    setError(!bErrorArray);
    let sMessage = bErrorArray ? "Bien hecho" : "Vuelve a intentarlo";
    let sStatus = bErrorArray ? STATES.passed : STATES.error;
    setMessage(sMessage);
    fnDispatch({
      type: ACTIONS.answer,
      id: oQuestion.id,
      status: sStatus,
    });
    setTimeout(() => {
      fnMove("next");
    }, 500);
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
    let { questions } = state;
    let id = state.currentQuestion;
    if (id === 0 && direction === "prev") return;
    if (id === questions.length - 1 && direction === "next") return;
    id = direction === "next" ? ++id : --id;
    fnDispatch({
      type: ACTIONS.move,
      id: id,
    });
    fnRefresh();
  };
  const iQuestion = oQuestion.id + 1;
  return (
    <div className=" flex-col w-5/6 p-11 h-screen">
      <div>
        <h1>Question {iQuestion}</h1>
        <p> {oQuestion.question}</p>
        {sImg && <img src={sImg} className="w-150" />}
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
      </div>
      <div>
        <button
          className="bg-black text-white border-2    border-white"
          onClick={() => fnSetAnswers(aCorret)}
        >
          Ver respuestas
        </button>
        <button className="bg-green-600 ml-6" onClick={() => fnRefresh()}>
          Refrescar
        </button>
        <button className="bg-yellow-400 ml-6" onClick={fnValidate}>
          Validar
        </button>
      </div>
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
});
export default Question;
