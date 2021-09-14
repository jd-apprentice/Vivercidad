import {
  modalProdName,
  modalProdPrice,
  modalProdDesc,
  claseBoton,
} from "../adminPanel.js";

// Variables
export const getModalEdit = document.querySelector(".editarCambios");
const modalBody = document.querySelector(".modal-body");
const imgProduct = document.createElement("img");

let nombreProducto = "";
let precioProducto = "";
let descripcionProducto = "";
let nameI = "";
let idModal = "";
let datasetLista = "";

// Funciones
export let saveName = () => {
  // Keyup para el nombre
  modalProdName.addEventListener("keyup", (e) => (nameI = e.path[0].value));

  // Comprobar si el nombre fue editado, adquirir ruta de referencia
  let nombre = "";
  if (nameI == "") {
    nombre = modalProdName.value;
  } else nombre = nameI;
  return nombre;
};

const pintarProd = () => {
  imgProduct.src = "img/Xpinner.gif";
  // Pintar radio seleccionado en modal
  imgProduct.classList.add(
    "img-fluid",
    "img-thumbnail",
    "text-center",
    "mx-auto"
  );
  imgProduct.setAttribute("id", "imagenEdit");
  [imgProduct.style.height, imgProduct.style.width] = ["350px", "350px"];
  modalBody.appendChild(imgProduct);
};

// Boton editar - Este toma el nombre, precio e imagen del radio que seleccionas
export let btnEdit = async () => {
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      datasetLista = e.parentElement.parentElement.parentElement.dataset.lista;
      idModal = e.parentElement.parentElement.children[2].id;
      nombreProducto = e.parentElement.parentElement.children[2];
      descripcionProducto = e.parentElement.parentElement.children[4];
      precioProducto = e.parentElement.parentElement.children[3];
      getModalEdit.id = idModal;
      getModalEdit.dataset.lista = datasetLista;
      modalProdName.value = nombreProducto.innerHTML;
      modalProdPrice.value = precioProducto.innerHTML;
      modalProdDesc.value = descripcionProducto.innerHTML;
      return nombreProducto, precioProducto, descripcionProducto;
    });
  });

  // Preparar imagen
  pintarProd();

  // Descargar Archivo de Storage
  let idDocumento = claseBoton();
  let storageRef = firebase.storage().ref(`imagenes/${idDocumento}`);

  await storageRef
    .getDownloadURL()
    .then((urlImagen) => {
      // Insertar imagen al html:
      imgProduct.src = urlImagen;
    })
    .catch(() => {
      console.log("No hay una imagen");
    });
};

// Obtener metadatos
export let obtenerMetadatos = () => {
  // Verificar formato de archivo
  let contentType = "";
  let size = "";
  let idDocumento = claseBoton();
  let storageRef = firebase.storage().ref(`imagenes/${idDocumento}`);
  storageRef.getMetadata().then((metadata) => {
    contentType = metadata.contentType;
    size = metadata.size;
  });
  // Almacenar
  let obtenerData = {
    id: idDocumento,
    size: size,
    type: "file",
    contentType: contentType,
  };
  return obtenerData;
};
