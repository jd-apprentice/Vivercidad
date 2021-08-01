// Inicializar Firebase
var storage = firebase.storage();
const db = firebase.firestore();

// Cuando la pantalla carga verifica la lista de productos para agregar los botones

window.onload = async () => {
  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      let contP = 0;
      querySnapshot.forEach((doc) => {
        if (contP < 4) {
          nombreDB = doc.data().nombre;
          let label = document.createElement("label");
          let input = document.createElement("input");
          let span = document.createElement("span");
          input.classList.add("form-check-input", "me-1");
          label.classList.add("list-group-item");
          input.type = "checkbox";
          input.value = "";
          span.innerText = nombreDB;
          label.append(input, span);
          grabLista.append(label);
          contP++;
        }
      });
    });
  // LocalStorage
  let contadorCheck = localStorage.getItem("contadorCheck");
  if (contadorCheck == 4) {
    addButtons();
  }
};

// Variables
const btnSubir = document.querySelector("#lgForm");
const grabLista = document.querySelector("#listaProductos");

let botonDisplay = false;
let archivo = document.querySelector("#fileItem");
let fileAll = "";
let fileName = "";
let cont = 0;
let cont_carousel = 0;
let botonDisplay = false;

//Obtener Carrousel - Contador

/* // Obtener contador de firebase
db.collection("saveContador")
  .doc("JgYMERdLqjAok2wIoFV8")
  .onSnapshot((doc) => {
    cont = doc.data().contador;
  }); */

// Toma nombre de archivo
archivo.addEventListener("change", () => {
  fileAll = archivo.files[0];
  fileName = archivo.files[0].name;
});

// Pintar productos en la lista

let getImput = () => {
  const nameProduct = document.querySelector("#nameProduct").value;
  return nameProduct;
};

let paintProductos = () => {
  const nameProduct = getImput();

  let createLabel = document.createElement("label");
  let createInput = document.createElement("input");
  let createSpan = document.createElement("span");

  createLabel.classList.add("list-group-item");
  createInput.classList.add("form-check-input", "me-1");
  createInput.value = "";
  createInput.type = "checkbox";
  createSpan.textContent = `${nameProduct}`;
  createLabel.appendChild(createInput);
  createLabel.appendChild(createSpan);
  grabLista.appendChild(createLabel);

  db.collection("carrousel").doc().set({
    nombre: nameProduct,
  });
};

// Agregar botones de paginas

let addButtons = () => {
  let contadorCheck = localStorage.getItem("contadorCheck");
  if (contadorCheck == 4) {
    const padreBoton = document.createElement("div");
    const btnSig = document.createElement("button");
    const btnAnt = document.createElement("button");
    const btnAnadirCarrousel = document.createElement("button");
    padreBoton.classList.add("d-flex", "justify-content-between");
    btnSig.classList.add("btn", "btn-success");
    btnAnt.classList.add("btn", "btn-success");
    btnAnadirCarrousel.classList.add("btn", "btn-warning");
    btnSig.type = "button";
    btnAnt.type = "button";
    btnAnadirCarrousel.type = "button";
    btnAnadirCarrousel.innerText = "Añadir al carrousel";
    btnAnt.innerText = "<==";
    btnSig.innerText = "==>";
    padreBoton.appendChild(btnAnt);
    padreBoton.appendChild(btnAnadirCarrousel);
    padreBoton.appendChild(btnSig);
    grabLista.appendChild(padreBoton);
  }
};

// Subir productos a firebase y actualizar lista

btnSubir.addEventListener("submit", async (e) => {
  let contadorCheck = localStorage.getItem("contadorCheck");
  if (contadorCheck < 4) {
    // Generar contador en localstorage
    const nameProduct = getImput();
    const precioProduct = document.querySelector("#precioP").value;
    var storageRef = firebase.storage().ref(`imagenes/${nameProduct}`);
    await storageRef.put(fileAll).then(function (snapshot) {
      console.log("Uploaded a blob or file!");
      localStorage.setItem(
        "contadorCheck",
        Number(localStorage.getItem("contadorCheck")) + 1
      );
    });
    paintProductos();
    addButtons();
  } else {
    alert("Esta lleno");
  }
});