import {
  db,
  modalProdName,
  modalProdPrice,
  idEstatica,
  seSubioIMG,
} from "../añadirProducto.js";

const modalBody = document.querySelector(".modal-body");
const spanName = document.createElement("span");
const spanPrice = document.createElement("span");
const imgProduct = document.createElement("img");
const grabInputs = document.querySelectorAll(".form-check-input");

const insertBeforeName = modalBody.getElementsByTagName("input")[0];
const insertBeforePrice = modalBody.getElementsByTagName("input")[1];

let inputImage = document.querySelector("#fileItemModal");
let allInputImage = "";

inputImage.addEventListener("change", () => {
  allInputImage = inputImage.files[0];
});

let nombreP = "";
let precioP = "";
let idP = "";
let nameI = "";
let nombre = "";
let seCargaImagen = false;

let idImg = () => {
  let img = document.querySelector("#imagenEdit");
  return img;
};

export let pintarInputs = () => {
  spanName.innerText = "Nombre de producto";
  spanPrice.innerText = "Precio de producto";
  imgProduct.classList.add("img-thumbnail");
  imgProduct.setAttribute("id", "imagenEdit");
  imgProduct.style.height = "450px";
  imgProduct.style.width = "350px";
  modalProdName.parentNode.insertBefore(spanName, insertBeforeName);
  modalProdPrice.parentNode.insertBefore(spanPrice, insertBeforePrice);
  modalBody.appendChild(imgProduct);
};

export let btnEdit = () => {
  seCargaImagen = false;
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      console.log("hola");
    });
  });
  pintarInputs();
  // Descargar Archivo de Storage
  if (seSubioIMG) {
    let storageRef = firebase.storage().ref(`imagenes/${idEstatica}`); //Aca va el id
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
        console.log(error);
      });
  }
};

export let obtenerMetadatos = (storageRef) => {
  // Verificar formato de archivo
  let contentType = "";
  storageRef.getMetadata().then((metadata) => {
    contentType = metadata.contentType;
  });
  // Almacenar
  let obtenerData = {
    type: "file",
    contentType: contentType,
  };
  return obtenerData;
};

let obtenerNombre = () => {
  // Comprobar si el nombre fue editado, adquirir ruta de referencia
  if (nameI == "") {
    nombre = modalProdName.value;
  } else nombre = nameI;
  return nombre;
};

export let btnGuardar = async () => {
  let nombrePro = obtenerNombre();
  let nameProduct = modalProdName.id;
  console.log(nameProduct);
  if (seCargaImagen == true) {
    let storageRef = firebase.storage().ref(`imagenes/${idEstatica}`);
    //  Subir Archivo y actualizar base de datos
    if (allInputImage != "") {
      await storageRef.put(allInputImage, obtenerNombre());
    }
  }
  await db
    .collection("carrousel")
    .doc(nameProduct)
    .set({
      nombre: nombrePro,
      precio: modalProdPrice.value,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

// Este comportamiento la va a tener el boton eliminar imagen

fileItemModal.addEventListener("change", async () => {
  let storageRef = await firebase.storage().ref(`imagenes/`);
  let desertRef = await storageRef.child(`${idEstatica}`);
  await desertRef
    .delete()
    .then(() => {
      console.log("Imagen borrada");
      idImg().remove();
    })
    .catch(function (error) {
      console.log(error);
    });
  seCargaImagen = true;
});
