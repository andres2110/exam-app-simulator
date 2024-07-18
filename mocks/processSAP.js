var aQueries = document.querySelectorAll("div.ModuleAssessmentQuestion_whiteContainer__BjsLz");

var aQueriesAns = [];

aQueries.forEach((querie, index) => {
  let sQuestion = querie.querySelector("div.ModuleAssessmentQuestion_questionText__DTbkn").innerText;
  let aAnswers = querie.querySelectorAll("div.ModuleAssessmentAnswer_containerHorizontal__hG2hq");
  var aAnswersObj = [];
  aAnswers.forEach((answer, index) => {
    let text = answer.innerText;
    let bCorrect =
      answer.querySelector("div").className ===
      "ModuleAssessmentAnswer_circle__TJGGx ModuleAssessmentAnswer_answerCorrect__5rK7r";
    aAnswersObj.push({
      text: text,
      valid: bCorrect,
      id: index,
    });
  });
  aQueriesAns.push({
    question: sQuestion,
    answers: aAnswersObj,
    id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  });
});
