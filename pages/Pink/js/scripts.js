var navMain = document.querySelector(".nav");
var navBtn = document.querySelector(".header__btn");
var sandwich = document.querySelector(".burger");
var topMenu = document.querySelector(".header__top-menu");
var header = document.querySelector(".header");
var resize = document.querySelector("#resize");
var contrast = document.querySelector("#contrast");
var brightness = document.querySelector("#brightness");
var resizeLab = document.querySelector("#resizeLab");
var contrastLab = document.querySelector("#contrastLab");
var brightnessLab = document.querySelector("#brightnessLab");

(function() {
  var button = document.querySelector(".btn");
  button.addEventListener("tap", function(event) {
    console.log("Тап по кнопке");
  });
})();

navBtn.addEventListener("click", function(event) {
    event.preventDefault();
    if (sandwich.classList.contains("open")) {
        sandwich.classList.remove("open");
    } else {
        sandwich.classList.add("open");
    }
});

navMain.classList.remove("nav--no-js");

navBtn.addEventListener("click", function(event) {
    event.preventDefault();
    if (navMain.classList.contains("nav--closed")) {
        navMain.classList.remove("nav--closed");
        navMain.classList.add("nav--show");
        navMain.classList.add("animated-down");
    } else {
        navMain.classList.add("nav--closed");
        navMain.classList.remove("nav--show");
        navMain.classList.add("animated-up");
    }
});

navBtn.addEventListener("click", function(event) {
    if (topMenu.classList.contains("color")) {
        topMenu.classList.remove("color");
    } else {
        topMenu.classList.add("color");
    }
});

navBtn.addEventListener("click", function(event) {
    if (header.classList.contains("color")) {
        header.classList.remove("color");
    } else {
        header.classList.add("color");
    }
});

//send form
(function() {

    if (!("FormData" in window)) {
        return;
    }

    var form = document.querySelector(".upload__form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var data = new FormData(form);

        request(data, function(response) {
            console.log(response);
        });

        function request(data, fn) {
            var xhr = new XMLHttpRequest();

            xhr.open("post", "mail.php" + (new Date()).getTime());

            xhr.addEventListener("readystatechange", function() {
                if (xhr.readyState == 4) {
                    fn(xhr.responseText);
                }
            });
            xhr.send(data);
        }
    });


    //add photo
   (function() {
        if ("FileReader" in window) {

            var form = document.querySelector(".upload__form");
            var area = document.querySelector(".upload__images");
            var imgBg = document.querySelector("#img-bg");

            form.querySelector("#uploadPhoto").addEventListener("change", function() {
                var files = this.files;
                for (var i = 0; i < files.length; i++) {
                    preview(files[i]);
                }
                imgBg.classList.add("upload__img-bg--hidden");
            });

            function preview(file) {
                if (file.type.match(/image.*/)) {
                    var reader = new FileReader();
                    reader.addEventListener("load", function(event) {
                        var newImg = document.createElement("img");
                        newImg.src = event.target.result;
                        newImg.alt = file.name;
                        newImg.setAttribute("id", "photo");
                        newImg.setAttribute("class", "upload__img");

                        area.appendChild(newImg);

                        form.querySelector(".upload__images").classList.add(".upload__images--ie");

                        form.querySelector("#reset").addEventListener("click", function(event) {
                            newImg.parentNode.removeChild(newImg);
                            imgBg.classList.remove("upload__img-bg--hidden");
                        });
                    });

                    reader.readAsDataURL(file);
                }
            }
        }
    })();
})();

//range photo filter

$("#contrast").change(function() {
    var contrast = $(this).val();
    $("#photo").css("filter", "contrast(" + contrast + "%)");
});

$("#brightness").change(function() {
    var brightness = $(this).val();
    $("#photo").css("filter", "brightness(" + brightness + "%)");
});

resizeLab.addEventListener("click", function(event) {
    resizeLab.classList.add("active");
    resize.classList.add("filter--show");
    brightness.classList.remove("filter--show");
    brightnessLab.classList.remove("active");
    contrast.classList.remove("filter--show");
    contrastLab.classList.remove("active");
});

contrastLab.addEventListener("click", function(event) {
    contrastLab.classList.add("active");
    contrast.classList.add("filter--show");
    brightness.classList.remove("filter--show");
    brightnessLab.classList.remove("active");
    resize.classList.remove("filter--show");
    resizeLab.classList.remove("active");
});

brightnessLab.addEventListener("click", function(event) {
    brightness.classList.add("filter--show");
    brightnessLab.classList.add("active");
    contrast.classList.remove("filter--show");
    contrastLab.classList.remove("active");
    resize.classList.remove("filter--show");
    resizeLab.classList.remove("active");
});
