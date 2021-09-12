import { saveName } from "./btnEdit.js";
import { claseBoton, db} from "../adminPanel.js";
import { obtenerMetadatos, getModalEdit} from "./btnEdit.js";

// Variables globales
let inputImage = document.querySelector("#fileItemModal");
let allInputImage = "";
let dataLista = "";

// Adquirir propiedades del archivo
inputImage.addEventListener("change", () => allInputImage = inputImage.files[0]);

// Obtener numero de lista
const grabLista = document.querySelectorAll(".listaProductos");
grabLista.forEach(element => {
   if (element.dataset.lista === "1") {
      dataLista = element.dataset.lista;
   } else if (element.dataset.lista === "2") {
      dataLista = element.dataset.lista;
   }
});

console.log(dataLista);

// Boton guardar - Subir
export let btnGuardar = async (coleccion) => {
    let idDocumento = claseBoton(); // Obtener id del documento
    let getName = saveName(); // Nombre

    if (getModalEdit.id === idDocumento && grabLista.dataset.lista === "1") {
      coleccion = "1"
    } else {
      coleccion = "2"
    }

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
    }, 1000);
  };