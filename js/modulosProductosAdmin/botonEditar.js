import {
  getImput,
  getPrecio,
  db,
  modalProdName,
  modalProdPrice,
} from "../añadirProducto.js";

const modalBody = document.querySelector(".modal-body");
const spanName = document.createElement("span");
const spanPrice = document.createElement("span");
const imgProduct = document.createElement("img");

const insertBeforeName = modalBody.getElementsByTagName("input")[0];
const insertBeforePrice = modalBody.getElementsByTagName("input")[1];

let nombreP = "";
let precioP = "";
export let btnEdit = async () => {
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      nombreP = e.parentElement.children[1];
      precioP = e.parentElement.children[2];
      modalProdName.value = nombreP.innerHTML;
      modalProdPrice.value = precioP.innerHTML;
    });
  });
  spanName.innerText = "Nombre de producto";
  spanPrice.innerText = "Precio de producto";
  imgProduct.classList.add("img-fluid", "img-thumbnail");
  modalProdName.parentNode.insertBefore(spanName, insertBeforeName);
  modalProdPrice.parentNode.insertBefore(spanPrice, insertBeforePrice);
  // modalBody.appendChild(imgProduct);
};

// var storageRef = firebase.storage().ref(`imagenes/${modalNombre.value}`);

export let btnGuardar = async () => {
  let nameProduct = getImput();
  let precioProduct = getPrecio();

  nameProduct = modalProdName.value;
  precioProduct = modalProdPrice.value;

  await db.collection("carrousel").doc().set({
    nombre: nameProduct,
    precio: precioProduct,
  });
};
