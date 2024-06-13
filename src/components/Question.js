// "use client";
// import { useContext } from "react";
// import { AppContext } from "@/app/page";
// export default function Home() {
//   const [state, fnDispatch] = useReducer(AppReducer, initialState);
//   const fnNext = () => {
//     console.log('Entro');
//     let id = state.currentQuestion;
//     fnDispatch({
//       type: "next",
//       id: id++,
//     });
//   };
//   const oQuestion = state.questions.filter(
//     (e) => e.id === state.currentQuestion
//   )[0];
//   return (
//     <AppContext.Provider value={{ state, fnDispatch }}>
//       <main className="flex min-h-screen flex-col items-center justify-between p-24">
//         <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>

//         <div className="">
//           <p> {oQuestion.question}</p>
//           <div>
//             {oQuestion.answers.map((answer, index) => (
//               <div className="flex" key={index}>
//                 <input type="checkbox" />
//                 <p>{answer.text}</p>
//               </div>
//             ))}
//           </div>
//           <button className="bg-blue-300" onClick={() => fnNext()}>
//             Siguiente
//           </button>
//         </div>

//         <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
//       </main>
//     </AppContext.Provider>
//   );
// }
