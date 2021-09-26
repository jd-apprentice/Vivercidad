// Modulos
import { formatMoney, incrementData } from "../../moduloUtils/format.js";
export class Render {
  constructor(contenedor = [], productos = [], total = 0) {
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
            <td>${producto.precio}</td>
            <td>
                <input
                data-id="${incrementData(this.dataset)}"
                type="number"
                min="1"
                id="${producto.id}"
                class="form-control operaciones"
                value="${producto.cantidad}"
                />
            </td>
            <td>
                <button
                type="button"
                id="${producto.id}"
                class="btn btn-danger"
                >
                <i id="${producto.id}" class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
            `;
      // Obtener el total
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
            class="btn btn-outline-dark btnVaciar"
            >
            <i class="bi-cart-fill"></i>
            <span>Vaciar Carrito</span>
          </button>
        <td>
        </td>
        <td>
          <td>
            <td class="d-flex justify-content-end">
              <h3 class="grabTotal">Total: ${formatMoney(this.total)}</h3>
            </td>
          </td>
        </td>
    </tr>
    `;
}

  addEventListener(evento) {
    const btnVaciar = document.querySelector(".btnVaciar");
    btnVaciar.addEventListener("click", evento);
  }
  
  changeValue(evento) {
    const getOperaciones = document.querySelectorAll(".operaciones");
    getOperaciones.forEach((operacion) => {
      operacion.addEventListener("change", evento);
    });
  }

  deleteProduct(evento) {
    const getBtnDelete = document.querySelectorAll(".btn-danger");
    getBtnDelete.forEach((btnDelete) => {
      btnDelete.addEventListener("click", evento);
    });
  }

  updateTotal() {
    this.total = this.productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
    const getTotal = document.querySelector(".grabTotal");
    getTotal.innerHTML = `Total: ${formatMoney(this.total)}`;
  }
}
