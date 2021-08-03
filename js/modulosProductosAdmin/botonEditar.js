import {
  editarM,
  modalProdName,
  modalProdPrice,
  db,
} from "../añadirProducto.js";

const modalNombre = document.querySelector("#modalProdName").value;
const modalPrecio = document.querySelector("#modalProdPrice").value;

export let btnEdit = async () => {
  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        for (let i = 0; i < doc.lenght; i++) {
          modalNombre = doc.data().nombre[i]
          return modalNombre;
        }
      });
    });
};
