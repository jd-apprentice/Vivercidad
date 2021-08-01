// Alertas

const grabAlertEmail = document.querySelector("#alertaEmail");
const grabAlertVerificar = document.querySelector("#alertaVerificar");
const grabAlertWelcome = document.querySelector("#Bienvenido");
const grabAlertRecu = document.querySelector("#alertaRecuperar");

// Seccion persistente

let userEmail = document.querySelector("#email");
let password = document.querySelector("#pass");

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(userEmail.value, password.value);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

//Create login

const formCreateUsr = document.querySelector("#usr-form");

formCreateUsr.addEventListener("submit", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail.value, password.value)
    .then((userCredential) => {
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
});

//User login

const loginF = document.querySelector("#lgForm");

loginF.addEventListener("submit", (e) => {
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
    .catch((error) => {
      alert(error.message);
    });
});

// Recuperar contraseña
const btnRecu = document.querySelector("#enviarMail");
const inputRecu = document.querySelector("#emailRecu");

btnRecu.addEventListener("click", (e) => {
  firebase
    .auth()
    .sendPasswordResetEmail(inputRecu.value)
    .then(() => {
      grabAlertRecu.style.display = "flex";
      setTimeout(() => {
        grabAlertRecu.style.display = "none";
      }, 4000);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
});

//Google login

const googleAcc = document.querySelector("#googleAcc");

googleAcc.addEventListener("click", (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      location.href = "./index.html";
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// Verificar

// let verificado = false;

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     verificado = user.emailVerified;
//     console.log(user);
//   } else {
//   }
// });
