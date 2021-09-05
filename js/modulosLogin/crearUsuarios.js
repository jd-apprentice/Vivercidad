import { userEmail, password, grabAlertEmail } from "./login.js";

export let crearUsuario = (e) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail.value, password.value)
    .then(() => {
      // Signed in
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          grabAlertEmail.style.display = "flex";
          setTimeout(() => {
            location.href = "./login.html";
          }, 5000);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
};
