import { db, modalProdName, modalProdPrice } from "../añadirProducto.js";

const modalBody = document.querySelector(".modal-body");
const spanName = document.createElement("span");
const spanPrice = document.createElement("span");
const imgProduct = document.createElement("img");

let nombreAeditar = "";

const insertBeforeName = modalBody.getElementsByTagName("input")[0];
const insertBeforePrice = modalBody.getElementsByTagName("input")[1];

let inputImage = document.querySelector("#fileItemModal");
let allInputImage = "";

inputImage.addEventListener("change", () => {
  allInputImage = inputImage.files[0];
});

let nombreP = "";
let precioP = "";
let nameI = "";

let idImg = () => {
  let img = document.querySelector("#imagenEdit");
  return img;
};

export let btnEdit = () => {
  nombreAeditar = modalProdName.value;
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      nombreP = e.parentElement.children[1];
      precioP = e.parentElement.children[2];
      modalProdName.value = nombreP.innerHTML;
      modalProdPrice.value = precioP.innerHTML;
      return nombreP, precioP;
    });
  });

  spanName.innerText = "Nombre de producto";
  spanPrice.innerText = "Precio de producto";
  imgProduct.classList.add("img-fluid", "img-thumbnail");
  imgProduct.setAttribute("id", "imagenEdit");
  modalProdName.parentNode.insertBefore(spanName, insertBeforeName);
  modalProdPrice.parentNode.insertBefore(spanPrice, insertBeforePrice);
  modalBody.appendChild(imgProduct);

  // Descargar Archivo de Storage
  let storageRef = firebase.storage().ref(`imagenes/${modalProdName.value}`);
  let fileItemModal = document.querySelector("#fileItemModal");

  storageRef
    .getDownloadURL()
    .then(function (urlImagen) {
      // Insertar imagen al html:
      idImg().src = urlImagen;
      modalProdName.addEventListener("keyup", (e) => {
        nameI = e.path[0].value;
      });
    })
    .catch(function (error) {
      // Handle any errors
      console.log("No elegiste ningun elemento a editar");
    });
};

fileItemModal.addEventListener("change", async () => {
  let storageRef = firebase.storage().ref(`imagenes/`);
  let desertRef = storageRef.child(`${nombreAeditar}`);
  await desertRef
    .delete()
    .then(() => {
      console.log("Imagen borrada");
      idImg().remove();
    })
    .catch(function (error) {
      console.log(error);
    });
});

export let btnGuardar = async () => {
  let nameProduct = nombreP.id;
  var storageRef = firebase.storage().ref(`imagenes/${nameI}`);
  await storageRef.put(allInputImage).then(function (snapshot) {
    console.log("Uploaded a blob or file!");
  });

  await db
    .collection("carrousel")
    .doc(nameProduct)
    .set({
      nombre: modalProdName.value,
      precio: modalProdPrice.value,
    })
    .then(() => {
      console.log("Document successfully written!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};
