// Modulos
import { Render } from "./Render/render.js";
import { refCarrito } from "./Producto/producto.js";
import { userName } from "../index.js";

// Firebase
const getCarrito = document.querySelector("#tbodyCarrito");

// Obtener carrito de firebase
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const getBtnMas = document.querySelectorAll(".mas");
getBtnMas.forEach((boton) => {
  boton.addEventListener("click", () => {
    let cantidad = parseInt(boton.parentElement.children[1].textContent);
    cantidad++;
    boton.parentElement.children[1].textContent = cantidad;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        refCarrito
          .doc(userName.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              let carrito = doc.data();
              let productos = carrito.productos;
              const carritoRender = new Render(getContenedor, productos);
              const mas = boton.closest(".mas");
              const id = mas.getAttribute("data-id");
              const findProduct = productos.find((product) => product.id == id);
              findProduct.cantidad = cantidad;
              refCarrito.doc(userName.uid).set({
                productos: productos,
              });
              carritoRender.render();
            }
          });
      }
    });
  });
});
