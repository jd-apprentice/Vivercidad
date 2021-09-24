// Modulos
import { Producto} from "../Producto/producto.js";
import { userName } from "../../index.js";
import { generarID } from "../IDs/generador.js";

// Variables
const getBotonesAgregar = document.querySelectorAll(".agregarProducto");
const getLogin = document.querySelector("#alertaLogin");

// Presionar boton agregar
getBotonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let id = new generarID();
        let producto = new Producto(
          userName.uid, // Nombre del usuario cargado a firebase
          boton.parentElement.children[0].innerText, // Nombre del producto
          boton.parentElement.children[1].innerText, // Precio del producto
          boton.parentElement.children[2].src, // Imagen del producto
          boton.parentElement.children[3].innerText, // Descripcion del producto// ID del producto
          boton.parentElement.children[0].dataset.cantidad, // Cantidad del producto
          id.generar() // ID del producto
        );
        producto.agregarProducto();
        alert("Producto agregado al carrito");
      } else {
        getLogin.style.display = "block";
        setTimeout(() => {
          getLogin.style.display = "none";
          window.location.href = "../pages/loginUsuario.html";
        }, 2000);
      }
    });
  });
});