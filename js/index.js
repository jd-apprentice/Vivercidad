// Swipers del index

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});
var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});
var swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

// Swiper del header

var mySwiperHead = new Swiper(".mySwiperHead", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper4 = new Swiper(".mySwiper4", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

const dNone = document.querySelector(".insertName");
const dropdown = document.createElement("div");

const userName = JSON.parse(
  sessionStorage.getItem(
    "firebase:authUser:AIzaSyDo-Mx2Jz3j5MR9vH0V5ypYk3cQxYqYB7Y:[DEFAULT]"
  )
);

let nombre = "";
if (userName.displayName === null) {
  nombre = userName.email;
} else {
  nombre = userName.displayName;
}

// Usuarios normales

firebase.auth().onAuthStateChanged((user) => {
  if (user.emailVerified === true) {
    let words = "";
    const elimB = document.querySelector("#elimSiUsuarioExist");
    elimB.style.display = "none";
    words = nombre.split("@");
    dropdown.innerHTML = `<div class="dropdown">
        <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle me-1"></i>  
        ${words[0]}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" id="logOut">Salir</a></li>
        </ul>
        </div>`;
    dNone.appendChild(dropdown);
    const logOut = document
      .querySelector("#logOut")
      .addEventListener("click", () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("Salimo");
            location.reload();
          })
          .catch((error) => {
            // An error happened.
          });
      });

    // Si el usuario es el administrador

  } else if (user.uid == "t9NLsKRAT0S2ktmEoHANNfqeYhs2") {
    let words = "";
    words = nombre.split("@");
    const elimB = document.querySelector("#elimSiUsuarioExist");
    elimB.style.display = "none";
    dropdown.innerHTML = dropdown.innerHTML = `<div class="dropdown">
        <button class="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle me-1"></i>
        ${words[0]}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="./añadirProducto.html" style="cursor:pointer">Añadir Producto</a></li>
          <li><a class="dropdown-item" style="cursor:pointer" id="logOut">Salir</a></li>
        </ul>
        </div>`;
    dNone.appendChild(dropdown);
    const logOut = document
      .querySelector("#logOut")
      .addEventListener("click", () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("Salimo");
            location.reload();
          })
          .catch((error) => {
            // An error happened.
          });
      });
  }
});