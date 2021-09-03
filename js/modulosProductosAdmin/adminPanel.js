//Modulos
import { addButtons } from "./anadirBotones.js";
import { btnEdit, btnGuardar } from "./botonEditar.js";

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
      });
      btnEdit();
      claseBoton();
      addButtons();
    });
};

// Variables
export const grabLista = document.querySelector("#listaProductos");
let idDocumento = "";

// Habilitar boton editar y tomar la ID del span
export let claseBoton = () => {
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      editarM.classList.remove("disabled");
      idDocumento = e.parentElement.children[1].id;
    });
  });
  return idDocumento;
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

//Boton editar Funciones
editarM.addEventListener("click", btnEdit);
salvarM.addEventListener("click", btnGuardar);
