import { getImput, grabLista, db} from "../añadirProducto.js";
export let pintarProductos = () => {
  const nameProduct = getImput();

  let createLabel = document.createElement("label");
  let createInput = document.createElement("input");
  let createSpan = document.createElement("span");

  createLabel.classList.add("list-group-item", "form-check-label");
  createInput.classList.add("form-check-input", "me-1");
  createInput.name = "flexRadioDefault";
  createInput.type = "radio";
  createSpan.textContent = `${nameProduct}`;
  createLabel.appendChild(createInput);
  createLabel.appendChild(createSpan);
  grabLista.appendChild(createLabel);

  db.collection("carrousel").doc().set({
    nombre: nameProduct,
  });
};
