import {
  editarM,
  modalProdName,
  modalProdPrice,
  getImput, 
  getPrecio,
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
        modalProdName.value = doc.data().nombre;
        modalProdPrice.value = doc.data().precio;
        console.log(doc.data().nombre);
      });
    });
};

export let btnGuardar = async () => {

  let nameProduct = getImput();
  let precioProduct = getPrecio();

  nameProduct = modalNombre.value;
  precioProduct = modalPrecio.value;

  await db.collection("carrousel").doc().set({
    nombre: nameProduct,
    precio: precioProduct,
  });
}