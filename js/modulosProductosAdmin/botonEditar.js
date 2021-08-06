import { db, modalProdName, modalProdPrice } from "../añadirProducto.js";

// Variables

const modalBody = document.querySelector(".modal-body");
const spanName = document.createElement("span");
const spanPrice = document.createElement("span");
const imgProduct = document.createElement("img");

const insertBeforeName = modalBody.getElementsByTagName("input")[0];
const insertBeforePrice = modalBody.getElementsByTagName("input")[1];

let inputImage = document.querySelector("#fileItemModal");
let allInputImage = "";

let nombreP = "";
let precioP = "";
let nameI = "";

// Funciones

let idImg = () => {
  let img = document.querySelector("#imagenEdit");
  return img;
};

export let saveName = () => {

   // Keyup para el nombre
   modalProdName.addEventListener("keyup", (e) => {
    nameI = e.path[0].value;
  });

  // Comprobar si el nombre fue editado, adquirir ruta de referencia
  let nombre = "";
  if (nameI == "") {
    nombre = modalProdName.value;
  } else nombre = nameI;
  return nombre
}

// Adquirir propiedades del archivo

inputImage.addEventListener("change", () => {
  allInputImage = inputImage.files[0];
});

// Boton editar - Este toma el nombre, precio e imagen del radio que seleccionas

export let btnEdit = async () => {

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

  // Pintar radio seleccionado en modal

  spanName.innerText = "Nombre de producto";
  spanPrice.innerText = "Precio de producto";
  imgProduct.classList.add("img-fluid", "img-thumbnail", "text-center");
  imgProduct.setAttribute("id", "imagenEdit");
  imgProduct.style.height = "450px"
  imgProduct.style.width = "350px"
  modalProdName.parentNode.insertBefore(spanName, insertBeforeName);
  modalProdPrice.parentNode.insertBefore(spanPrice, insertBeforePrice);
  modalBody.appendChild(imgProduct);

  // Descargar Archivo de Storage
  let storageRef = firebase.storage().ref(`imagenes/${saveName()}`);
  let fileItemModal = document.querySelector("#fileItemModal");

  storageRef
    .getDownloadURL()
    .then(function (urlImagen) {
      // Insertar imagen al html:
      idImg().src = urlImagen;
    })
    .catch(function () {
      // Error
      console.log("No elegiste ningun elemento a editar");
    });
    obtenerMetadatos();
};

// Manipular el input image del modal - Boton eliminar imagen

/* fileItemModal.addEventListener("change", async () => {
  let storageRef = firebase.storage().ref(`imagenes/`);
  let desertRef = storageRef.child(`${modalProdName.value}`);
  
  // Borrar imagen
  await desertRef
    .delete()
    .then(() => {
      console.log("Imagen borrada");
      idImg().remove();
    })
}); */

// Obtener metadatos

export let obtenerMetadatos = (storageRef) => {

  // Verificar formato de archivo
  let contentType = "";

  if (inputImage != "") {
    console.log("Falta cargar imagen");
  } else {
    storageRef.getMetadata().then((metadata) => {
      contentType = metadata.contentType;
    })
  }

  // Almacenar
  
  let obtenerData = {
    type: "file",
    name: saveName(),
    contentType: contentType,
  };
  return obtenerData;
};

// Boton guardar - Subir

export let btnGuardar = async () => {

  let getName = saveName()
  let nameProduct = await nombreP.id;
  /* let storageRef = await firebase.storage().ref(`imagenes/${saveName()}`); */
  // Subir Archivo y actualizar base de datos
  /* await storageRef.put(allInputImage, obtenerMetadatos()); */
  await db
    .collection("carrousel")
    .doc(nameProduct)
    .set({
      nombre: getName,
      precio: modalProdPrice.value,
    })
    .then(() => {
      console.log(saveName());
      /* location.reload(); */
    })
};
