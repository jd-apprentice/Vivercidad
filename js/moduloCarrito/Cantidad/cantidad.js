import { refCarrito } from "../Producto/producto.js";
import { Render } from "../Render/render.js";

// Actualizar cantidad
export const actualizarCantidad = (usuario, id, actualizar) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      refCarrito
        .doc(usuario)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const carrito = doc.data();
            const { productos } = carrito;
            const producto = productos.find((prod) => prod.id == id);
            producto.cantidad = parseInt(actualizar, 10);
            refCarrito
              .doc(usuario)
              .update({ productos })
              .then(() => {
                const renderCarrito = new Render([], productos);
                renderCarrito.updateTotal();
              });
          }
        });
    }
  });
