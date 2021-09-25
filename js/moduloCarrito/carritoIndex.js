// Modulos
import { Render } from "./Render/render.js";
import { refCarrito } from "./Producto/producto.js";
import { userName } from "../index.js";
import { limpiarCarrito } from "./Borrar/borrar.js";

// Firebase
export const getCarrito = document.querySelector("#tbodyCarrito");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    refCarrito
      .doc(userName.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let itemsCarrito = doc.data();
          const renderCarrito = new Render(getCarrito, itemsCarrito.productos);
          renderCarrito.render();
          renderCarrito.addEventListener(vaciarCarrito);
          renderCarrito.changeValue(updateValue);
          renderCarrito.deleteProduct(borrarItem);
        }
      });
  }
});

// Vaciar carrito
const vaciarCarrito = () => {
  limpiarCarrito(userName.uid);
  const carritoRender = new Render(getCarrito, []);
  carritoRender.render();
};

const updateValue = (e) => {
  const id = e.target.dataset.id;
  const cantidad = e.target.value;
}

const borrarItem = (e) => {
  const id = e.target.classList[2];
  const contenido = e.target.closest("tr");
  contenido.remove();
}

