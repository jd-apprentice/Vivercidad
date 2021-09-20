import { Producto, refCarrito } from "./Producto/producto.js";
import { userName } from "../index.js";

// Variables
const getBotonesAgregar = document.querySelectorAll(".agregarProducto");
const getCarrito = document.querySelector("#navCarrito");
const getContador = document.querySelector("#contadorCarrito");
const getLogin = document.querySelector("#alertaLogin");

// Presionar boton agregar
getBotonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let producto = new Producto(
          userName.displayName, // Nombre del usuario cargado a firebase
          boton.parentElement.children[0].innerText, // Nombre del producto
          boton.parentElement.children[1].innerText, // Precio del producto
          boton.parentElement.children[2].src, // Imagen del producto
          boton.parentElement.children[3].innerText, // Descripcion del producto// ID del producto
          boton.parentElement.children[0].dataset.cantidad // Cantidad del producto
        );
        producto.agregarProducto();
        alert("Producto agregado al carrito");
      } else {
        getLogin.style.display = "block";
        setTimeout(() => {
          getLogin.style.display = "none";
          window.location.href = "login.html";
        }, 2000);
      }
    });
  });
});

// Pintar carrito
getCarrito.addEventListener("click", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      refCarrito
        .doc(userName.displayName)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let carrito = doc.data();
            let productos = document.querySelector("#productosCarrito");
            productos.innerHTML = "";
            for (let i = 0; i < carrito.productos.length; i++) {
              productos.innerHTML += `
            <div class="producto">
              <div class="productoImagen">
                <img src="${carrito.productos[i].imagen}" alt="${carrito.productos[i].nombre}">
              </div>
              <div class="productoNombre">
                ${carrito.productos[i].nombre}
              </div>
              <div class="productoPrecio">
                ${carrito.productos[i].precio}
              </div>
              <div class="productoCantidad">
                ${carrito.productos[i].cantidad}
              </div>
            </div>
            `;
            }
          } else {
            productos.innerHTML = "";
            productos.innerHTML += `
          <div class="producto">
            <div class="productoImagen">
              <img src="img/carrito.png" alt="Carrito vacio">
            </div>
            <div class="productoNombre">
              Carrito vacio
            </div>
            <div class="productoPrecio">
              0
            </div>
            <div class="productoCantidad">
              0
            </div>
          </div>
          `;
          }
        });
    }
  });
});
