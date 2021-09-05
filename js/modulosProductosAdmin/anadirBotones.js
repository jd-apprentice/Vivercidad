import { grabLista } from "./adminPanel.js";

export let addButtons = () => {
  const padreBoton = document.createElement("div");
  const btnSig = document.createElement("button");
  const btnAnt = document.createElement("button");
  padreBoton.classList.add("d-flex", "justify-content-center", "mt-2");
  btnSig.classList.add("btn", "btn-success");
  btnAnt.classList.add("btn", "btn-success");
  btnSig.type = "button";
  btnAnt.type = "button";
  btnAnt.innerText = "<==";
  btnSig.innerText = "==>";
  padreBoton.appendChild(btnAnt);
  padreBoton.appendChild(btnSig);
  grabLista.appendChild(padreBoton);
};
