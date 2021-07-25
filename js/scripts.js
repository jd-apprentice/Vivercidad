const loginF = document.querySelector("#lgForm");
const userName = document.querySelector("#userName");
const googleAcc = document.querySelector("#googleAcc");
const btnLogin = document.querySelector("#loginBtn");
const btnCreateU = document.querySelector("#createU");
const btnLogout = document.querySelector("#btnLogout");
const formCreateUsr = document.querySelector("#usr-form");

let btns = () => {
  btnLogin.style.display = "none";
  googleAcc.style.display = "none";
  btnCreateU.style.display = "none";
  btnLogout.style.display = "block";
  btnLogout.style.margin = "0 auto";
};

formCreateUsr.addEventListener("click", (e) => {
  e.preventDefault();
  let userName = document.querySelector("#email");
  let password = document.querySelector("#pass");
  firebase
    .auth()
    .createUserWithEmailAndPassword(userName.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Se creo correctamente");
      // ...
    })
    .catch((error) => {
      console.log(error);
      // ..
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
      var user = userCredential.user;
      console.log("Exito");
      btns();
      loginF.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

//Movile loggin
googleAcc.addEventListener("click", (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("bien ahi");
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
