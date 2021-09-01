import { grabLista } from "../windowOnload.js";

export let addButtons = () => {
  const padreBoton = document.createElement("div");
  const btnSig = document.createElement("button");
  const btnAnt = document.createElement("button");
  const btnAnadirCarrousel = document.createElement("button");
  padreBoton.classList.add("d-flex", "justify-content-between", "mt-2");
  btnSig.classList.add("btn", "btn-success");
  btnAnt.classList.add("btn", "btn-success");
  btnAnadirCarrousel.classList.add("btn", "btn-warning", "mx-2");
  btnSig.type = "button";
  btnAnt.type = "button";
  btnAnadirCarrousel.type = "button";
  btnAnadirCarrousel.innerText = "Añadir mas productos";
  btnAnt.innerText = "<==";
  btnSig.innerText = "==>";
  padreBoton.appendChild(btnAnt);
  padreBoton.appendChild(btnAnadirCarrousel);
  padreBoton.appendChild(btnSig);
  grabLista.appendChild(padreBoton);
};
