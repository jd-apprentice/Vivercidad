// Iniciar Firebase
const db = firebase.firestore();
const storage = firebase.storage();

// Primer Swiper
const carrousel = {
  nombreProducto: document.querySelectorAll('.nombreProducto'),
  precioProducto: document.querySelectorAll('.precioProducto'),
  imagenProducto: document.querySelectorAll('.imagenProducto'),
  descripcionProducto: document.querySelectorAll('.descripcionProducto'),
}

// Segundo Swiper
const carrousel2 = {
  nombreProducto: document.querySelectorAll(".nombreProducto2"),
  precioProducto: document.querySelectorAll(".precioProducto2"),
  imagenProducto: document.querySelectorAll(".imagenProducto2"),
  descripcionProducto: document.querySelectorAll(".descripcionProducto2"),
}

// Objeto carrousel
const carrousels = {
  carrousel,
  carrousel2,
}

// Pintar todos los datos en el index
const getIndex = async (coleccion) => {
  const querySnapshots = await db.collection(coleccion).get() // Obtener todos los documentos
  const productsPromises = querySnapshots.docs.map((doc) => doc.data()) // Obtener todos los datos de cada documento
  const products = await Promise.all(productsPromises) // Esperar a que se resuelvan todas las promesas
  const imageUrlsPromises = products.map(product => storage.ref(`imagenes/${product.id}`).getDownloadURL()) // Obtener las urls de las imagenes
  const imageUrls = await Promise.all(imageUrlsPromises) // Esperar a que se resuelvan todas las promesas
  for (const [i, product] of Object.entries(products)) { // Recorrer los datos
      carrousels[coleccion].nombreProducto[i].innerHTML = product.nombre; // Pintar el nombre
      carrousels[coleccion].precioProducto[i].innerHTML = `$ ${product.precio}`; // Pintar el precio
      carrousels[coleccion].descripcionProducto[i].innerHTML = product.descripcion; // Pintar la descripcion
      carrousels[coleccion].imagenProducto[i].src = imageUrls[i]; // Pintar la imagen
  }
}

getIndex("carrousel");
getIndex("carrousel2");
