//Modulos
import { btnEdit } from "./Botones/btnEdit.js";
import { btnCrear } from "./Botones/btnCrear.js";
import { btnBorrar } from "./Botones/btnBorrar.js";
import { btnGuardar } from "./Botones/btnGuardar.js";

// Inicializar Firebase
export const db = firebase.firestore();
export const storage = firebase.storage();

// Variables
export const editarM = document.querySelector("#editarM");
export const buttonBorrar = document.querySelector("#borrarButton");
export const buttonCrear = document.querySelector("#crearButton");
export const salvarM = document.querySelector("#editarCambios");
export const modalProdName = document.querySelector("#modalProdName");
export const modalProdPrice = document.querySelector("#modalProdPrice");
export const modalProdDesc = document.querySelector("#modalProdDesc");
export const grabLista = document.querySelector("#listaProductos");

// Cargar atributos en carga de página
export const mostrarOnLoad = async () => {
  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      // Inicializar valores
      let nombreDB = "";
      let descripcionDB = "";
      let precioDB = 0;
      let numeroProducto = 1;
      // Por cada elemento en la colección
      querySnapshot.forEach((doc) => { 
        // Tomar nombre, precio, descripcion y ID de cada producto
        nombreDB = doc.data().nombre;
        precioDB = doc.data().precio; 
        descripcionDB = doc.data().descripcion; 
        idDocumento = doc.data().id; 
        // Crear Elementos
        let createRow = document.createElement("tr");
        let createHead = document.createElement("td");
        let createEdit = document.createElement("td");
        let createCheckBock = document.createElement("input");
        let createName = document.createElement("td");
        let createPrice = document.createElement("td");
        let createDesc = document.createElement("td");
        // Ordenar Elementos
        createRow.appendChild(createEdit);
        createEdit.appendChild(createCheckBock);
        createRow.appendChild(createHead);
        createRow.appendChild(createName);
        createRow.appendChild(createPrice);
        createRow.appendChild(createDesc);
        createName.innerHTML = nombreDB;
        createPrice.innerHTML = precioDB;
        createDesc.innerHTML = descripcionDB;
        createHead.innerHTML = numeroProducto++;
        // Clases, atributos y eventos
        createCheckBock.type = "radio";
        createCheckBock.name = "flexRadioDefault";
        createCheckBock.className = "form-check-input";
        createHead.className = "id_admin";
        createHead.setAttribute("scope", "row");
        createName.setAttribute("class", idDocumento);
        createName.setAttribute("id", idDocumento);
        createPrice.setAttribute("id", "precioProducto");
        createDesc.setAttribute("id", "descripcionProducto");
        grabLista.appendChild(createRow); // Cargar todo a la Tabla
      });
      btnEdit();
      claseBoton();
    });
};

mostrarOnLoad();

// Habilitar boton editar y tomar la ID del span
let idDocumento = "";
export let claseBoton = () => {
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      editarM.classList.remove("disabled");
      buttonBorrar.classList.remove("disabled");
      idDocumento = e.parentElement.parentElement.children[2].id
    });
  });
  return idDocumento;
};

// Pintar productos en la lista
export let getImput = () => {
  const nameProduct = document.querySelector(".nameProduct").value;
  return nameProduct;
};

export let getPrecio = () => {
  const precioProduct = document.querySelector(".precioProducto").value;
  return precioProduct;
};

export let getDescripcion = () => {
  const descripcionProduct = document.querySelector(".descripcionProducto").value;
  return descripcionProduct;
};

//Boton editar Funciones
editarM.addEventListener("click", btnEdit);
salvarM.addEventListener("click", btnGuardar);
buttonBorrar.addEventListener("click", btnBorrar);
buttonCrear.addEventListener("click", btnCrear);