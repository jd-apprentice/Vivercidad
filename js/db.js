// Iniciar Firebase

const db = firebase.firestore();

// Variables

let getNombres = document.querySelectorAll('.nombreProducto');

// Leer todos los datos

db.collection("plantas").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(getNombres.doc);
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