//// PREGUNTAS
var questions = pElements
  .map((element) => element.querySelector("dt > p:not([class])")?.textContent)
  .filter((o) => o !== undefined);
var pElements = Array.from(
  document.getElementsByClassName("quiz-report")[0].children
);

//Get preguntas con respuestas incorrectas
var ddElements = document.querySelectorAll("dd");

// Array para almacenar los textos deseados
textos = [];

// Recorre cada <dd>
ddElements.forEach((dd) => {
  // Selecciona todas las <tr> dentro de las tablas en el <dd>
  var trElements = dd.querySelectorAll("table tbody tr");

  // Convierte NodeList en un array y filtra
  var textosEnDd = Array.from(trElements).map((tr, index) => {
    // Selecciona el texto del <p> dentro del segundo <td>
    var pElement = tr.querySelector("td:nth-child(2) p");
    var imgElement = tr.querySelector("td:first-child img");
    var element = {
      text: pElement ? pElement.textContent : "",
      valid:
        imgElement &&
        (imgElement.alt === "Should have chosen" ||
          imgElement.alt === "Correct"),
      id: index,
    };
    return element;
  });

  // Agrega los textos encontrados en el <dd> al array principal
  if (textosEnDd.length > 0) {
    textos.push(textosEnDd);
  }
});
// Array para almacenar los textos deseados
var textosAgrupadosPorTr = [];

// Recorre cada <dd>
ddElements.forEach((dd) => {
  // Selecciona todas las <tr> dentro de las tablas en el <dd>
  var trElements = dd.querySelectorAll("table tbody tr");

  // Convierte NodeList en un array y filtra
  var textosEnDd = Array.from(trElements)
    .filter((tr) => {
      // Selecciona la primera <td> y el <img> dentro de ella
      var imgElement = tr.querySelector("td:first-child img");
      // Verifica si el <img> tiene el atributo alt deseado
      return (
        imgElement &&
        (imgElement.alt === "Should have chosen" ||
          imgElement.alt === "Correct")
      );
    })
    .map((tr, index) => {
      // Selecciona el texto del <p> dentro del segundo <td>
      var pElement = tr.querySelector("td:nth-child(2) p");
      var element = {
        text: pElement ? pElement.textContent : "",
        id: index,
        valid: true,
      };
      return element;
    });

  // Agrega los textos encontrados en el <dd> al array principal
  if (textosEnDd.length > 0) {
    textosAgrupadosPorTr.push(textosEnDd);
  }
});

//---------------Guardar objeto

var allAnswers = questions.map((e, index) => {
  let answers = textos[index];
  let element = { question: e, answers: answers, id: index };
  return element;
});

var justAnswers = questions.map((e, index) => {
  let answers = textosAgrupadosPorTr[index];
  let element = { question: e, answers: answers, id: index };
  return element;
});
