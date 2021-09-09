import {
  db,
  modalProdName,
  modalProdPrice,
  modalProdDesc,
  claseBoton,
} from "./adminPanel.js";

// Variables
const modalBody = document.querySelector(".modal-body");
const imgProduct = document.createElement("img");

let inputImage = document.querySelector("#fileItemModal");
let allInputImage = "";
let nombreProducto = "";
let precioProducto = "";
let descripcionProducto = "";
let nameI = "";

// Funciones
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
  imgProduct.classList.add(
    "img-fluid",
    "img-thumbnail",
    "text-center",
    "mx-auto"
  );
  imgProduct.setAttribute("id", "imagenEdit");
  imgProduct.style.height = "350px";
  imgProduct.style.width = "350px";
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
      nombreProducto = e.parentElement.parentElement.children[2];
      descripcionProducto = e.parentElement.parentElement.children[4];
      precioProducto = e.parentElement.parentElement.children[3];
      modalProdName.value = nombreProducto.innerHTML;
      modalProdPrice.value = precioProducto.innerHTML;
      modalProdDesc.value = descripcionProducto.innerHTML;
      return nombreProducto, precioProducto, descripcionProducto;
    });
  });

  // Pintar modal
  pintarProd();

  // Descargar Archivo de Storage
  let idDocumento = claseBoton();
  let storageRef = firebase.storage().ref(`imagenes/${idDocumento}`);

  await storageRef.getDownloadURL().then((urlImagen) => {
    // Insertar imagen al html:
    imgProduct.src = urlImagen;
  })
  .catch(() => {
    // Handle any errors
    console.log("No hay una imagen")
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

// Boton guardar - Subir
export let btnGuardar = async () => {
  let getName = saveName(); // Nombre
  let idDocumento = claseBoton(); // Obtener id del documento
  let storageRef = await firebase.storage().ref(`imagenes/${idDocumento}`); // Ruta donde estan las imagenes
  // Subir Archivo y actualizar base de datos
  if (allInputImage != "") {
    await storageRef.put(allInputImage, obtenerMetadatos());
  }
  await db.collection("carrousel").doc(idDocumento).set({
    descripcion: modalProdDesc.value,
    id: idDocumento,
    nombre: getName,
    precio: modalProdPrice.value,
  });
  setTimeout(() => {
  // Close modal after 3 seconds
  const cerrarModal = document.querySelector(".cerrarModal");
  cerrarModal.click();
  }, 1000);
};

// Boton eliminar
export let btnBorrar = async () => {
  let idDocumento = claseBoton();
  let storageRef = await firebase.storage().ref(`imagenes/${idDocumento}`); // Ruta donde estan las imagenes
  // Si existe la imagen, la elimina
  if (storageRef.getDownloadURL() != null) {
    try {
      await storageRef.delete();
    } catch (error) {
      console.log(error);
    }
  }
  try {
  await db.collection("carrousel").doc(idDocumento).delete(); // Eliminar documento
  setTimeout(() => {
    location.reload();
  }, 1000);
  } catch (error) {
    console.error("Error al eliminar documento");
  }
};

// Boton Crear
export let btnCrear = async () => {
  await db
    .collection("carrousel")
    .doc()
    .set({ // Crear documento
      descripcion: "Edita este producto libremente",
      id: "",
      nombre: "Producto Nuevo",
      precio: 0,
    })
    .then(async() => {
      await db.collection("carrousel")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async(doc) => {
            if (doc.data().nombre === "Producto Nuevo" && doc.data().id === "") { // Si es el documento creado
              await db.collection("carrousel").doc(doc.id).update({ // Cargar ID del documento
                id: doc.id,
              });
            } else {
              return; // Si no es el documento creado, no hace nada
            }
          });
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
    });
};
