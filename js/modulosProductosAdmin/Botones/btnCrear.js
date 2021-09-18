// Modulos
import { db, mostrarOnLoad } from "../adminPanel.js";

// Variables
const buttonCrear = document.querySelectorAll(".crearButton");
export let numero = "";

// Obtener boton presionado
buttonCrear.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    numero = e.target.dataset.numero;
  });
});

// Boton Crear
export let btnCrear = async (coleccion) => { 
  // Si dataset es igual al boton presionado asignar la collecion
  if (numero === "1") {
    coleccion = "carrousel";
  } else if (numero === "2") {
    coleccion = "carrousel2";
  }
  // Obtener datos
  await db
    .collection(coleccion)
    .doc()
    .set({
      // Crear documento
      descripcion: "Edita este producto libremente",
      id: "",
      nombre: "Producto Nuevo",
      precio: 0,
    })
    .then(async () => {
      await db
        .collection(coleccion)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            if (
              doc.data().nombre === "Producto Nuevo" &&
              doc.data().id === ""
            ) {
              // Si es el documento creado
              await db.collection(coleccion).doc(doc.id).update({
                // Cargar ID del documento
                id: doc.id,
              });
            } else {
              return; // Si no es el documento creado, no hace nada
            }
          });
        });
        setTimeout(() => {
      mostrarOnLoad(coleccion);
    }, 1000);
  });
};
