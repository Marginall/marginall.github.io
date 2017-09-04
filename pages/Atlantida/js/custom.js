if (!("ontouchstart" in  window)) {
	document.documentElement.className += " no-touch";
}else{
	document.documentElement.className += " touch";
}

$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded');
});

$(function(){
	var lastScrollTop = 0;
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		if(st==0){
			$('#header').addClass("active");
			$('#header').removeClass("fixed");
		}else{
			$('#header').removeClass("active");
			$('#header').addClass("fixed");
		}
		lastScrollTop = st;
    });

		/*Header scroll*/

		/* placeholder*/
	$('input, textarea').each(function(){
		var placeholder = $(this).attr('placeholder');
		$(this).focus(function(){ $(this).attr('placeholder', '');});
		$(this).focusout(function(){
			$(this).attr('placeholder', placeholder);
		});
	});
	/* placeholder*/

	$('.single-item').slick({
		centerMode: true,
		autoplay: true,
	  slidesToShow: 1,
		prevArrow: '<button class="slider__prev" type="button"><span><span></span></span></button>',
		nextArrow: '<button class="slider__next" type="button"><span><span></span></span></button>'
	});


	$('.review__slider').slick({
	  slidesToShow: 1,
		adaptiveHeight: true,
		arrows: false,
		dots: true,
		autoplay: true
	});

	$("#container").mixItUp({
		selectors: {
				target:'.mix',
				filter:'.filter',
			},
			animation: {
				enable:true,
				duration:700
    }
	});

	$('.portofolio__btn--all').click(function(){
		$('#container').addClass('active-list').removeClass('active-item');
	});

	$('.portofolio__btn--active').click(function(){
		$('#container').addClass('active-item');
	});

	$("#formMain").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
		});
		return false;
	});
});

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

google.maps.event.addDomListener(window, 'load', initialize);
