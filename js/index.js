document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".own-carousel__container").ownCarousel({
      itemPerRow:5, 
      itemWidth:19,
      responsive: {
          1000: [4, 24],
          800: [3, 33],
          600: [2, 49],
          400: [1, 100]
      },
  });
});

const htmlName = document.querySelector("#changeName");
const btnSalir = document.querySelector("#btnDropDo");
const btnDrop = document.querySelector("#dropdownMenuButton1");

const userName = JSON.parse(
  sessionStorage.getItem(
    "firebase:authUser:AIzaSyDo-Mx2Jz3j5MR9vH0V5ypYk3cQxYqYB7Y:[DEFAULT]"
  )
);
htmlName.innerText = userName.displayName;

btnSalir.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("salimo");
      btnLogin.style.display = "block";
      googleAcc.style.display = "block";
      btnCreateU.style.display = "block";
      btnLogout.style.display = "none";
    })
    .catch((error) => {
      console.log(error.message);
    });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    btnDrop.removeClass("dropdown-toggle show");
  }
});
