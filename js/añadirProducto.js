var storage = firebase.storage();
const db = firebase.firestore();
const btnSubir = document.querySelector("#lgForm");
const grabCheck = document.querySelector("#productoPadre");
const grabCheckText = document.querySelector("#productoPadreTexto");
const grabLista = document.querySelector("#listaProductos");

let archivo = document.querySelector("#fileItem");
let fileAll = "";
let fileName = "";
let cont = 0;
let cont_carousel = 0;
let botonDisplay = false;

db.collection("saveContador")
  .doc("JgYMERdLqjAok2wIoFV8")
  .onSnapshot((doc) => {
    cont = doc.data().contador;
  });

grabCheck.addEventListener("click", () => {
  if (botonDisplay == false) {
    grabCheckText.innerHTML = `
  <span id="productoPadreTexto">Primer Producto</span> <button class="btn btn-success" type="submit">
  Editar
</button>`
    botonDisplay = true;
  } else if (botonDisplay == true) {
    grabCheckText.innerHTML = `<span id="productoPadreTexto">Primer Producto</span>`
    botonDisplay = false;
  }
});

archivo.addEventListener("change", () => {
  fileAll = archivo.files[0];
  fileName = archivo.files[0].name;
});

btnSubir.addEventListener("submit", async (e) => {
  if (cont_carousel < 5) {
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

    let createLabel = document.createElement("label");
    let createInput = document.createElement("input");
    let createSpan = document.createElement("span");

    createLabel.classList.add("list-group-item");
    createInput.classList.add("form-check-input", "me-1");
    createInput.value = "";
    createInput.type = "checkbox";
    createSpan.textContent = `${nameProduct}`;

    createLabel.appendChild(createInput);
    createLabel.appendChild(createSpan);

    grabLista.appendChild(createLabel);

    cont_carousel++;
  } else {
    e.preventDefault()
    console.log("Ya esta lleno el carousel!");
  }
});