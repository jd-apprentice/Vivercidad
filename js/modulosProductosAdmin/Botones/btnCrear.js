// Modulos
import { db } from "../adminPanel.js";

// Aumentar Contador
export const actualizarContador = (operador) => {
  db.collection("adminContador").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const contador = doc.data().cont;
      db.collection("adminContador").doc("contador").update({
        cont: `${operador}` === "+" ? contador + 1 : contador - 1,
      });
    });
  });
};

// Boton Crear
export let btnCrear = async () => {
    await db
      .collection("carrousel")
      .doc()
      .set({ // Crear documento
        descripcion: "Edita este producto libremente",
        id: "",
        nombre: "Producto Nuevo",
        precio: 0,
      })
      .then(async() => {
        await db.collection("carrousel")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async(doc) => {
              if (doc.data().nombre === "Producto Nuevo" && doc.data().id === "") { // Si es el documento creado
                await db.collection("carrousel").doc(doc.id).update({ // Cargar ID del documento
                  id: doc.id,
                });
              } else {
                return; // Si no es el documento creado, no hace nada
              }
            });
            setTimeout(() => {
              location.reload();
            }, 500);
          });
        actualizarContador("+");
      });
  };