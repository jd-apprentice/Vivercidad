// Modulos

import { grabAlertRecu, inputRecu } from "./login.js";

export let recuperarContra = (e) => {
  e.preventDefault();
  firebase
    .auth()
    .sendPasswordResetEmail(inputRecu.value)
    .then(() => {
      grabAlertRecu.style.display = "flex";
      setTimeout(() => {
        grabAlertRecu.style.display = "none";
      }, 4000);
    });
};
