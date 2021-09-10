// Iniciar Firebase
const db = firebase.firestore();
const storage = firebase.storage();

// Primer Swiper
let i = 0;
const getNombres = document.querySelectorAll(".nombreProducto");
const getPrecio = document.querySelectorAll(".precioProducto");
const getImagenes = document.querySelectorAll(".imagenProducto");
const getDescripcion = document.querySelectorAll(".descripcionProducto");

// Segundo Swiper
let iTwo = 0;
const getNombresTwo = document.querySelectorAll(".nombreProducto2");
const getPrecioTwo = document.querySelectorAll(".precioProducto2");
const getImagenesTwo = document.querySelectorAll(".imagenProducto2");
const getDescripcionTwo = document.querySelectorAll(".descripcionProducto2");

// Tercer Swiper
let iTree = 0;
const getNombresThree = document.querySelectorAll(".nombreProducto3");
const getPrecioThree = document.querySelectorAll(".precioProducto3");
const getImagenesThree = document.querySelectorAll(".imagenProducto3");
const getDescripcionThree = document.querySelectorAll(".descripcionProducto3");

// Cuarto Swiper
let iFour = 0;
const getNombresFour = document.querySelectorAll(".nombreProducto4");
const getPrecioFour = document.querySelectorAll(".precioProducto4");
const getImagenesFour = document.querySelectorAll(".imagenProducto4");
const getDescripcionFour = document.querySelectorAll(".descripcionProducto4");

// Leer todos los datos - Pintar Carousel #1

db.collection("carrousel")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach(async(doc) => {
      const data = await doc.data();
      let storageRef = storage.ref(`imagenes/${data.id}`);
      let url = await storageRef.getDownloadURL();
      getNombres[i].innerHTML = data.nombre;
      getPrecio[i].innerHTML = `$ ${data.precio}`;
      getDescripcion[i].innerHTML = data.descripcion;
      getImagenes[i].src = await url;
      i++;
    });
  });