import {
  editarM,
  modalProdName,
  modalProdPrice,
  db,
} from "../añadirProducto.js";

export let btnEdit = async () => {
  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().nombre);
      });
    });
};
