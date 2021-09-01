//Modulos

import { addButtons } from "../js/modulosProductosAdmin/anadirBotones.js";
import { pintarProductos } from "../js/modulosProductosAdmin/pintarProductos.js";
import {
  pintarInputs,
  btnGuardar,
  btnEdit,
} from "../js/modulosProductosAdmin/botonEditar.js";
// Inicializar Firebase
export const db = firebase.firestore();
export const storage = firebase.storage();

//Btn Editar Modal
export const editarM = document.querySelector("#editarM");
export const salvarM = document.querySelector("#editarCambios");
export const modalProdName = document.querySelector("#modalProdName");
export const modalProdPrice = document.querySelector("#modalProdPrice");

// Cuando la pantalla carga verifica la lista de productos para agregar los botones

window.onload = async () => {
  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      let contP = 0;
      let nombreDB = "";
      let precioDB = 0;
      let idSpan = "";
      querySnapshot.forEach((doc) => {
        if (contP < 4) {
          nombreDB = doc.data().nombre;
          precioDB = doc.data().precio;
          idSpan = doc.id;
          let label = document.createElement("label");
          let input = document.createElement("input");
          let span = document.createElement("span");
          let spanP = document.createElement("span");
          input.classList.add("form-check-input", "me-1");
          label.classList.add("list-group-item", "form-check-label");
          input.type = "radio";
          input.name = "flexRadioDefault";
          span.classList.add("mx-4");
          span.setAttribute("id", idSpan);
          span.innerText = nombreDB;
          spanP.innerText = precioDB;
          label.append(input, span, spanP);
          grabLista.append(label);
          contP++;
        }
      });
      claseBoton();
    });
  const Test = document.querySelectorAll(".form-check-input");
  Test.forEach((e) => {
    e.addEventListener("change", () => pintarInputs());
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
// Toma el archivo
archivo.addEventListener("change", () => {
  fileAll = archivo.files[0];
});

// Habilitar boton editar

export let claseBoton = () => {
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => editarM.classList.remove("disabled"));
  });
};

// Pintar productos en la lista

export let getImput = () => {
  const nameProduct = document.querySelector("#nameProduct").value;
  return nameProduct;
};

export let getPrecio = () => {
  const precioProduct = document.querySelector("#precioP").value;
  return precioProduct;
};

let getId = () => {
  let x = Math.random() * 10;
  return x;
};
export let seSubioIMG = false;

const idProducto = getId();
export const idEstatica = idProducto;
// Subir productos a firebase y actualizar lista ESTO ESTA BIEN NO TOCAR KPO!!!!!!
btnSubir.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Generar contador en localstorage
  let contadorCheck = localStorage.getItem("contadorCheck");
  if (contadorCheck < 4) {
    var storageRef = firebase.storage().ref(`imagenes/${idEstatica}`);
    if (fileAll != "") {
      await storageRef.put(fileAll);
      seSubioIMG = true;
    }
    localStorage.setItem(
      "contadorCheck",
      Number(localStorage.getItem("contadorCheck")) + 1
    );
    pintarProductos();
    addButtons();
    // btnEdit();
    btnSubir.reset();
  } else {
    alert("Esta lleno");
  }
});

//Boton editar Funciones

editarM.addEventListener("click", btnEdit);
salvarM.addEventListener("click", btnGuardar);
