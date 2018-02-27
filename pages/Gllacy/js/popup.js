var link = document.querySelector(".map-btn");
var popup = document.querySelector(".popup-form");
var close = popup.querySelector(".popup-form-close");
var overlay = document.querySelector(".modal-overlay");

link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("popup-form-show");
  overlay.classList.add("modal-overlay-show");
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("popup-form-show");
  overlay.classList.remove("modal-overlay-show");
});
