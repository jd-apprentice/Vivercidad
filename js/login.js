const loginF = document.querySelector("#lgForm");
const userName = document.querySelector("#userName");
const googleAcc = document.querySelector("#googleAcc");
const btnLogin = document.querySelector("#loginBtn");
const btnCreateU = document.querySelector("#createU");
const btnLogout = document.querySelector("#btnLogout");
const formCreateUsr = document.querySelector("#usr-form");
const modalCreateU = document.querySelector("#CreateUsr");

let btns = () => {
  btnLogin.style.display = "none";
  googleAcc.style.display = "none";
  btnCreateU.style.display = "none";
  btnLogout.style.display = "block";
  btnLogout.style.margin = "0 auto";
};

let userEmail = document.querySelector("#email");
let password = document.querySelector("#pass");

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase
      .auth()
      .signInWithEmailAndPassword(userEmail.value, password.value);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

formCreateUsr.addEventListener("submit", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert("El usuario se creo correctamente");
    })
    .catch((error) => {
      alert(error);
    });
});

loginF.addEventListener("submit", (e) => {
  e.preventDefault();
  let loginE = document.querySelector("#lgEmail");
  let loginP = document.querySelector("#lgPass");
  firebase
    .auth()
    .signInWithEmailAndPassword(loginE.value, loginP.value)
    .then((userCredential) => {
      btns();
      loginF.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

googleAcc.addEventListener("click", (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      btns();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

btnLogout.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("salimo");
      btnLogin.style.display = "block";
      googleAcc.style.display = "block";
      btnCreateU.style.display = "block";
      btnLogout.style.display = "none";
    })
    .catch((error) => {
      console.log(error.message);
    });
});

//
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
  }
});
