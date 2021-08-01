// Modulos

import { grabLista, db } from "../añadirProducto.js";

export let addButtons = () => {
  let contadorCheck = localStorage.getItem("contadorCheck");
  if (contadorCheck == 4) {
    const padreBoton = document.createElement("div");
    const btnSig = document.createElement("button");
    const btnAnt = document.createElement("button");
    const btnAnadirCarrousel = document.createElement("button");
    padreBoton.classList.add("d-flex", "justify-content-between");
    btnSig.classList.add("btn", "btn-success");
    btnAnt.classList.add("btn", "btn-success");
    btnAnadirCarrousel.classList.add("btn", "btn-warning");
    btnSig.type = "button";
    btnAnt.type = "button";
    btnAnadirCarrousel.type = "button";
    btnAnadirCarrousel.innerText = "Añadir al carrousel";
    btnAnt.innerText = "<==";
    btnSig.innerText = "==>";
    padreBoton.appendChild(btnAnt);
    padreBoton.appendChild(btnAnadirCarrousel);
    padreBoton.appendChild(btnSig);
    grabLista.appendChild(padreBoton);
  }
};
