import {
  getImput,
  getPrecio,
  grabLista,
  db,
  claseBoton,
  modalProdName,
  modalProdPrice,
} from "../modulosProductosAdmin/adminPanel.js";

export let pintarProductos = async () => {
  const nameProduct = getImput();
  const precioProduct = getPrecio();
  var createSpan = document.createElement("span");
  let createSpanPrecio = document.createElement("span");
  let createLabel = document.createElement("label");
  let createInput = document.createElement("input");
  createLabel.classList.add("list-group-item", "form-check-label");
  createInput.classList.add("form-check-input");
  createInput.disabled = true;
  createInput.name = "flexRadioDefault";
  createInput.type = "radio";
  createSpan.textContent = `${nameProduct}`;
  createSpan.classList.add("my-5");
  createSpanPrecio.textContent = `${precioProduct}`;
  createLabel.appendChild(createInput);
  createLabel.appendChild(createSpan);
  createLabel.appendChild(createSpanPrecio);
  grabLista.appendChild(createLabel);
  let nombreP = "";
  let precioP = "";
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => {
      nombreP = e.parentElement.children[1];
      precioP = e.parentElement.children[2];
      modalProdName.value = nombreP.innerHTML;
      modalProdPrice.value = precioP.innerHTML;
    });
  });

  let idDocumento = claseBoton();

  await db.collection("carrousel").doc().set({
    id: idDocumento,
    nombre: nameProduct,
    precio: precioProduct,
  });
};
