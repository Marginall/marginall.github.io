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

    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
    	var month = Math.floor(t / (1000 * 60 * 60 * 24 * 30));
      return {
        'total': t,
    		'month': month,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
    	var monthSpan = clock.querySelector('.month');
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
        var t = getTimeRemaining(endtime);
        monthSpan.innerHTML = t.month;
        daysSpan.innerHTML = ('0' + t.days).slice(-2);
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date(Date.parse(new Date()) + 5 * 30 * 24 * 60 * 60 * 1000);
    initializeClock('clockdiv', deadline);

    $('.cd-popup-trigger').on('click', function(event){
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
});
