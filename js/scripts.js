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

    $('.content--main  .cd-popup-trigger').on('click', function(event){
  		event.preventDefault();
      $(this).parent().find(".cd-popup").addClass('is-visible');
  	});

  	//close popup
  	$('.cd-popup').on('click', function(event){
  		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
  			event.preventDefault();
  			$(this).removeClass('is-visible');
  		}
  	});
  	//close popup when clicking the esc keyboard button
  	$(document).keyup(function(event){
      	if(event.which=='27'){
      		$('.cd-popup').removeClass('is-visible');
  	    }
    });

    // допустимые форматы времени:
    // https://tools.ietf.org/html/rfc2822#page-14
    // https://www.w3.org/TR/NOTE-datetime
    // Напр. 1 декабря 2018, полдень по Москве:
    var end = new Date('2018-03-01T12:00+03:00')
      ,offset = (new Date().getTimezoneOffset())*6E4
      ,timer
      ,$el
      ,key
      ,html = ''
    ;

    // generate markup
    html = ['years','months','days','hours','minutes','seconds']
        .reduce( function(p,c){ return p += makeHtml(c);}, '');
    $('.chart').html(html);

    $el = { // найти один раз и запомнить
      Y: {
        n: $('.chart__bar--years .chart__bar-number'),
        l: $('.chart__bar--years .chart__bar-label'),
        b: $('.chart__bar--years') }
      ,M: {
        n: $('.chart__bar--months .chart__bar-number'),
        l: $('.chart__bar--months .chart__bar-label'),
        b: $('.chart__bar--months') }
      ,D: {
        n: $('.chart__bar--days .chart__bar-number'),
        l: $('.chart__bar--days .chart__bar-label'),
        b: $('.chart__bar--days') }
      ,h: {
        n: $('.chart__bar--hours .chart__bar-number'),
        l: $('.chart__bar--hours .chart__bar-label'),
        b: $('.chart__bar--hours') }
      ,m: {
        n: $('.chart__bar--minutes .chart__bar-number'),
        l: $('.chart__bar--minutes .chart__bar-label'),
        b: $('.chart__bar--minutes') }
      ,s: {
        n: $('.chart__bar--seconds .chart__bar-number'),
        l: $('.chart__bar--seconds .chart__bar-label'),
        b: $('.chart__bar--seconds') }
    }

    /**
     * генерирует html одного блока
     */
    function makeHtml(key) {
      return [
        '<div class="chart__bar chart__bar--%KEY%">',
        '  <div class="chart__bar-content timer__item"">        ',
        '    <div class="chart__bar-number timer__circle"></div> ',
        '    <div class="chart__bar-label smalltext"></div>  ',
        '  </div>                                  ',
        '</div>                                    ',
      ].join("\n").replace(/%KEY%/g, key);
    }

    function showRemaining() {
      var start = new Date(), r;

      if( end - start < 0) return timeHasCome();

      r = calendiff( start, end);

      render( 'Y', r.years, ['Год','Года','Лет'], 3); // сколько максимум лет может быть?
      render( 'M', r.months, ['Месяц','Месяца','Месяцев'], 12);
      render( 'D', r.days, ['День','Дня','Дней'], 31);
      render( 'h', r.hours, ['Час','Часа','Часов'], 24);
      render( 'm', r.minutes, ['Минута','Минуты','Минут'], 60);
      render( 's', r.seconds, ['Секунда','Секунды','Секунд'], 60);
    }


    /**
     * Когда отсчёт закончился, или время уже прошло
     */
    function timeHasCome() {
      if(timer) {
        window.clearInterval( timer);
        timer = undefined;
      }
      $('.timer').html('<div class="done"></div>');
    }

    function render( key, n, s, max) {
      $el[key].n.text( ('0' + n).slice(-2));
      $el[key].l.text( getNumEnding(n, s));
      $el[key].b.css('height', ((n / max) * 100) + '%');
    }


  /**
   * Calendar difference between two dates
   * @param Date object dateIn start date
   * @param Date object dateOut end date
   * @return object with int properties
   * "years", "months", "days", "hours", "minutes" and "seconds"
   *
   * https://github.com/sergiks/calendiff.js
   *
   * @author Sergei Sokolov <hello@sergeisokolov.com>
   */
  function calendiff( dateIn, dateOut) {
      var out = {
          years       : 0
          ,months     : 0
          ,days       : 0
          ,hours      : 0
          ,minutes    : 0
          ,seconds    : 0
      }
          ,sign = 1
          ,diff = 0
          ,proto
          ,monthsShift
          ,prop
      ;

      // check input
      proto = Object.prototype.toString.call(dateIn);
      if( proto !== '[object Date]') {
          dateIn = new Date( dateIn);
          if( isNaN( dateIn.getTime())) throw 'Incorrect "In" date format';
      }

      proto = Object.prototype.toString.call(dateOut);
      if( proto !== '[object Date]') {
          dateOut = new Date( dateOut);
          if( isNaN( dateOut.getTime())) throw 'Incorrect "Out" date format';
      }


      // check numeric difference
      diff = dateOut.getTime() - dateIn.getTime();

      if( diff === 0) {
          return out;
      } else if( diff < 0) {
          sign = -1;
          dateOut = [dateIn, dateIn = dateOut][0]; // swap the dates
      }


      // calculate human-readable difference
      out.seconds += dateOut.getSeconds() - dateIn.getSeconds();
      if( out.seconds < 0) {
          out.seconds += 60;
          out.minutes--;
      }

      out.minutes += dateOut.getMinutes() - dateIn.getMinutes();
      if( out.minutes < 0) {
          out.minutes += 60;
          out.hours--;
      }

      out.hours += dateOut.getHours() - dateIn.getHours();
      if( out.hours < 0) {
          out.hours += 24;
          out.days--;
      }

      // complex part: a month can have various number of days
      // when entering with a negative number of days, up to -31,
      // it might take up to two months shift back
      // should the preceding month only have 28, 29 or 30 days.
      out.days += dateOut.getDate() - dateIn.getDate();
      while( out.days < 0) {
          monthsShift = 0;
          out.days += new Date( dateOut.getFullYear(), dateOut.getMonth() - monthsShift, 0).getDate();
          monthsShift++;
          out.months--;
      }

      out.months += dateOut.getMonth() - dateIn.getMonth();
      if( out.months < 0) {
          out.months += 12;
          out.years--;
      }

      out.years += dateOut.getFullYear() - dateIn.getFullYear();

      // negative difference case
      if( sign < 0)
          for( prop in out)
              if( out[prop]) out[prop] *= -1; // avoid -0 values

      return out;
  }

  /**
   * Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
   * param  iNumber Integer Число на основе которого нужно сформировать окончание
   * param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5),
   *         например ['яблоко', 'яблока', 'яблок']
   * return String
   */
  function getNumEnding(iNumber, aEndings)
  {
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber>=11 && iNumber<=19) {
      sEnding=aEndings[2];
    } else {
      i = iNumber % 10;
      switch (i)
      {
        case (1): sEnding = aEndings[0]; break;
        case (2):
        case (3):
        case (4): sEnding = aEndings[1]; break;
        default: sEnding = aEndings[2];
      }
    }
    return sEnding;
  }

  timer = setInterval(showRemaining, 200);

  $('.slider').removeClass('none');
  $('.multiple-items').removeClass('none');
  $('.slider-nav').removeClass('none');
  $('.partners-slider').removeClass('none');
  $('.gallery').removeClass('none');

  $('.slider').slick({
   lazyLoad: 'ondemand',
   slidesToShow: 1,
   slidesToScroll: 1,
   centerMode: true,
   centerPadding: '80px',
   arrows: false,
   fade: true,
   asNavFor: '.slider-nav'
  });

  $('.slider-nav').slick({
   lazyLoad: 'ondemand',
   slidesToShow: 5,
   slidesToScroll: 5,
   centerMode: true,
   asNavFor: '.slider',
   infinite: true,
   centerPadding: '30px',
   prevArrow:'<button class="PrevArrow"><span></span></button>',
   nextArrow:'<button class="NextArrow"><span></span></button>',
   responsive: [
     {
       breakpoint: 1025,
       settings: {
         slidesToShow: 4,
         slidesToScroll: 4,
         infinite: true,
         centerMode: true
       }
     },
     {
       breakpoint: 769,
       settings: {
         slidesToShow: 3,
         slidesToScroll: 3,
         infinite: true,
         centerMode: true
       }
     }
   ]
  });

  $('.multiple-items').slick({
    centerPadding: '20px',
    variableWidth: true,
    infinite: true,
    centerMode: true,
    lazyLoad: 'progressive',
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow:'<button class="PrevArrow"><span></span></button>',
    nextArrow:'<button class="NextArrow"><span></span></button>',
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          centerMode: true
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          centerMode: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: '40px',
          centerMode: true
        }
      },
      {
        breakpoint: 641,
        settings: {
          autoplay: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: '40px',
          centerMode: true
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $('.partners-slider').slick({
    autoplay: true,
    centerPadding: '20px',
    variableWidth: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow:'<button class="PrevArrow"><span></span></button>',
    nextArrow:'<button class="NextArrow"><span></span></button>',
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          centerPadding: '20px',
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 769,
        settings: {
          centerPadding: '40px',
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          centerPadding: '10px',
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  });

  $('.gallery').slick({
    autoplay: true,
    centerPadding: '20px',
    variableWidth: true,
    infinite: true,
    centerMode: true,
    lazyLoad: 'progressive',
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow:'<button class="PrevArrow"><span></span></button>',
    nextArrow:'<button class="NextArrow"><span></span></button>'
  });

  //select
  $(".custom-select").each(function() {
    var classes = $(this).attr("class"),
        id      = $(this).attr("id"),
        name    = $(this).attr("name");
    var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function() {
          template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
    template += '</div></div>';

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
  });
  $(".custom-select-trigger").on("click", function() {
    $('html').one('click',function() {
      $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function() {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
  });

  $('.partner__check').styler();

  $( '#sortpicture' ).change(function() {
    $(".partner__btn").text("Файл выбран");
  });

  $(".user__link").click(function (event) {
    event.preventDefault();
    $(this).parent().parent().find(".user__img").remove();
    $("[type='file']").val("").trigger("change");
  });

  $(function() {
    $('.user__field input').on('change', function() {
      var input = $(this);
      if (input.val().length) {
        input.addClass('open');
      } else {
        input.removeClass('open');
      }
    });
  });

  (function() {
    var reviewForm = document.querySelector("#revForm");
    reviewForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var data = new FormData(reviewForm);

      request(data, function(response) {
        console.log(response);
      });
    });

    function request(data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open("post", "handler.php?" + (new Date()).getTime());
      xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4) {
          fn(xhr.responseText);
        }
      });
      xhr.send(data);
    }
  })();

  (function() {
    var partnerForm = document.querySelector(".partner__form");
    partnerForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var data = new FormData(partnerForm);

      request(data, function(response) {
        console.log(response);
      });
    });

    function request(data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open("post", "handler.php?" + (new Date()).getTime());
      xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4) {
          fn(xhr.responseText);
        }
      });
      xhr.send(data);
    }
  })();

  //Tap
  (function() {
    var tapItem = document.querySelector(".user__field");
    tapItem.addEventListener("tap", function(event) {
      console.log("Тап по кнопке");
    });
  })();
});

(function() {
  if (!("FormData" in window)) {
    return;
  }

  var pagesWithScript = ["/add_user.html", "/user_profile_1.html"];

  if (pagesWithScript.indexOf(location.pathname) != -1 ) {
    if ("FileReader" in window) {

        var form = document.querySelector("#userForm");
        var areaInner = document.querySelector(".user__upload-list");
        var template = document.querySelector("#image-template").innerHTML;

        var queue = [];

        (function() {
               var form = document.querySelector("#userForm");
               var area1 = document.querySelector(".user__foto--1");

               form.querySelector("#userFoto1").addEventListener("change", function() {
                   var files = this.files;
                   for (var i = 0; i < files.length; i++) {
                       preview(files[i]);
                   }
               });

               function preview(file) {
                   if (file.type.match(/image.*/)) {
                       var reader = new FileReader();
                       reader.addEventListener("load", function(event) {
                           var newImg = document.createElement("img");
                           newImg.src = event.target.result;
                           newImg.alt = file.name;
                           newImg.setAttribute("id", "photo1");
                           newImg.setAttribute("class", "user__img");
                           newImg.setAttribute("width", "125");
                           newImg.setAttribute("height", "140");
                           area1.appendChild(newImg);
                       });
                       reader.readAsDataURL(file);
                   }
               }
        })();

        (function() {
               var form = document.querySelector("#userForm");
               var area2 = document.querySelector(".user__foto--2");

               form.querySelector("#userFoto2").addEventListener("change", function() {
                   var files = this.files;
                   for (var i = 0; i < files.length; i++) {
                       preview(files[i]);
                   }
               });

               function preview(file) {
                   if (file.type.match(/image.*/)) {
                       var reader = new FileReader();
                       reader.addEventListener("load", function(event) {
                           var newImg = document.createElement("img");
                           newImg.src = event.target.result;
                           newImg.alt = file.name;
                           newImg.setAttribute("id", "photo2");
                           newImg.setAttribute("class", "user__img");
                           newImg.setAttribute("width", "125");
                           newImg.setAttribute("height", "140");
                           area2.appendChild(newImg);
                       });
                       reader.readAsDataURL(file);
                   }
               }
        })();

        (function() {
               var form = document.querySelector("#userForm");
               var area3 = document.querySelector(".user__foto--3");

               form.querySelector("#userFoto3").addEventListener("change", function() {
                   var files = this.files;
                   for (var i = 0; i < files.length; i++) {
                       preview(files[i]);
                   }
               });

               function preview(file) {
                   if (file.type.match(/image.*/)) {
                       var reader = new FileReader();
                       reader.addEventListener("load", function(event) {
                           var newImg = document.createElement("img");
                           newImg.src = event.target.result;
                           newImg.alt = file.name;
                           newImg.setAttribute("id", "photo3");
                           newImg.setAttribute("class", "user__img");
                           newImg.setAttribute("width", "125");
                           newImg.setAttribute("height", "140");
                           area3.appendChild(newImg);
                       });
                       reader.readAsDataURL(file);
                   }
               }
        })();

        userForm.addEventListener("submit", function(event) {
          event.preventDefault();
          var data = new FormData(userForm);

          queue.forEach(function(element) {
            data.append("images", element.file);
          });

          request(data, function(response) {
            console.log(response);
          });
        });

        function request(data, fn) {
          var xhr = new XMLHttpRequest();
          xhr.open("post", "handler.php?" + (new Date()).getTime());
          xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState == 4) {
              fn(xhr.responseText);
            }
          });
          xhr.send(data);
        }

        form.querySelector("#uploadFoto").addEventListener("change", function() {
            var files = this.files;
            for (var i = 0; i < files.length; i++) {
                preview(files[i]);
            }

            this.value = "";
         });

        function preview(file) {
            if (file.type.match(/image.*/)) {
                var reader = new FileReader();
                reader.addEventListener("load", function(event) {
                   var html = Mustache.render(template, {
                     "image": event.target.result,
                     "name": file.name
                   });

                   var li = document.createElement("li");
                   li.classList.add("upload-images__item");
                   li.innerHTML = html;

                   areaInner.appendChild(li);

                   li.querySelector(".upload-images__del-link").addEventListener("click", function(event) {
                     event.preventDefault();
                     removePreview(li);
                   });
                   queue.push({
                     "file": file,
                     "li": li
                   });
                });
                reader.readAsDataURL(file);
            }
        }

        function removePreview(li) {
         queue = queue.filter(function(element) {
           return element.li != li;
         });
         li.parentNode.removeChild(li); }
    }
  }
})();
