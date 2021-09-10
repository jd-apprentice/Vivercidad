// Modulos
import { claseBoton, db } from "../adminPanel.js";

// Boton eliminar
export let btnBorrar = async () => {
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
    await db.collection("carrousel").doc(idDocumento).delete(); // Eliminar documento
    setTimeout(() => {
      location.reload();
    }, 500);
    } catch (error) {
      console.log(error);
    }
  };