export const addContador = () => {
    sessionStorage.setItem("contador", Number(localStorage.getItem("contador")) + 1);
    let getCarrito = document.querySelector("#contadorCarrito")
    getCarrito.innerHTML++;
}