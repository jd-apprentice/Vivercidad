import {
  getImput,
  getPrecio,
  grabLista,
  idEstatica,
  db,
  claseBoton,
  modalProdName,
  modalProdPrice,
} from "../añadirProducto.js";

export let pintarProductos = async () => {
  let contadorCheck = localStorage.getItem("contadorCheck");
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
  createSpan.classList.add("mx-4");
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

  await db.collection("carrousel").doc().set({
    nombre: nameProduct,
    precio: precioProduct,
    id: idEstatica,
  });

  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      let query = querySnapshot.docs[contadorCheck - 1];
      createSpan.setAttribute("id", query.id);
      createInput.disabled = false;
    });

  claseBoton();
};
