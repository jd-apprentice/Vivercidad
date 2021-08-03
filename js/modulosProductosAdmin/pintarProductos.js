import { getImput, getPrecio, grabLista, db } from "../añadirProducto.js";

export let pintarProductos = async () => {
  let contadorCheck = localStorage.getItem("contadorCheck");
  const nameProduct = getImput();
  const precioProduct = getPrecio();
  var createSpan = document.createElement("span");
  let createSpanPrecio = document.createElement("span");
  let createLabel = document.createElement("label");
  let createInput = document.createElement("input");

  createLabel.classList.add("list-group-item", "form-check-label");
  createInput.classList.add("form-check-input", "me-1");
  createInput.name = "flexRadioDefault";
  createInput.type = "radio";
  createSpan.textContent = `${nameProduct}`;
  createSpanPrecio.textContent = `${precioProduct}`;
  createLabel.appendChild(createInput);
  createLabel.appendChild(createSpan);
  createLabel.appendChild(createSpanPrecio);
  grabLista.appendChild(createLabel);

  await db.collection("carrousel").doc().set({
    nombre: nameProduct,
    precio: precioProduct,
  });

  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      let query = querySnapshot.docs[contadorCheck - 1];
      createSpan.setAttribute("id", query.id);
    });
};
