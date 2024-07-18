//// PREGUNTAS
// var pElements = Array.from(document.getElementsByClassName("quiz-report")[0].children);
// var questions = pElements
//   .map((element) => element.querySelector("dt > p:not([class])")?.textContent)
//   .filter((o) => o !== undefined);

//--------------------------------Con imagenes-----------------------------
var pElements = document.querySelectorAll("dt");
var questions = Array.from(pElements).map((e) => {
  let text = e.querySelector("p:not([class])").textContent;
  let img = e.querySelector("p.rtecenter > img")?.src;
  return {
    text: text,
    img: img,
  };
});

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
      valid: imgElement && (imgElement.alt === "Should have chosen" || imgElement.alt === "Correct"),
      id: index,
    };
    element.valid = element.valid === null ? false : element.valid;
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
      return imgElement && (imgElement.alt === "Should have chosen" || imgElement.alt === "Correct");
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
  let element = { question: e.text, answers: answers, id: index, img: e.img };
  return element;
});

// var justAnswers = questions.map((e, index) => {
//   let answers = textosAgrupadosPorTr[index];
//   let element = { question: e.text, answers: answers, id: index,  };
//   return element;
// });
