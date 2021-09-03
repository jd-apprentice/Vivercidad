// Iniciar Firebase

const db = firebase.firestore();
const storage = firebase.storage();

// Primer Swiper
let i = 0;
const getNombres = document.querySelectorAll(".nombreProducto");
const getPrecio = document.querySelectorAll(".precioProducto");
const getImagenes = document.querySelectorAll(".imagenProducto");

// Segundo Swiper
let iTwo = 0;
const getNombresTwo = document.querySelectorAll(".nombreProducto2");
const getPrecioTwo = document.querySelectorAll(".precioProducto2");
const getImagenesTwo = document.querySelectorAll(".imagenProducto2");

// Tercer Swiper
let iThree = 0;
const getNombresThree = document.querySelectorAll(".nombreProducto3");
const getPrecioThree = document.querySelectorAll(".precioProducto3");
const getImagenesThree = document.querySelectorAll(".imagenProducto3");

// Cuarto Swiper
let iFour = 0;
const getNombresFour = document.querySelectorAll(".nombreProducto4");
const getPrecioFour = document.querySelectorAll(".precioProducto4");
const getImagenesFour = document.querySelectorAll(".imagenProducto4");

// Leer todos los datos - Pintar Carousel #1

db.collection("carrousel")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      getNombres[i].innerText = doc.data().nombre;
      getNombresTwo[iTwo].innerText = doc.data().nombre;
      getNombresThree[iThree].innerText = doc.data().nombre;
      getNombresFour[iFour].innerText = doc.data().nombre;
      getPrecio[i].innerText = `$${doc.data().precio}`;
      getPrecioTwo[iTwo].innerText = `$${doc.data().precio}`;
      getPrecioThree[iThree].innerText = `$${doc.data().precio}`;
      getPrecioFour[iFour].innerText = `$${doc.data().precio}`;
    });
    i++;
    iTwo++;
    iThree++;
    iFour++;
  });
