const span = document.querySelector("span");
const buttons = document.querySelectorAll("button");
const spaceButton = document.querySelector(".space");
const backspaceButton = document.querySelector(".back");
const shiftButtons = document.querySelectorAll(".shift");

let textContent = ""; 
let isShiftActive = false; 


function setLettersToLowerCase() {
  buttons.forEach((button) => {
    if (button.classList.contains("bouton") && button.textContent.match(/[A-Z]/)) {
      button.textContent = button.textContent.toLowerCase();
    }
  });
}


function setLettersToUpperCase() {
  buttons.forEach((button) => {
    if (button.classList.contains("bouton") && button.textContent.match(/[a-z]/)) {
      button.textContent = button.textContent.toUpperCase();
    }
  });
}


buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (button === spaceButton) {
      const selection = window.getSelection().toString();
      textContent += selection ? selection : " ";
    } else if (button === backspaceButton) {
      // Gestion de la touche Backspace
      textContent = textContent.slice(0, -1); // Enlève la dernière lettre
    } else if (button.classList.contains("shift")) {
      // Gestion de la touche Shift
      isShiftActive = !isShiftActive;
      if (isShiftActive) {
        setLettersToUpperCase();
      } else {
        setLettersToLowerCase();
      }
    } else {
      // Ajoutez simplement le texte du bouton à la chaîne de texte
      textContent += buttonText;
    }

    // Mettre à jour le contenu affiché sur l'écran
    span.textContent = textContent;
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key === "Backspace") {
    e.preventDefault(); 
    textContent = textContent.slice(0, -1); 
  } else if (key === "Shift") {
    isShiftActive = true;
    setLettersToUpperCase();
  } else if (key === " ") {
    textContent += " ";
  } else if (key.length === 1) { // Pour s'assurer que c'est une seule lettre ou chiffre
    textContent += isShiftActive ? key.toUpperCase() : key.toLowerCase();
  }

  // Mettre à jour le contenu affiché sur l'écran
  span.textContent = textContent;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Shift") {
    isShiftActive = false;
    setLettersToLowerCase();
  }
});



