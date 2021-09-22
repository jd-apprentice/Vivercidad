// Render carrito
export const renderCarrito = (carrito) => {
  let total = 0;
  let productos = document.querySelector("#productosCarrito");
  productos.innerHTML = "";
  for (let i = 0; i < carrito.productos.length; i++) {
    productos.innerHTML += `
              <div class="text-start">
                <img class="imagenCarrito img-fluid img-thumbnail" src="${carrito.productos[i].imagen}" alt="${carrito.productos[i].nombre}">
                <h4 class="d-inline-flex">${carrito.productos[i].nombre}</h4>
                <p class="d-inline-flex">${carrito.productos[i].precio}</p>
              <div class="d-flex justify-content-end my-2 mx-auto fs-5">Cantidad: 
                  <button class="operaciones" data-id="${carrito.productos[i].nombre}">-</button>
                  <span cantidad="${carrito.productos[i].cantidad}" class="mx-1 cantidadCarrito"> ${carrito.productos[i].cantidad}</span>
                  <button class="operaciones" data-id="${carrito.productos[i].nombre}">+</i></button>
              </div>
              </div>
            `;
    total +=
      carrito.productos[i].precio.split("$")[1] * carrito.productos[i].cantidad; // Sacamos el $ para poder hacer la cuenta
  }
  // Pintamos el total
  productosCarrito.innerHTML += `
              <div class="total text-end">
                  <h3>Total: ${total} AR$</h3>
              </div>
            `;
};