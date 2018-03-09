$(document).ready(function() {

  var navBtn = document.querySelector(".header__btn");
  var sandwich = document.querySelector(".burger");
  var mnu = document.querySelector(".nav--mobile");
    navBtn.addEventListener("click", function(event) {
    event.preventDefault();
    if (sandwich.classList.contains("open")) {
        sandwich.classList.remove("open");
        navBtn.classList.remove("open");
        mnu.classList.remove("open");
        $('.nav--mobile').addClass('zoomOut');
        $('.nav--mobile').removeClass('zoomIn');
    } else {
        sandwich.classList.add("open");
        navBtn.classList.add("open");
        mnu.classList.add("open");
        $('.nav--mobile').addClass('zoomIn');
        $('.nav--mobile').removeClass('zoomOut');
    }
  });

  $(".menu__item > a").on("click", function(event) {
    event.preventDefault();
    $('.menu__sublist').removeClass('position');
    if ($(this).hasClass('active')) {
      $(this).removeClass("active");
      if ($(window).width() <= '991'){
        $(this).siblings('.menu__sublist').slideUp(500);
      }else{
        $(this).siblings('.menu__sublist').removeClass('position');
      }
    } else {
      $('.menu__item > a').removeClass('active');
      $(this).addClass("active");
      if ($(window).width() <= '991'){
        $(this).siblings('.menu__sublist').slideDown(500);
      }else{
        $(this).siblings('.menu__sublist').addClass('position');
      }
    }
  });

  $(".menu__subitem > a").on("click", function() {
    $(".menu__item > a").removeClass('active');
    $(".menu__sublist").removeClass('position');
  });

  $('select').styler();

  $('.filter__link').on('click', function(e){
    e.preventDefault();
  });

  (function($) {
    $(function() {
      $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('.tabs').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  $('.tabs__caption').on('click', function(){
    $('.filter__form')[0].reset();
    $('input.error').removeClass("error");
    $('#price-error').remove();
    setTimeout(function() {
      $('.filter__form select').trigger('refresh');
    }, 1)

    if($('.filter__select').length !== 7){
      $('.filter__form').addClass('justify');
    }else{
      $('.filter__form').removeClass('justify');
    }
  });

  (function($) {
    $(function() {
      $('ul.filter__list').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('.catalog__filter').find('.filter__content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  $('.login').on('click', function(event){
    event.preventDefault();
    $('.popup').addClass('active');
    $('.overlay').addClass('active');
  });

  $('.popup__close-btn').on('click', function(){
    $('.popup').removeClass('active');
    $('.overlay').removeClass('active');
  });

  $('.contacts__btn').on('click', function(){
    $('.callback').addClass('active');
    $('.overlay').addClass('active');
  });

  $('.callback__close-btn').on('click', function(){
    $('.callback').removeClass('active');
    $('.overlay').removeClass('active');
  });

  $('.subscription__close-btn').on('click', function(){
    $('.subscription').removeClass('active');
    $('.overlay').removeClass('active');
  });

  $('.popup__checkbox-block').on('click', function(){
    if($('.popup__checkbox-icon').hasClass('active')){
      $('.popup__checkbox-icon').removeClass('active');
    }else{
      $('.popup__checkbox-icon').addClass('active');
    }
  });

  $("#tel").mask("+38(099) 999-9999");

  jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });

  $('.search__form').validate({
     rules: {
      search: {
        required: true,
        minlength: 2
    }
     },
      messages: {
        search: {
          required: "Поле обязательно к заполнению",
          minlength: "Введите не менее 2-х символов"
        }
     }
  });

  $('.popup__form').validate({
     rules: {
      password: {
        required: true,
        minlength: 4
    },
    email: {
      required: true,
      email: true
    }
     },
      messages: {
        password: {
          required: "Поле обязательно к заполнению",
          minlength: "Введите не менее 4-х символов"
    },
    email: {
      required: "Поле обязательно к заполнению",
      email: "Введите корректный email"
      }
    }
  });

  $('.footer__subscription').validate({
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        email: {
          required: "Поле обязательно к заполнению",
          email: "Введите корректный email"
      }
    },
    submitHandler: function(form) {
        $.ajax({
            url: form.action,
            type: form.method,
            data: $('.footer__subscription').serialize(),
            success: function(response) {
              $('.subscription').addClass('active');
              $('.overlay').addClass('active');
            }
        });
    }
  });

  var validator = $('.filter__form').validate({
      rules: {
        price: {
          required: true,
          min: 1
        },
        price: {
          required: true,
          min: 1
        }
      },

      messages: {
        price: {
          required: "Поле обязательно к заполнению",
          min: "Введите число больше нуля"
       },
        price: {
          required: "Поле обязательно к заполнению",
          min: "Введите число больше нуля"
       }
     },
     submitHandler: function(form) {
         $.ajax({
             url: form.action,
             type: form.method,
             data: $('.footer__subscription').serialize(),
             success: function(response) {
             }
         });
     }
  });

  $(function(){
    $("[type='reset']").on("click", function(e){
      e.preventDefault();
      $(this).closest('.filter__form').get(0).reset();
      $('.filter__select').trigger("refresh");
      $('input.error').removeClass("error");
      $('#price-error').remove();
    });
  })
});
