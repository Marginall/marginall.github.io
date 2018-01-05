if (!("ontouchstart" in window)) {
  document.documentElement.className += " no-touch";
} else {
  document.documentElement.className += " touch";
}

$(window).on("load", function() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $('body').addClass('ios');
  } else {
    $('body').addClass('web');
  };
  $('body').removeClass('loaded');
});

$('.single-item').slick({
 lazyLoad: 'ondemand',
 slidesToShow: 1,
 slidesToScroll: 1,
 infinite: true,
 centerPadding: '50px',
 prevArrow:'<button class="prevArrow slider__arrow"><span></span></button>',
 nextArrow:'<button class="nextArrow slider__arrow"><span></span></button>',
});

$('.single-item').on('afterChange', function(event, slick, currentSlide){
  if (currentSlide == 0) {
    $('.slider__number span').removeClass('number4');
    $('.slider__number span').removeClass('number3');
    $('.slider__number span').removeClass('number5');
    $('.slider__number span').removeClass('number2');
  }

  if (currentSlide == 1) {
    $('.slider__number span').addClass('number2');
    $('.slider__number span').removeClass('number4');
    $('.slider__number span').removeClass('number3');
    $('.slider__number span').removeClass('number5');
  }

  if (currentSlide == 2) {
    $('.slider__number span').addClass('number3');
    $('.slider__number span').removeClass('number4');
    $('.slider__number span').removeClass('number5');
    $('.slider__number span').removeClass('number2');
  }

  if (currentSlide == 3) {
    $('.slider__number span').addClass('number4');
    $('.slider__number span').removeClass('number5');
    $('.slider__number span').removeClass('number3');
    $('.slider__number span').removeClass('number2');
  }

  if (currentSlide == 4) {
    $('.slider__number span').addClass('number5');
    $('.slider__number span').removeClass('number4');
    $('.slider__number span').removeClass('number3');
    $('.slider__number span').removeClass('number2');
  }
});

(function($) {
  $(function() {
    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
      $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
  });
})(jQuery);

$(document).ready(function() {

  //Sandwich
  var navBtn = document.querySelector(".header__btn");
  var sandwich = document.querySelector(".burger");
  var mnu = document.querySelector(".nav");
  var popup = document.querySelector(".popup");
  var popupShow = document.querySelector(".btn--promo");
  var popupForm = document.querySelector(".popup__form");
    navBtn.addEventListener("click", function(event) {
    event.preventDefault();
    if (sandwich.classList.contains("open")) {
        sandwich.classList.remove("open");
        navBtn.classList.remove("open");
        mnu.classList.remove("open");
    } else {
        sandwich.classList.add("open");
        navBtn.classList.add("open");
        mnu.classList.add("open");
    }
  });

  $('.nav__link').on('click', function(event){
    $('.nav').removeClass('open');
    sandwich.classList.remove("open");
    navBtn.classList.remove("open");
  });

  popupShow.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("none");
  });

  $('.popup__close').on('click', function(event){
    event.preventDefault();
    $('.popup').addClass('none');
  });

  	//close popup when clicking the esc keyboard button
  	$(document).keyup(function(event){
      	if(event.which=='27'){
      		$('.popup').addClass('none');
  	    }
    });
});

(function() {
  var popupForm = document.querySelector(".popup__form");
  popupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(popupForm);
    request(data, function(response) {
      console.log(response);
    });
  });

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "mail.php?" + (new Date()).getTime());
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
        $('.popup').addClass('none');
      }
    });
    xhr.send(data);
  }
})();
