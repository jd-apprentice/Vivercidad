<<<<<<< HEAD

const dNone = document.querySelector(".insertName");
const dropdown = document.createElement("div");

=======
// Obtener usuario logeado de sessionStorage
>>>>>>> development
const userName = JSON.parse(
  sessionStorage.getItem(
    "firebase:authUser:AIzaSyDo-Mx2Jz3j5MR9vH0V5ypYk3cQxYqYB7Y:[DEFAULT]"
  )
);

// Consulta si entro por email o por google
let nombre = "";
if (userName.displayName === null) {
  nombre = userName.email;
} else {
  nombre = userName.displayName;
}

// Usuarios normales
const dNone = document.querySelector(".insertName");
const dropdown = document.createElement("div");

// Pintar opciones de usuario en index - Usuario normal/admin
firebase.auth().onAuthStateChanged((user) => {
  if (user.emailVerified === true) {
    let words = "";
    const elimB = document.querySelector("#elimSiUsuarioExist");
    elimB.style.display = "none";
    words = nombre.split("@");
    dropdown.innerHTML = `<div class="dropdown">
        <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle me-1"></i>
        ${words[0]}
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
          .catch((error) => {});
      });
    // Si el usuario es el administrador
  } else if (user.uid == "t9NLsKRAT0S2ktmEoHANNfqeYhs2") {
    let words = "";
    words = nombre.split("@");
    const elimB = document.querySelector("#elimSiUsuarioExist");
    elimB.style.display = "none";
    dropdown.innerHTML = dropdown.innerHTML = `<div class="dropdown">
        <button class="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle me-1"></i>
        ${words[0]}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="./añadirProducto.html" style="cursor:pointer">Añadir Producto</a></li>
          <li><a class="dropdown-item" style="cursor:pointer" id="logOut">Salir</a></li>
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
            console.log(error);
          });
      });
  }
});