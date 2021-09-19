// Clase Producto
export class Producto {
  constructor(boton, nombre, precio, imagen, descripcion) {
    this.boton = boton;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.cantidad = 1;
  }

  // Funcion para agregar producto al carrito
  agregarProducto() {
    let productos = JSON.parse(localStorage.getItem("productos"));
    if (productos == null) {
      productos = [];
    }
    productos.push({
      nombre: this.nombre,
      precio: this.precio,
      imagen: this.imagen,
      descripcion: this.descripcion,
      cantidad: this.cantidad,
    });
    localStorage.setItem("productos", JSON.stringify(productos));
  }
}