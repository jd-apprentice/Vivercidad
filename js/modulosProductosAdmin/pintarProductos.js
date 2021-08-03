import { getImput, grabLista, db } from "../añadirProducto.js";
export let pintarProductos = async () => {
  const nameProduct = getImput();
  var createSpan = document.createElement("span");
  let createLabel = document.createElement("label");
  let createInput = document.createElement("input");

  createLabel.classList.add("list-group-item", "form-check-label");
  createInput.classList.add("form-check-input", "me-1");
  createInput.name = "flexRadioDefault";
  createInput.type = "radio";
  createSpan.textContent = `${nameProduct}`;
  createLabel.appendChild(createInput);
  createLabel.appendChild(createSpan);
  grabLista.appendChild(createLabel);

  await db.collection("carrousel").doc().set({
    nombre: nameProduct,
  });
  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot.docs);
    });
};
