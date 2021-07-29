var storage = firebase.storage();
const db = firebase.firestore();
const btnSubir = document.querySelector("#lgForm");

let archivo = document.querySelector("#fileItem");
let fileAll = "";
let fileName = "";
let cont = 0;

db.collection("saveContador")
  .doc("JgYMERdLqjAok2wIoFV8")
  .onSnapshot((doc) => {
    cont = doc.data().contador;
  });

archivo.addEventListener("change", () => {
  fileAll = archivo.files[0];
  fileName = archivo.files[0].name;
});

btnSubir.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameProduct = document.querySelector("#nameProduct").value;
  const precioProduct = document.querySelector("#precioP").value;
  var storageRef = firebase.storage().ref(`imagenes/${nameProduct}`);
  await storageRef.put(fileAll).then(function (snapshot) {
    console.log("Uploaded a blob or file!");
  });
  const collecTEST = db.collection("test").doc(`${cont}`);
  await collecTEST.set({
    nombre: nameProduct,
    precio: precioProduct,
  });
  cont++;
  const saveContador = db
    .collection("saveContador")
    .doc("JgYMERdLqjAok2wIoFV8");
  await saveContador.set({
    contador: cont,
  });
});