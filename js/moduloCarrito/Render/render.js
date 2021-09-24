import { formatMoney } from "../../moduloUtils/format.js"
export class Render {
  constructor(contenedor, productos, total = 0) {
    this.contenedor = contenedor;
    this.productos = productos;
    this.total = total;
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
              class="img-fluid img-thumbnail imagenCarrito"
              />
          </td>
          <td>${producto.nombre}</td>
          <td>${formatMoney(producto.precio)}</td>
          <td>
              <input
              type="number"
              class="form-control mas"
              value="${producto.cantidad}"
              />
          </td>
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
        return total + producto.precio * producto.cantidad;
      }, 0);
    });
    // Pintar el HTML
    this.contenedor.innerHTML += `
    <tr>
      <td class="d-flex">
          <button
            type="button"
            class="btn btn-outline-dark"
            >
            <i class="bi-cart-fill"></i>
            <span>Vaciar Carrito</span>
          </button>
        <td>
        </td>
        <td>
          <td>
            <td class="d-flex justify-content-end">
              <h3>Total: ${formatMoney(this.total)}</h3>
            </td>
          </td>
        </td>
    </tr>
    `;
  }
  // Actualizar el carrito
  actualizarCarrito(productos) {
    this.productos = productos;
    this.render();
  }
}
