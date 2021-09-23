export class Render {
  constructor(contenedor, productos, total) {
    this.contenedor = contenedor;
    this.productos = productos;
    this.total = total;
    this.eventTarget = new EventTarget(); // Eventos
  }
  // Renderizar el carrito
  render() {
    this.contenedor.innerHTML = "";
    this.productos.forEach((producto) => {
      this.contenedor.innerHTML += `
      <tr>
          <td>
              <img
              src="${producto.imagen}"
              alt="${producto.nombre}"
              class="img-fluid"
              />
          </td>
          <td>${producto.precio}</td>
          <td>
              <input
              type="number"
              class="form-control"
              value="${producto.cantidad}"
              />
          </td>
          <td>${this.total}</td>
          <td>
              <button
              type="button"
              class="btn btn-danger"
              >
              <i class="bi bi-trash"></i>
              </button>
          </td>
      </tr>
          `;
      // Sumar el precio total
      this.total = this.productos.reduce((total, producto) => {
        return total + producto.precio.split("$")[1] * producto.cantidad;
      }, 0);
    });
    // Renderizar el precio total
    this.onRender();
    // Pintar el HTML
    this.contenedor.innerHTML += `
    <div class="row">
      <div class="col-12">
          <div class="d-flex justify-content-between">
              <div class="d-flex">
                  <button
                  type="button"
                  class="btn btn-outline-dark"
                  >
                  <i class="bi-cart-fill"></i>
                  <span>Vaciar Carrito</span>
                  </button>
              </div>
              <div class="d-flex">
                  <h3>Total: ${this.total}</h3>
              </div>
          </div>
      </div>
    </div>
    `;
  }
  // Metodos
  onRender() {
    window.requestAnimationFrame(() => {
      this.eventTarget.dispatchEvent(new Event("onRender")); // Evento renderizado
    });
  }
  // Actualizar el carrito
  actualizarCarrito(productos) {
    this.productos = productos;
    this.render();
  }
}
