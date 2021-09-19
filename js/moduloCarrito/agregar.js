import { Producto } from "./Producto/producto.js";
import { addContador } from "./Contador/contador.js"

// Variables
const getBotonesAgregar = document.querySelectorAll(".agregarProducto");
const getCarrito = document.querySelector("#navCarrito");
const getContador = document.querySelector("#contadorCarrito");

// Obtener contador

// Presionar boton agregar
getBotonesAgregar.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    let producto = new Producto(
      boton,
      boton.parentElement.children[0].innerText,
      boton.parentElement.children[1].innerText,
      boton.parentElement.children[2].src,
      boton.parentElement.children[3].innerText
    );
    producto.agregarProducto();
    addContador();
    alert("Producto agregado al carrito");
  });
});

// Pintar carrito
getCarrito.addEventListener("click", () => {
  let productos = JSON.parse(localStorage.getItem("productos"));
  let total = 0;
  let productosCarrito = document.querySelector("#productosCarrito");
  productosCarrito.innerHTML = "";
  productos.forEach((producto) => {
    productosCarrito.innerHTML += `
        <div class="productoCarrito text-start">
                <img class="imagenCarrito img-fluid img-thumbnail" src="${producto.imagen}" alt="${producto.nombre}">
                <h4 class="d-inline-flex">${producto.nombre}</h4>
                <p class="d-inline-flex">${producto.precio}</p>
            <div>
                <form class="d-flex justify-content-end my-2 mx-auto fs-5">Cantidad: 
                    <i class="signoMenos bi bi-dash-square mx-1"></i> <span class="mx-1 cantidadCarrito"> ${producto.cantidad}</span>
                    <i class="signoMas bi bi-plus-square mx-1"></i>
                </form>
            </div>
        </div>
        `;
    total += parseInt(producto.precio.split("$")[1]);
  });
    productosCarrito.innerHTML += `
    <div class="total text-end">
        <h3>Total: ${total} AR$</h3>
    </div>
    `;
});
    
