import {
  db,
  modalProdName,
  modalProdPrice,
  claseBoton,
} from "../windowOnload.js";

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
  return nombre;
};

const pintarProd = () => {
  // Pintar radio seleccionado en modal

  spanName.innerText = "Nombre de producto";
  spanPrice.innerText = "Precio de producto";
  imgProduct.classList.add("img-fluid", "img-thumbnail", "text-center");
  imgProduct.setAttribute("id", "imagenEdit");
  imgProduct.style.height = "450px";
  imgProduct.style.width = "350px";
  modalProdName.parentNode.insertBefore(spanName, insertBeforeName);
  modalProdPrice.parentNode.insertBefore(spanPrice, insertBeforePrice);
  modalBody.appendChild(imgProduct);
};

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

  pintarProd();

  // Descargar Archivo de Storage

  let idDocumento = claseBoton();
  let storageRef = firebase.storage().ref(`imagenes/${idDocumento}`);

  storageRef
    .getDownloadURL()
    .then(function (urlImagen) {
      // Insertar imagen al html:
      idImg().src = urlImagen;
    })
    .catch(function (error) {
      return;
    });
};

// Obtener metadatos

export let obtenerMetadatos = () => {
  // Verificar formato de archivo
  let contentType = "";
  let idDocumento = claseBoton();
  let storageRef = firebase.storage().ref(`imagenes/${idDocumento}`);
  storageRef.getMetadata().then((metadata) => {
    contentType = metadata.contentType;
  });

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
  let getName = saveName();
  let idDocumento = claseBoton();
  let storageRef = await firebase.storage().ref(`imagenes/${idDocumento}`);
  // Subir Archivo y actualizar base de datos
  if (allInputImage != "") {
    await storageRef.put(allInputImage, obtenerMetadatos());
  }
  await db
    .collection("carrousel")
    .doc(idDocumento)
    .set({
      nombre: getName,
      precio: modalProdPrice.value,
    })
    .then(() => {
      storageRef.getDownloadURL().then(function (urlImagen) {
        // Insertar imagen al html:
        idImg().src = urlImagen;
      });
      inputImage.value = "";
      console.log("Guardado");
      location.reload();
    });
};
