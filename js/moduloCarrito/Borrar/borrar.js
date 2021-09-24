// Modulos
import { refCarrito } from "../Producto/producto.js";

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
