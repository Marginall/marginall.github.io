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

$(document).ready(function() {

	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
		});
		return false;
	});

});

/*//send form
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
*/


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
