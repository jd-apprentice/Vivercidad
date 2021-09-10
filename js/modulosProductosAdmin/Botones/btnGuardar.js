import { saveName } from "./btnEdit.js";
import { claseBoton, db } from "../adminPanel.js";
import { obtenerMetadatos } from "./btnEdit.js";

// Variables globales
let inputImage = document.querySelector("#fileItemModal");
let allInputImage = "";

// Adquirir propiedades del archivo
inputImage.addEventListener("change", () => allInputImage = inputImage.files[0]);

// Boton guardar - Subir
export let btnGuardar = async () => {
    let getName = saveName(); // Nombre
    let idDocumento = claseBoton(); // Obtener id del documento
    let storageRef = await firebase.storage().ref(`imagenes/${idDocumento}`); // Ruta donde estan las imagenes
    // Subir Archivo y actualizar base de datos
    if (allInputImage != "") {
      await storageRef.put(allInputImage, obtenerMetadatos());
    }
    await db.collection("carrousel").doc(idDocumento).set({
      descripcion: modalProdDesc.value,
      id: idDocumento,
      nombre: getName,
      precio: modalProdPrice.value,
    });
    setTimeout(() => {
    // Close modal after 3 seconds
    const cerrarModal = document.querySelector(".cerrarModal");
    cerrarModal.click();
    }, 1000);
  };