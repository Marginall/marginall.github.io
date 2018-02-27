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

$(function(){

	$("#video__play").click(function(){
		var dataYoutube = $(this).parents('.video-responsive').attr('data-youtube');
		$(this).parents('.video-responsive').html('<iframe width="100%" height="100%" class="iframe" src="https://www.youtube.com/embed/'+ dataYoutube +'?autoplay=1" frameborder="0" allowfullscreen></iframe>')
	});

});
