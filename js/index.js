const htmlName = document.querySelector("#changeName");
const btnSalir = document.querySelector("#btnDropDo");
const btnDrop = document.querySelector("#dropdownMenuButton1");

const userName = JSON.parse(
  sessionStorage.getItem(
    "firebase:authUser:AIzaSyDo-Mx2Jz3j5MR9vH0V5ypYk3cQxYqYB7Y:[DEFAULT]"
  )
);
htmlName.innerText = userName.displayName;

btnSalir.addEventListener("click", () => {
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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    btnDrop.removeClass("dropdown-toggle show");
  }
});
