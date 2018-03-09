$(document).ready(function() {

  if (!("ontouchstart" in window)) {
    document.documentElement.className += " no-touch";
  } else {
    document.documentElement.className += " touch";
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $('body').addClass('ios');
  } else {
    $('body').addClass('web');
  };
  $('body').removeClass('loaded');

  //Sandwich
  var navBtn = document.querySelector(".header__btn");
  var sandwich = document.querySelector(".burger");
  var mnu = document.querySelector(".nav");
  var popup = document.querySelector(".popup");
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

  $('.btn--popup').on('click', function(event){
    event.preventDefault();
    $('.popup').removeClass('none');
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

//toTop
$(function() {
 $.fn.scrollToTop = function() {
  $(this).hide().removeAttr("href");
  if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
  var scrollDiv = $(this);
  $(window).scroll(function() {
   if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
   else $(scrollDiv).fadeIn("slow")
  });
  $(this).click(function() {
   $("html, body").animate({scrollTop: 0}, "slow")
  })
 }
});

$(function() {
 $("#go-top").scrollToTop();
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

  $('.compartment-slider').slick({
   lazyLoad: 'ondemand',
   slidesToShow: 1,
   slidesToScroll: 1,
   infinite: true,
   dots: true,
   centerPadding: '50px',
   prevArrow:'<button class="prevArrow slider__arrow"><span></span></button>',
   nextArrow:'<button class="nextArrow slider__arrow"><span></span></button>',
   responsive: [
      {
        breakpoint: 481,
        settings: {
          dots: false
        }
      }
    ]
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

  (function($) {
    $(function() {
      $('.js-nav-tabs').on('click', 'li:not(.active)', function(evt) {
        evt.preventDefault();
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('.js-tabs.comfort__tabs').find('.js-tab-pane').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  jQuery(".js-tabs .js-nav-tabs > li").last().addClass("tab-last");
  jQuery(".js-tabs .js-nav-tabs > li").first().addClass("tab-first");

  jQuery('.js-tabs .next').click(function(){
    jQuery('.js-nav-tabs > li.active').next('li').find('a').trigger('click');
    jQuery('.js-nav-tabs > li').find('a.active').parents('li').addClass("active");
     jQuery('.js-nav-tabs > li.active a').removeClass("active");
    jQuery(".prev").removeClass("hidden");
     var lastQ = jQuery("li.tab-last").hasClass("active");

        if (lastQ) {
          jQuery(".next").addClass("hidden");
        } else {
          jQuery(".next").removeClass("hidden");
        }
        jQuery(".prev").removeClass("hidden");

  });

  jQuery('.js-tabs .prev').click(function(){
    jQuery('.js-nav-tabs > li.active').prev('li').find('a').trigger('click');
    jQuery('.js-nav-tabs > li').find('a.active').parents('li').addClass("active");
    jQuery('.js-nav-tabs > li.active a').removeClass("active");

        var firstQ = jQuery("li.tab-first").hasClass("active");

        if (firstQ) {
          jQuery(".prev").addClass("hidden");
        } else {
          jQuery(".prev").removeClass("hidden");
        }
        jQuery(".next").removeClass("hidden");

  });

  $('.documents__item').click(function(evt){
    evt.preventDefault();
    $('.documents__item').removeClass('active');
    $(this).addClass('active');
  });

  $('#next').click(function(){
    $('.documents__item.active').next().trigger('click');
    $('.documents__number-item.active').next().addClass('active');
    $('.documents__number-item.active').prev().removeClass('active');
  });

  $('#prev').click(function(){
    $('.documents__item.active').prev().trigger('click');
    $('.documents__number-item.active').prev().addClass('active');
    $('.documents__number-item.active').next().removeClass('active');
  });

  $('.documents__btn').click(function(){
    $('.documents__item.active .documents__popup').addClass('active');
  });

  $('.documents__close').click(function(){
    $('.documents__popup').removeClass('active');
  });

  if( window.innerWidth <= 480 ){
    $('.documents__list').addClass('documents__slider');
  }

  $('.documents__slider').slick({
    prevArrow:'<button class="prevArrow slider__arrow"><span></span></button>',
    nextArrow:'<button class="nextArrow slider__arrow"><span></span></button>',
  });

  $(".nav").on("click","a", function (evt) {
    evt.preventDefault();
    var id  = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
  });

  $(function() {
   $.fn.scrollToTop = function() {
    $(this).hide().removeAttr("href");
    if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
    var scrollDiv = $(this);
    $(window).scroll(function() {
     if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
     else $(scrollDiv).fadeIn("slow")
    });
    $(this).click(function() {
     $("html, body").animate({scrollTop: 0}, "slow")
    })
   }
  });

  $(function() {
   $("#go-top").scrollToTop();
  });

  //fixed nav
  $(function() {
    $(checkPosition);
    function checkPosition() {
      if (window.matchMedia("(max-width: 1920px)").matches) {
        var menuWrap = $(".header__wrap");
        if (menuWrap.length !== 0) {
          var stickyHeaderTop = menuWrap.offset().top;
        }

        $(window).scroll(function() {
          if ($(window).scrollTop() > stickyHeaderTop) {
            menuWrap.addClass("fixed");
          } else {
            menuWrap.removeClass("fixed");
          }
        });
      }
    }
  });
})();
