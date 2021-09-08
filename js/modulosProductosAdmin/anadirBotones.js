import { grabLista } from "../modulosProductosAdmin/adminPanel.js";

export let addButtons = () => {
  const padreBoton = document.createElement("div");
  const btnSig = document.createElement("button");
  const btnAnt = document.createElement("button");
  padreBoton.classList.add("d-flex", "justify-content-center", "mt-3");
  btnSig.classList.add("btn", "btn-success", "mx-3");
  btnAnt.classList.add("btn", "btn-success", "mx-3");
  btnSig.type = "button";
  btnAnt.type = "button";
  btnAnt.innerText = "Atras";
  btnSig.innerText = "Siguiente";
  padreBoton.appendChild(btnAnt);
  padreBoton.appendChild(btnSig);
  grabLista.appendChild(padreBoton);
};
