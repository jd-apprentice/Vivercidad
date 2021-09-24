// Obtener usuario logeado de sessionStorage
export const userName = JSON.parse(
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

// Usuario logeado
const generateUser = (admin = "", color ="") => {
  // Generar usuario
  words = nombre.split("@");
    const elimB = document.querySelector("#elimSiUsuarioExist");
    elimB.style.display = "none";
    dropdown.innerHTML = dropdown.innerHTML = `<div class="dropdown">
        <button class="btn btn-${color} dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle me-1"></i>
        ${words[0]}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          ${admin}
          <li><a class="dropdown-item" style="cursor:pointer" id="logOut">Salir</a></li>
        </ul>
        </div>`;
  // Dropdown
  dNone.appendChild(dropdown);
  // Logout
  const logOut = document
      .querySelector("#logOut")
      .addEventListener("click", () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("Saliendo...");
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      });
};

// Usuarios normales
const dNone = document.querySelector(".insertName");
const dropdown = document.createElement("div");

// Pintar opciones de usuario en index - Usuario normal/admin
let words = "";
firebase.auth().onAuthStateChanged((user) => {
  if (user.emailVerified) {
    generateUser("", "outline-dark");
    // Si el usuario es el administrador
  } else if (user.uid == "t9NLsKRAT0S2ktmEoHANNfqeYhs2") {
    generateUser(`<li><a class="dropdown-item" href="./añadirProducto.html" style="cursor:pointer">Añadir Producto</a></li>`, "outline-dark");
  }
});