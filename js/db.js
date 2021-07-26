// Iniciar Firebase

const db = firebase.firestore();

// Leer todos los datos

async function readDatos() {
  const snapshot = await db.collection('plantas').get();
  snapshot.forEach((doc) => {
    /* console.log(doc.id, '=>', doc.data()); */
    console.log('Planta: ', doc.data().nombre, 'Precio: ', doc.data().precio);
  });
}

// Leer documento expecifico

async function readDocuments() {
  const snapshot = db.collection('plantas').doc('056F0WCI91FoV6nNOtpA');
  const doc = await snapshot.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
    /* console.log(doc.data().nombre); */
  }
}