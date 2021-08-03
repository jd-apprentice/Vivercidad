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
<<<<<<< HEAD
        for (let i = 0; i < doc.lenght; i++) {
          modalNombre = doc.data().nombre[i]
          return modalNombre;
        }
=======
        modalProdName.value = doc.data().nombre;
        modalProdPrice.value = doc.data().precio;
        console.log(doc.data().nombre);
>>>>>>> a32d630ba6fe4fb49d2af3dd763e9d7d1a471a58
      });
    });
};
