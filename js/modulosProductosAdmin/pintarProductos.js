import {
  getImput,
  grabLista,
  db
} from "../añadirProducto.js";

export let pintarProductos = async () => {

  let contadorCheck = localStorage.getItem("contadorCheck");
  let nmProduct = getImput();

  let createSpan = document.createElement("span");
  let createLabel = document.createElement("label");
  let createInput = document.createElement("input");

  createLabel.classList.add("list-group-item", "form-check-label");
  createInput.classList.add("form-check-input", "me-1");
  createInput.name = "flexRadioDefault";
  createInput.type = "radio";
  createSpan.textContent = `${nmProduct}`;
  createSpan.id = getId();
  createLabel.appendChild(createInput);
  createLabel.appendChild(createSpan);
  grabLista.appendChild(createLabel);

  await db.collection("carrousel").doc().set({
    nombre: nmProduct,
  });
};