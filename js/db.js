// Iniciar Firebase

const db = firebase.firestore();

// Variables

const getNombres = document.querySelectorAll(".nombreProducto");
const getPrecio = document.querySelectorAll(".precioProducto");

const getNombresTwo = document.querySelectorAll(".nombreProducto2");
const getPrecioTwo = document.querySelectorAll(".precioProducto2");

let i = 0;
let iTwo = 0;

// Leer todos los datos - Pintar Carousel #1

db.collection("plantas")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      getNombres[i].innerText = doc.data().nombre;
      getPrecio[i].innerText = `$${doc.data().precio}`;
      i++;
    });
  });

// Leer todos los datos - Pintar Carousel #2

db.collection("plantas2")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      getNombresTwo[iTwo].innerText = doc.data().nombre;
      getPrecioTwo[iTwo].innerText = `$${doc.data().precio}`;
      iTwo++;
    });
  });
