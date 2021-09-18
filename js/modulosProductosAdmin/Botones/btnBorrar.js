// Modulos
import { claseBoton, db, updateCreate} from "../adminPanel.js";

// Obtener boton presionado
const buttonBorrar = document.querySelectorAll(".borrarButton");
let numero = "";
buttonBorrar.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    numero = e.target.dataset.numero;
  });
});

// Boton eliminar
export let btnBorrar = async (coleccion) => {
  // Si dataset es igual al boton presionado asignar la collecion
  if (numero === "1") {
    coleccion = "carrousel";
  } else if (numero === "2") {
    coleccion = "carrousel2";
  }

  let idDocumento = claseBoton();
  let storageRef = await firebase.storage().ref(`imagenes/${idDocumento}`); // Ruta donde estan las imagenes
  // Si existe la imagen, la elimina
  if (storageRef.getDownloadURL() != null) {
    try {
      await storageRef.delete();
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const getTR = document.getElementById(idDocumento);
    await db.collection(coleccion).doc(idDocumento).delete(); // Eliminar documento
    getTR.parentNode.remove(); // Eliminar Row
    updateCreate(coleccion);
  } catch (error) {
    console.log(error);
  }
};
