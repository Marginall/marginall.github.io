$(document).ready(function() {

  $(function(){
    $('.slider').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: false,
     fade: true,
     asNavFor: '.slider-prev'
    });
    $('.slider-prev').slick({
     slidesToShow: 3,
     slidesToScroll: 1,
     asNavFor: '.slider',
     dots: false,
     centerMode: true,
     focusOnSelect: true
    });

    $('.one-time').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });
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

  $(function(){
    $("#Container").mixItUp({
      selectors: {
              target:'.mix',
              filter:'.filter',
              sort:'.sort'
          }
    });
  });

  $("a[href*='#']").mPageScroll2id();
});
