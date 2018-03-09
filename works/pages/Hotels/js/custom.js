$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded');
});

/* viewport width */
function viewport(){
	var e = window,
		a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
};
/* viewport width */

$(function(){
	/* placeholder*/
	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){
 			$(this).attr('placeholder', placeholder);
 		});
 	});
	/* placeholder*/

	$('.button-nav').click(function(){
		$(this).toggleClass('active'),
		$('.main-nav-list').slideToggle();
		return false;
	});

	/* components */

	if($('.styled').length) {
		$('.styled').styler();
	};

	if($('.fancybox').length) {
		$('.fancybox').fancybox({
			margin  : 10,
			padding  : 10
		});
	};

	if($('.slick-slider').length) {
		$('.slick-slider').slick({
			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				  }
				},
				{
				  breakpoint: 600,
				  settings: "unslick"
				}
			]
		});
	};

	if($('.scroll').length) {
		$(".scroll").mCustomScrollbar({
			axis:"x",
			theme:"dark-3",
			autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true}
		});
	};

	/* components */



});

var handler = function(){

	var height_footer = $('footer').height();
	var height_header = $('header').height();
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});


	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;

	if (viewport_wid <= 991) {

	}

}
$(window).bind('load', handler);
$(window).bind('resize', handler);

	/* Tabs */

$('.tabs li a').click(function(){
    	$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
    	$(this).parent().siblings().removeClass('active');
    	var id = $(this).attr('href');
    	$(id).removeClass('hide');
    	$(this).parent().addClass('active');
   return false;
  });

$(document).ready(function() {
	$("#datepicker").datepicker({
		 buttonImage:'false'
	});

   $("#datepicker1").datepicker({
      buttonImage:'false'
   });
});

$(document).ready(function(){
  $('.slider').slick({
		autoplay: true,
		fade: true,
		arrows: false
  });
});

/* Fixed block */

if($('.fixed-block').length){
   	var offset_this = $('.fixed-block').offset();
   	var scr_top = $(window).scrollTop();
   	$(window).scroll(function() {
     	if (offset_this.top <= scr_top) {
        $('.fixed-block').addClass("fixed");
     	} else{
        $('.fixed-block').removeClass("fixed")
     	}
   	});
 	 $(window).load(function() {
   	if (offset_this.top <= scr_top) {
      $('.fixed-block').addClass("fixed");
   	} else{
      $('.fixed-block').removeClass("fixed")
   	}
 	});
};

/* TAP */
(function() {
  var button = document.querySelector(".btn");
  button.addEventListener("tap", function(event) {
		console.log("Тап по кнопке");
	});
})();
