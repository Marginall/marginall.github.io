var popup = document.querySelector(".modal-map");
var mapLink = document.querySelector(".map");
var closeMap = popup.querySelector(".map-close");
var popupForm = document.querySelector(".modal-popup");
var formLink = document.querySelector(".contacts-btn");
var closeForm = popupForm.querySelector(".popup-close");
var overlay = document.querySelector(".modal-overlay");
var form = popupForm.querySelector(".modal-form");
var login = popupForm.querySelector(".name");
var mail = popupForm.querySelector(".mail");

mapLink.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("animated");
  popup.classList.add("modal-map-show");
  overlay.classList.add("modal-overlay-show");
});

closeMap.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-map-show");
  overlay.classList.remove("modal-overlay-show");
});

formLink.addEventListener("click", function(event) {
  event.preventDefault();
  popupForm.classList.add("animated");
  popupForm.classList.add("modal-popup-show");
  overlay.classList.add("modal-overlay-show");
});

closeForm.addEventListener("click", function(event) {
  event.preventDefault();
  popupForm.classList.remove("modal-popup-show");
  overlay.classList.remove("modal-overlay-show");
});

form.addEventListener("submit", function(event) {
  if (!login.value) {
    event.preventDefault();
    login.classList.add("error");
  }
});

form.addEventListener("submit", function(event) {
  if (!mail.value) {
    event.preventDefault();
    mail.classList.add("error");
  }
});
