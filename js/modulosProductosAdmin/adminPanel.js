//Modulos
import { btnEdit } from "./Botones/btnEdit.js";
import { btnCrear } from "./Botones/btnCrear.js";
import { btnBorrar } from "./Botones/btnBorrar.js";
import { btnGuardar } from "./Botones/btnGuardar.js";

// Inicializar Firebase
export const db = firebase.firestore();
export const storage = firebase.storage();

// Variables
export const grabInputs = document.querySelectorAll(".form-check-input");
export const editarM = document.querySelector("#editarM");
export const editarM2 = document.querySelector("#editarM2");
export const buttonBorrar = document.querySelectorAll(".borrarButton");
export const buttonCrear = document.querySelectorAll(".crearButton");
export const salvarM = document.querySelector(".editarCambios");
export const modalProdName = document.querySelector("#modalProdName");
export const modalProdPrice = document.querySelector("#modalProdPrice");
export const modalProdDesc = document.querySelector("#modalProdDesc");
export const grabLista = document.querySelectorAll(".listaProductos");

// Cargar atributos en carga de página
export const mostrarOnLoad = async (coleccion) => {
  // Limpiar Tabla
  await db
    .collection(coleccion)
    .get()
    .then((querySnapshot) => {
      updateCreate(coleccion); // Actualizar botones crear
      // Valores de los atributos
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
        if (coleccion == "carrousel") {
          grabLista[0].appendChild(createRow);
          createCheckBock.dataset.numero = "1";
        } else if (coleccion == "carrousel2") {
          grabLista[1].appendChild(createRow);
          createCheckBock.dataset.numero = "2";
        }
      });
      grabRadio();
      btnEdit();
      claseBoton();
    });
};

mostrarOnLoad("carrousel");
mostrarOnLoad("carrousel2");

// Actualizar Boton Crear
export const updateCreate = async (coleccion) => {
  // Botones crear
  const arrBtn = [];
  buttonCrear.forEach((btn) => {
    arrBtn.push(btn);
  });

  await db
    .collection(coleccion)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size <= 7 && coleccion === "carrousel") {
        arrBtn[0].classList.remove("disabled");
      } else if (querySnapshot.size <= 7 && coleccion === "carrousel2") {
        arrBtn[1].classList.remove("disabled");
      }
    });
};

// Carrouseles
const arrLista = [];
grabLista.forEach((lista) => {
  arrLista.push(lista);
});

// Botones
const arrBtn = [];
buttonBorrar.forEach((btn) => {
  arrBtn.push(btn);
});

// Cargar ID's
let idDocumento = "";
export let claseBoton = () => {
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      idDocumento = e.parentElement.parentElement.children[2].id;
    });
  });
  return idDocumento;
};

// Manipular inputs
const grabRadio = () => {
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      if (e.dataset.numero === "1") {
        arrBtn[0].classList.remove("disabled");
        arrBtn[1].classList.add("disabled");
        editarM.classList.remove("disabled");
        editarM2.classList.add("disabled");
      } else if (e.dataset.numero === "2") {
        arrBtn[1].classList.remove("disabled");
        arrBtn[0].classList.add("disabled");
        editarM2.classList.remove("disabled");
        editarM.classList.add("disabled");
      }
    });
  });
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
  const descripcionProduct = document.querySelector(
    ".descripcionProducto"
  ).value;
  return descripcionProduct;
};

//Boton editar Funciones
editarM.addEventListener("click", btnEdit);
editarM2.addEventListener("click", btnEdit);
salvarM.addEventListener("click", btnGuardar);
buttonBorrar.forEach((e) => {
  e.addEventListener("click", btnBorrar);
});
buttonCrear.forEach((e) => {
  e.addEventListener("click", btnCrear);
});
