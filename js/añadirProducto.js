//Modulos

import { addButtons } from "../js/modulosProductosAdmin/anadirBotones.js";
import { pintarProductos } from "../js/modulosProductosAdmin/pintarProductos.js";

// Inicializar Firebase
// var storage = firebase.storage();
export const db = firebase.firestore();

// Cuando la pantalla carga verifica la lista de productos para agregar los botones

window.onload = async () => {
  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      let contP = 0;
      let nombreDB = "";
      querySnapshot.forEach((doc) => {
        if (contP < 4) {
          nombreDB = doc.data().nombre;
          let label = document.createElement("label");
          let input = document.createElement("input");
          let span = document.createElement("span");
          input.classList.add("form-check-input", "me-1");
          label.classList.add("list-group-item", "form-check-label");
          input.type = "radio";
          input.name = "flexRadioDefault"
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
export const grabLista = document.querySelector("#listaProductos");

let archivo = document.querySelector("#fileItem");
let fileAll = "";
let fileName = "";
let cont = 0;
let cont_carousel = 0;
let botonDisplay = false;

// LocalStorage

let contadorCheck = localStorage.getItem("contadorCheck");

// Toma nombre de archivo
archivo.addEventListener("change", () => {
  fileAll = archivo.files[0];
  fileName = archivo.files[0].name;
});

// Pintar productos en la lista

export let getImput = () => {
  const nameProduct = document.querySelector("#nameProduct").value;
  return nameProduct;
};

// Subir productos a firebase y actualizar lista

btnSubir.addEventListener("submit", async (e) => {
  e.preventDefault();
  let contadorCheck = localStorage.getItem("contadorCheck");
  if (contadorCheck < 4) {
    // Generar contador en localstorage
    const nameProduct = await getImput();
    // const precioProduct = document.querySelector("#precioP").value;
    var storageRef = firebase.storage().ref(`imagenes/${nameProduct}`);
    await storageRef.put(fileAll).then(function (snapshot) {
      console.log("Uploaded a blob or file!");
      localStorage.setItem(
        "contadorCheck",
        Number(localStorage.getItem("contadorCheck")) + 1
      );
    });
    pintarProductos();
    addButtons();
    btnSubir.reset();
  } else {
    alert("Esta lleno");
  }
});