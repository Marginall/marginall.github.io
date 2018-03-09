var windowWidth;
var scrollPosition = null;
$(document).ready(function() {
	/* main slider */
	if($('#main_slider')[0]) {
		mainSliderInit();
	}
	//--
	/* scroll to */
	$(".go_down").click(function() {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html,body').animate({
			scrollTop: destination
		}, 1100);
		return false;
	});
	//--
	/* mobile menu */
	$('body:not(".toggle") .menu_toggle').click(function() {
		if(!$('body').hasClass('toggle')) {
			scrollPosition = $(document).scrollTop();
			$('body').toggleClass('toggle');
		}
		else {
			$('body').removeClass('toggle');
			$(document).scrollTop(scrollPosition);
			masonryInit();
		}
	});
	$('.top_menu .sub a').click(function() {
		$(this).parent().toggleClass('sub_toggle');
		return false;
	})
	//--
	/* news columns */
	$('.news_box').waitForImages().done(function() {
		masonryInit();
	});
	//--
	/* team images*/
	$('.team-item-image').each(function() {
		var src = $(this).attr('src');
		$(this).parent('.team-item__image').css('background-image', 'url(' + src + ')');
	});
	/* gallery slider */
	if($('#news_gallery_slider')[0]) {
		$('.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.slider-nav',
			responsive: [{
				breakpoint: 475,
				settings: {
					arrows: true
				}
			}]
		});
		$('.slider-nav').slick({
			slidesToShow: 7,
			slidesToScroll: 1,
			asNavFor: '.slider-for',
			dots: false,
			arrows: true,
			centerMode: false,
			focusOnSelect: true,
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5
				}
			}, {
				breakpoint: 999,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 760,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 580,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 470,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}]
		});
	}
	//--
	/* gallery slider */
	if($('#product_gallery_slider')[0]) {
		$('.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.slider-nav',
			responsive: [{
				breakpoint: 475,
				settings: {
					arrows: true,
					dots: true
				}
			}]
		});
		$('.slider-nav').slick({
			slidesToShow: 7,
			slidesToScroll: 1,
			asNavFor: '.slider-for',
			dots: false,
			arrows: true,
			centerMode: false,
			focusOnSelect: true,
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5
				}
			}, {
				breakpoint: 999,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 760,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 580,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 470,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}]
		});
	}
	//--
	/* ------------------- parallax ------------------ */
	$(window).bind('scroll', function(e) {
		parallaxScroll();
	});

	function parallaxScroll() {
		if($('.service-image-wrap').length) {
			var scrolled = $(window).scrollTop() - $('.service-image-wrap').offset().top + 600;
			var d = parseFloat((0 - (scrolled * .4)));
			var bb = ' center ' + d + 'px';
			$('.service-parallax-wrap').css('background-position', bb);
		}
	}
	/* ------------------- parallax ------------------ */
});
$(window).resize(function() {
	windowWidth = $(window).width();
	if(windowWidth > 1000) {
		$('body').removeClass('toggle');
	}
	else {
		if(!$('body').hasClass('toggle')) {
			scrollPosition = $(document).scrollTop();
		}
		else {
			$(document).scrollTop(scrollPosition);
		}
	}
	if($('#main_slider')[0]) {
		$('.main_slider').slick('unslick');
		mainSliderInit();
	}
	masonryInit();
});
/* fixed header */
$(function() {
	$(window).scroll(function() {
		var h_hght = 400;
		var top = $(this).scrollTop() + 70;
		if(top < h_hght) {
			if(!$('body').hasClass('toggle')) {
				$('header.fixed').fadeOut();
			}
		}
		else {
			$('header.fixed').slideDown();
		};
		var h_hght2 = 158;
		var top2 = $(this).scrollTop() + 70;
		if(top2 < h_hght2) {
			if(!$('body').hasClass('toggle')) {
				$('header.default').fadeIn();
			}
		}
		else {
			$('header.default').fadeOut();
		};
	});
});
//--
function masonryInit() {
	$('.news_box').masonry({
		itemSelector: '.news',
		layoutPriorities: {
			upperPosition: 0,
			shelfOrder: 1
		}
	});
}

function mainSliderInit() {
	$('.main_slider').slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		appendArrows: '.slider_nav',
		fade: true
	});
}
