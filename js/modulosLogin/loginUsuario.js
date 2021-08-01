// Modulos

import { grabAlertVerificar, grabAlertWelcome } from "../login.js";

export let loginUser = (e) => {
  e.preventDefault();
  let loginE = document.querySelector("#lgEmail");
  let loginP = document.querySelector("#lgPass");
  firebase
    .auth()
    .signInWithEmailAndPassword(loginE.value, loginP.value)
    .then((userCredential) => {
      if (
        userCredential.user.emailVerified == false &&
        userCredential.user.uid != "t9NLsKRAT0S2ktmEoHANNfqeYhs2"
      ) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            grabAlertVerificar.style.display = "flex";
            setTimeout(() => {
              grabAlertVerificar.style.display = "none";
            }, 5000);
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        grabAlertWelcome.style.display = "flex";
        grabAlertWelcome.style.display = "justify-content-center";
        setTimeout(() => {
          location.href = "./index.html";
        }, 3000);
      }
    })

    // Se equivoco de contraseña
    .catch((error) => {
      alert(error.message);
    });
};
