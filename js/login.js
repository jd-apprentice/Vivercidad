const loginF = document.querySelector("#lgForm");
const userName = document.querySelector("#userName");
const googleAcc = document.querySelector("#googleAcc");
const btnLogin = document.querySelector("#loginBtn");
const btnCreateU = document.querySelector("#createU");
const formCreateUsr = document.querySelector("#usr-form");
const modalCreateU = document.querySelector("#CreateUsr");

let verificado = false;

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
formCreateUsr.addEventListener("submit", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail.value, password.value)
    .then((userCredential) => {
      // Signed in
      alert(
        "El usuario se creo correctamente, por favor confirme su mail para poder ingresar"
      );
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          console.log("se envio correctamente");
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

//User login
loginF.addEventListener("submit", (e) => {
  e.preventDefault();
  let loginE = document.querySelector("#lgEmail");
  let loginP = document.querySelector("#lgPass");
  firebase
    .auth()
    .signInWithEmailAndPassword(loginE.value, loginP.value)
    .then((userCredential) => {
      if (userCredential.user.emailVerified == false) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            alert("por favor verifique se mail antes de entrar");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        alert("Bienvenide!");
        location.href = "./index.html";
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});

//Google login
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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    verificado = user.emailVerified;
    console.log(user);
  } else {
  }
});
