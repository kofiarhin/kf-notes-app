const menu = document.querySelector(".menu");
const sidenav = document.querySelector("#sidenav");
const close = document.querySelector("#sidenav i");

menu.addEventListener("click", function (e) {
  sidenav.classList.add("show");
});

close.addEventListener("click", function (e) {
  sidenav.classList.remove("show");
});
