// Iniciar Firebase

const db = firebase.firestore();

// Variables

const getNombres = document.querySelectorAll(".nombreProducto");
const getPrecio = document.querySelectorAll(".precioProducto");

let i = 0;
// Leer todos los datos

db.collection("plantas")
  .orderBy("nombre", "asc")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      getNombres[i].innerText = doc.data().nombre;
      getPrecio[i].innerText = `$${doc.data().precio}`;
      i++;
    });
  });

// Leer documento expecifico

/* let docRef = db.collection("plantas").doc("smZxTcyfxsrUxU67ar5n");

docRef.get().then((doc) => {
  if (doc.exists) {
    console.log("Document data:", doc.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
}); */
