// Modulos
import { Render } from "./Render/render.js";
import { refCarrito } from "./Producto/producto.js";
import { userName } from "../index.js";
import { limpiarCarrito, eliminarProducto } from "./Borrar/borrar.js";
import { actualizarCantidad } from "./Cantidad/cantidad.js";
import { limpiarCarrito } from "./Borrar/borrar.js";

// Firebase
export const getCarrito = document.querySelector("#tbodyCarrito");

// Render
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
          renderCarrito.changeValue(updateCantidad);
          renderCarrito.deleteProduct(borrarItem);
          renderCarrito.updateTotal();
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

// Borrar item
const borrarItem = (e) => {
  const id = e.target.id;
  const contenido = e.target.closest("tr");
  eliminarProducto(userName.uid, id);
  contenido.remove();
}

// Actualizar cantidad
const updateCantidad = (e) => {
  const id = e.target.id;
  const cantidad = e.target.value;
  actualizarCantidad(userName.uid, id, cantidad);
}