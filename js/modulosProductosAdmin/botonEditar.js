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
        modalProdName.value = doc.data().nombre;
        modalProdPrice.value = doc.data().precio;
        console.log(doc.data().nombre);
      });
    });
};
