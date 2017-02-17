var navMain = document.querySelector(".main-header__nav");
var navBtn = document.querySelector(".main-header__btn");

navMain.classList.remove("main-header__nav--no-js");

navBtn.addEventListener("click", function() {
    if (navMain.classList.contains("main-header__nav--closed")) {
      navMain.classList.remove("main-header__nav--closed");
      navMain.classList.add("main-header__nav--show");
    } else {
      navMain.classList.add("main-header__nav--closed");
      navMain.classList.remove("main-header__nav--show");
    }
});
