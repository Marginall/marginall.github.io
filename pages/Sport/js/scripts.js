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

$(document).ready(function() {
  $("body").waitForImages(function() {
    $(document).ready(function() {
      var lastScrollTop = 0;
      $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        if (st == 0) {
          $('#header').addClass("active");
          $('#header').removeClass("fixed");
        } else {
          $('#header').removeClass("active");
          $('#header').addClass("fixed");
        }
        lastScrollTop = st;
      });

      new WOW().init();

      /*Header scroll*/

      /* placeholder*/
      $('input, textarea').each(function() {
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function() {
          $(this).attr('placeholder', '');
        });
        $(this).focusout(function() {
          $(this).attr('placeholder', placeholder);
        });
      });
      /* placeholder*/

      /*
      function initialize() {
        var mapCanvas = document.getElementById('map-canvas');

        var mapOptions = {
          scrollwheel: true,
          center: new google.maps.LatLng(59.9388218,30.3230753),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var image = './img/map-icon.svg';
        var myLatLng = new google.maps.LatLng(59.9388218,30.3230753);
        var Marker = new google.maps.Marker({
          position: myLatLng,
          animation: google.maps.Animation.DROP,
          map: map,
          icon: {
          url: "./img/map-icon.svg",
          scaledSize: new google.maps.Size(96, 96)
        }

        });

        $.getJSON("/json/map-options.json", function(data) {
          map.setOptions({styles: data});
        });
      }

      google.maps.event.addDomListener(window, 'load', initialize); */

      $('select').styler({
        selectSmartPositioning: false
      });

      $('.catalog__input').styler();

      $('.header__city').click(function(e) {
        $('.header__city-wrap').toggleClass('active');
        $('.wrapper-outer').toggleClass('active');
      });

      $('.header__search-link').click(function(e) {
        $(this).removeClass('active');
        $('.header__search-form').toggleClass('active');
      });

      //закрытие по Esc

      window.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
          $('.popup').removeClass('active');
          $('.wrapper-outer').removeClass('active');
          $('.header__search-link').addClass('active');
          $('.userbox__login').addClass('visually-hidden');
          $('.profile').addClass('visually-hidden');
          $('.catalog__form .searchresults').removeClass('active');
          $('.catalog__search').blur();
        }
      });

      //закрытие по клику

      jQuery(function($) {
        $(document).mouseup(function(e) { // отслеживаем событие клика по веб-документу
          var block = $(".popup"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
          if (!block.is(e.target) // проверка условия если клик был не по нашему блоку
            &&
            block.has(e.target).length === 0) { // проверка условия если клик не по его дочерним элементам
            $('.popup').removeClass('active');
            $('.wrapper-outer').removeClass('active');
            $('.header__search-link').addClass('active');
            $('.profile').addClass('visually-hidden');
            $('.sidebar__list').removeClass('active');
          }
        });
      });

      $('#citySearch').focusin(function(e) {
        $('.city__popular').css("display", "none");
      });

      $('.city__search').styler({
        selectSearch: true
      });

      //Поиск

      $('#citySearch').keyup(function() {
        var searchField = $('#citySearch').val();
        var myExp = new RegExp(searchField, "i");
        $.getJSON('json/data.json', function(data) {
          var output = '<ul class="searchresults">';
          $.each(data, function(key, val) {
            if (val.name.search(myExp) != -1) {
              output += '<li>';
              output += '<a href="#" class="city-item">' + val.name + '</a>';
              output += '</li>';
            } else {
              output += '<li class="not-result">Нет совпадений';
              output += '</li>';
            }
          });
          output += '</ul>';
          $('#cityUpdate').html(output);
          $(".searchresults").mCustomScrollbar();
          $('.header__city-wrap a').click(function() {
            var text = $(this).text();
            $('#myCity').text(text);
            $('.header__city-wrap').removeClass('active');
            $('.wrapper-outer').removeClass('active');
          });
        }); //get JSON
      });

      $('#catSearch').keyup(function() {
        var searchField = $('#catSearch').val();
        var myExp = new RegExp(searchField, "i");
        $.getJSON('json/data.json', function(data) {
          var output = '<ul class="searchresults popup active">';
          $.each(data, function(key, val) {
            if (val.name.search(myExp) != -1) {
              output += '<li>';
              output += '<a href="#" class="city-item">' + val.name + '</a>';
              output += '</li>';
            } else {
              output += '<li class="not-result">Нет совпадений';
              output += '</li>';
            }
          });
          output += '</ul>';
          $('#catUpdate').html(output);
        }); //get JSON
      });

      $('.header__city-wrap a').click(function() {
        var text = $(this).text();
        $('#myCity').text(text);
        $('.header__city-wrap').toggleClass('active');
        $('.wrapper-outer').toggleClass('active');
      });

      $('#siteSearch').keyup(function() {
        var searchField = $('#siteSearch').val();
        var myExp = new RegExp(searchField, "i");
        $.getJSON('json/data.json', function(data) {
          var output = '<ul class="searchresults">';
          $.each(data, function(key, val) {
            if (val.name.search(myExp) != -1) {
              output += '<li>';
              output += '<a href="#" class="search__item">' + val.name + '</a>';
              output += '</li>';
            } else {
              output += '<li class="not-result">Ничего не найдено';
              output += '</li>';
            }
          });
          output += '</ul>';
          $('#siteUpdate').html(output);
          $(".searchresults").mCustomScrollbar();
          $('.wrapper-outer').addClass('active');
        }); //get JSON
      });

      //Отправка формы

      (function() {
        var link = document.querySelector(".userbox__login-link");
        var form = document.querySelector(".userbox__login");
        var login = form.querySelector("[name=login]");
        var password = form.querySelector("[name=password]");
        var storage = localStorage.getItem("login");

        link.addEventListener("click", function(event) {
          event.preventDefault();
          form.classList.remove("visually-hidden");
          if (storage) {
            login.value = storage;
            password.focus();
          } else {
            login.focus();
          }
        });

        form.addEventListener("submit", function(event) {
          event.preventDefault();

          if (!login.value || !password.value) {
            form.classList.add("modal-error");
          } else {
            localStorage.setItem("login", login.value);
            form.classList.add("visually-hidden");
            $('.profile').removeClass('visually-hidden');
            alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
          }
        });
      })();

      $(".userbox__login").submit(function() {
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: $(this).serialize()
        }).done(function() {

        });
        return false;
      });

      $('.btn--close').click(function() {
        $('.organisation').removeClass('slideInLeft slideInDown');
        $('.organisation').addClass('slideOutUp');
        $('header').toggleClass('header-border');
        setTimeout(function() {
          $('.organisation').removeClass('active');
          $('.btn--open').addClass('active');
        }, 1000);
      });

      $('.btn--open').click(function() {
        $('header').toggleClass('header-border');
        $('.organisation').removeClass('slideOutUp');
        $('.organisation').addClass('active slideInDown');
        $('.btn--open').removeClass('active');
      });
    });
  });

  $("#catSearch").focusin(function() {
    $(".catalog__label").addClass('catalog__label--focus');
  });

  $("#catSearch").focusout(function() {
    $(".catalog__label").removeClass('catalog__label--focus');
  });

  //фильтр +-

  (function() {
    var plus = document.createElement("span");
    var minus = document.createElement("span");
    var div = document.createElement("div");

    div.className = "choice";
    plus.className = "plus";
    minus.className = "minus";
    plus.appendChild(document.createTextNode("+"));
    minus.appendChild(document.createTextNode("-"));
    div.appendChild(plus);
    div.appendChild(minus);

    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function(fn, scope) {
        for (var i = 0, len = this.length; i < len; ++i) {
          fn.call(scope, this[i], i, this);
        }
      };
    }

    HTMLCollection.prototype.forEach = NodeList.prototype.forEach = Array.prototype.forEach;

    function build(el) {
      var new_el = div.cloneNode(true);
      new_el.appendChild(el.cloneNode());
      el.parentNode.replaceChild(new_el, el);
    }

    function num_click(e) {
      var el = e ? e.target : window.event.srcElement;
      if (el.tagName !== "SPAN") return;
      var inp = this.lastChild;
      var val = +inp.value;
      inp.value = val + (el.className == "plus" ? 1 : val > 0 ? -1 : 0);
    }

    function num_input(e) {
      var el = e ? e.target : window.event.srcElement;
      if (el.tagName !== "INPUT") return;
      var val = el.value.replace(/\D/g, '');
      el.value = val ? val : 0;
    }

    document.querySelectorAll('input.number').forEach(build);
    document.querySelectorAll('div.choice').forEach(function(el) {
      el.onclick = num_click;
      el.oninput = num_input;
    });
  }());

  //Акордеон

  $(".set > a").on("click", function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass("active");
      $(this).siblings('.accordion-content').slideUp(500);
    } else {
      $(this).addClass("active");
      $(this).siblings('.accordion-content').slideDown(500);
    }
  });

  $(".sidebar__btn").on("click", function() {
    if ($('.sidebar__list').hasClass('active')) {
      $('.sidebar__list').removeClass('active');
      $('.sidebar__btn').addClass('active');
    } else {
      $('.sidebar__list').addClass('active');
      $('.sidebar__btn').removeClass('active');
    }
  });

  //toTop

  $(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() != 0) {
        $('#toTop').fadeIn();
        $('.sidebar').fadeIn();
      } else {
        $('#toTop').fadeOut();
        $('.sidebar').fadeOut();
      }
    });

    $('#toTop').click(function() {
      $('body,html').animate({
        scrollTop: 0
      }, 2000);
    });
  });
});
