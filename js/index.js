const dNone = document.querySelector(".insertName");
const dropdown = document.createElement("div");

const userName = JSON.parse(
  sessionStorage.getItem(
    "firebase:authUser:AIzaSyDo-Mx2Jz3j5MR9vH0V5ypYk3cQxYqYB7Y:[DEFAULT]"
  )
);
let nombre = "";
if (userName.displayName === null) {
  nombre = userName.email;
} else {
  nombre = userName.displayName;
}

firebase.auth().onAuthStateChanged((user) => {
  if (user.emailVerified === true) {
    const elimB = document.querySelector("#elimSiUsuarioExist");
    elimB.style.display = "none";
    dropdown.innerHTML = `<div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle me-1"></i>  
        ${nombre}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" id="logOut">Salir</a></li>
        </ul>
        </div>`;
    dNone.appendChild(dropdown);
    const logOut = document
      .querySelector("#logOut")
      .addEventListener("click", () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("Salimo");
            location.reload();
          })
          .catch((error) => {
            // An error happened.
          });
      });
  }
});
