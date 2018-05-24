const menuButton = document.querySelector(".button--overlay")
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector(".overlay").classList.toggle("active");
  menuButton.classList.toggle("active");
  document.querySelector("body").classList.toggle("noscroll");
}
