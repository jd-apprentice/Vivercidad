// Iniciar Firebase

const db = firebase.firestore();
const storage = firebase.storage();

// Primer Swiper
let i = 0;
const getNombres = document.querySelectorAll(".nombreProducto");
const getPrecio = document.querySelectorAll(".precioProducto");
const getImagenes = document.querySelectorAll(".imagenProducto");

// Segundo Swiper
let iTwo = 4;
const getNombresTwo = document.querySelectorAll(".nombreProducto2");
const getPrecioTwo = document.querySelectorAll(".precioProducto2");
const getImagenesTwo = document.querySelectorAll(".imagenProducto2");

// Tercer Swiper
const getNombresThree = document.querySelectorAll(".nombreProducto3");
const getPrecioThree = document.querySelectorAll(".precioProducto3");
const getImagenesThree = document.querySelectorAll(".imagenProducto3");

// Cuarto Swiper
const getNombresFour = document.querySelectorAll(".nombreProducto4");
const getPrecioFour = document.querySelectorAll(".precioProducto4");
const getImagenesFour = document.querySelectorAll(".imagenProducto4");

// Leer todos los datos - Pintar Carousel #1

db.collection("carrousel")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      getNombres[i].innerHTML = doc.data().nombre;
      getPrecio[i].innerHTML = `$${doc.data().precio}`;
    });
  });

db.collection("carrousel-slide2")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      getNombres[iTwo].innerHTML = doc.data().nombre;
      getPrecio[iTwo].innerHTML = `$${doc.data().precio}`;
    });
    i++;
  });
