
// Modulos
import { refCarrito } from "../Producto/producto.js";
import { Render } from "../Render/render.js";

// Limpiar el carrito de compras
export const limpiarCarrito = (usuario) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      refCarrito
        .doc(usuario)
        .get()
        .then((doc) => {
          if (doc.exists) {
            refCarrito.doc(usuario).set({
              productos: [],
            });
          }
        });
    }
  });
};

export const eliminarProducto = (usuario, id) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      refCarrito
        .doc(usuario)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let productos = doc.data().productos;
            let nuevosProductos = productos.filter((producto) => {
              return producto.id != id;
            }
            );
            refCarrito.doc(usuario).set({
              productos: nuevosProductos,
            }).then(() => {
              const renderCarrito = new Render([], nuevosProductos);
              renderCarrito.updateTotal();
            });
          }
        });
    }
  });
