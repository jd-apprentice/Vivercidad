const loginF = document.querySelector("#lgForm");
const userName = document.querySelector("#userName");
const loginE = document.querySelector("#lgEmail");
const loginP = document.querySelector("#lgPass");
const googleAcc = document.querySelector("#googleAcc");
var provider = new firebase.auth.GoogleAuthProvider();

loginF.addEventListener("submit", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(loginE.value, loginP.value)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
      loginF.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

googleAcc.addEventListener("click", (e) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});

//Observador de estado
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     var uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
