// t9NLsKRAT0S2ktmEoHANNfqeYhs2 <-- ADMIN

// Iniciar Firebase
const db = firebase.firestore();

const divPadre = document.querySelector("#divPadre1");
const divHije = document.createElement("div");
// Variables

const getNombres = document.querySelectorAll(".nombreProducto");
const getPrecio = document.querySelectorAll(".precioProducto");

const getNombresTwo = document.querySelectorAll(".nombreProducto2");
const getPrecioTwo = document.querySelectorAll(".precioProducto2");

//Agregando elementos al Padre

// ejemplo carrousel

/* <div class="col mb-5">
<div class="card h-100">
  <!-- Sale badge-->
  <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
    Oferta
  </div>
  <!-- Product image-->
  <img class="card-img-top" src="img/imagen_vivero5.png" alt="Prenda5" />
  <!-- Product details-->
  <div class="card-body p-4">
    <div class="text-center">
      <!-- Product name-->
      <h5 class="fw-bolder nombreProducto2">Sale Item</h5>
      <!-- Product price-->
      <span class="precioProducto2">$900</span>
    </div>
  </div>
  <!-- Product actions-->
  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
    <div class="text-center">
      <a class="btn btn-outline-dark mt-auto" href="#">Agregar al carrito</a>
    </div>
  </div>
</div>
</div> */
