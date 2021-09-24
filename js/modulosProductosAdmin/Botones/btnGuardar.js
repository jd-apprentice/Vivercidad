import { saveName } from "./btnEdit.js";
import { claseBoton, db, mostrarOnLoad } from "../adminPanel.js";
import { obtenerMetadatos } from "./btnEdit.js";

// Variables globales
let inputImage = document.querySelector("#fileItemModal");
const getGuardar = document.querySelector(".editarCambios");
let allInputImage = "";

// Obtener tabla
let getCarrousel = [];
const getTabla = document.querySelectorAll(".getTabla");
getTabla.forEach((element) => {
  getCarrousel.push(element.textContent);
});

// Adquirir propiedades del archivo
inputImage.addEventListener(
  "change",
  () => (allInputImage = inputImage.files[0])
);

// Boton guardar - Subir
export let btnGuardar = async (coleccion) => {
  if (getGuardar.dataset.lista === "1") {
    coleccion = "carrousel";
  } else {
    coleccion = "carrousel2";
  }

  let idDocumento = claseBoton(); // Obtener id del documento
  let getName = saveName(); // Nombre

  let storageRef = await firebase.storage().ref(`imagenes/${idDocumento}`); // Ruta donde estan las imagenes
  // Subir Archivo y actualizar base de datos
  if (allInputImage != "") {
    await storageRef.put(allInputImage, obtenerMetadatos());
  }
  await db.collection(coleccion).doc(idDocumento).set({
    descripcion: modalProdDesc.value,
    id: idDocumento,
    nombre: getName,
    precio: modalProdPrice.value,
  });

  setTimeout(() => {
    // Close modal after 3 seconds
    const cerrarModal = document.querySelector(".cerrarModal");
    cerrarModal.click();
    mostrarOnLoad(coleccion);
  }, 1000);
};
