if (!("ontouchstart" in  window)) {
	document.documentElement.className += " no-touch";
}else{
	document.documentElement.className += " touch";	
}



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
    
    
    $('.nav__link').click(function(e) {
        var t=$(this).attr('data-name');
        var l=$(this).parent('.nav__item');
        
        
        if($('.menu-'+t).hasClass('open')){
            $('.sub-nav-item').removeClass('open');
            $('.nav__item').removeClass('active'); 
        }else{
            $('.sub-nav-item').removeClass('open');
            $('.menu-'+t).addClass('open');
            $('.nav__item').removeClass('active'); 
            l.addClass('active'); 
        }
        
		return false;		
	});
    

	/*
	if(window.innerWidth<961){
		$('#header').addClass('header-mobile');
	}	
	
	var lastScrollTop = 0;
	$(window).scroll(function(event){
		
		
		var offset=$('#header .wrapper').height()-10;
		
		var st = $(this).scrollTop();
		
		if(st==0){
			$('#header').removeClass("active");
			$('#header').css('z-index', '9999');
			$('#header').removeClass("hidden");
		}else{
		
			if (st > lastScrollTop){	
					
				if ($(window).scrollTop() > offset) {
					
					if($('#header').hasClass("active")){
					
						$('#header').addClass("active");
						$('#header').css('z-index', '9999');
						//$('#header').removeClass("hidden");	
						$('#header').addClass("hidden");	
					}else{
						$('#header').addClass("hidden");	
					}
				}
				else {
					$('#header').removeClass("active");
					$('#header').css('z-index', '9999');
					$('#header').removeClass("hidden");
				}
			} else {     
			
				$('#header').addClass("active");
				$('#header').css('z-index', '9999');
				$('#header').removeClass("hidden");	
			
			
						
				
			}
		}
		lastScrollTop = st;
		
		
    });*/
	/*Header scroll*/
	
});
/* tabs*/
$(function () {
    var tabContainers = $('.tabs > .tab-content');
    tabContainers.hide().filter(':first').show();
    
    $('.tabs .tabNavigation a').click(function () {
        tabContainers.hide();
        tabContainers.filter(this.hash).fadeIn();
        $('.tabs .tabNavigation a').removeClass('selected');
        $(this).addClass('selected');
        if($('.map').length){
          initMap();  
        }
        
        
        
        return false;
    }).filter(':first').click();
});
/* tabs*/


$(document).ready( function() {
	
	
		
	
		
	//
	//$('input, textarea').placeholder({});
    
    $('.image-to-bg').each(function(){          
        var im=$(this).attr('src');
        $(this).parent().css('background-image', 'url('+im+')');
        $(this).css('opacity', 0);
     });
    
    
    // slider menu .sub-nav-styles-slider
      if($('.sub-nav-styles-slider').length){
        $('.sub-nav-styles-slider').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
			arrows:false,
            responsive: [
               {
                    breakpoint: 990,
                    settings: {
                        slidesToShow: 4,
                    }
                },{
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                    }
                },{
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                    }
                },{
                    breakpoint: 425,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                
            ]
        });
    };
    
    
    // search 
    $('.search').click(function(){      
       
        if ($(event.target).closest(".search__button").length){
           if($('.header-bottom').hasClass('active-search')){
               $('.header-bottom').removeClass('active-search');
             
           }else{
              
               $('.header-bottom').addClass('active-search');
                $('.sub-nav-item').removeClass('open');
                $('.nav__item').removeClass('active');
           }
           return false; 
        }else{
           if(!$('.header-bottom').hasClass('active-search')){
               $('.header-bottom').addClass('active-search');
                $('.sub-nav-item').removeClass('open');
                $('.nav__item').removeClass('active');
           }
         return false;
        }
     });
    
    
    //sidebar menu -  toggle items
    $('.sidebar-nav .has-parent i').click(function(){
        $(this).parent('.has-parent').next('ul').slideToggle();
    });
    
    //sidebar menu
    var slideout = new Slideout({
        'panel': document.getElementById('sb-site'),
        'menu': document.getElementById('sb-sidebar'),
        'padding': 256,
        'tolerance': 70,
        'touch':false
      });

      // Toggle button
      document.querySelector('.open-sidebar').addEventListener('click', function() {
        slideout.toggle();
      });
    
    
    $(".open-sidebar").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            slideout.close();
            $(this).find('.hamburger').removeClass('is-active');
        }else{
            $(this).addClass('active');
            slideout.open();
            $(this).find('.hamburger').addClass('is-active');

        }
    });
    
    
    function close(eve) {
      eve.preventDefault();
      slideout.close();
        $(this).find('.hamburger').removeClass('is-active');
        $(".open-sidebar").removeClass('active');
    }

    slideout
      .on('beforeopen', function() {
        this.panel.classList.add('panel-open');
      })
      .on('open', function() {
        this.panel.addEventListener('click', close);
      })
      .on('beforeclose', function() {
        this.panel.classList.remove('panel-open');
        this.panel.removeEventListener('click', close);
      });
    
    $(window).resize(function(event) {
        if(window.innerWidth>880){
            slideout.close();
        }
      });
    
    
    //delivery popup
    $(".delivery-region").colorbox({inline:true, width:"100%", maxWidth:"550px",
                                   onOpen: function(){
                                    $("#cboxOverlay").removeClass("colorbox-c");
                                   $("#cboxOverlay").addClass("colorbox-d");
                               }});		
    $(".add-to-cart").colorbox({inline:true, width:"100%", maxWidth:"750px",
                                   onOpen: function(){
                                        $("#cboxOverlay").removeClass("colorbox-d");
                                   $("#cboxOverlay").addClass("colorbox-c");
                               }});
    
    
	var resizeTimer;
	function resizeColorBox()
	{
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			if (jQuery('#cboxOverlay').is(':visible')) {					
				if(jQuery('#cboxOverlay').hasClass("colorbox-d")){
					var max_w='550px';	
				}
				else var max_w='750px';
				jQuery.colorbox.resize({ width: window.innerWidth > parseInt(max_w) ? max_w : '100%'}); 
			}
		}, 100)
	}	
	jQuery(window).resize(resizeColorBox);
	window.addEventListener("orientationchange", resizeColorBox, false);

    //custom checkbox, radio
    $('.custom-input').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
    });
    //custom checkbox color
    $('.color-check').iCheck({
         checkboxClass: 'icheckbox_color',
        inheritClass: true,
    });
    
    //filters
    $('.filter-select__title').click(function(){
        
        if($(this).parent('.filter-select').hasClass('active')){
            $('.filter-select').removeClass('active');
            $('.filter-select__items').slideUp(); 
            
        }else{
            $('.filter-select').removeClass('active');
            $('.filter-select__items').slideUp(); 
            $(this).parent('.filter-select').addClass('active');
            $(this).next('.filter-select__items').slideDown();
            
        }
        
       
    });
    
    
    //match height
    $('.product-item__name').matchHeight();
    $('.payment-item__info').matchHeight();
    
    
    
    //filters mobile
    $('.show-filters').click(function(){        
        $('.catalog-filters').toggleClass('filter-hide');
        return false; 
    });
    
   
	//sortong mobile
    $('.catalog-sort__title').click(function(){
        if(window.innerWidth<640){
            $('.catalog-sort-list').toggleClass('catalog-sort-list-hide');               
        }       
        return false; 
    });
    
    
    //collection-slider
    if($('.collection-slider').length){
    	$('.collection-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
			dots:false,			
            responsive: [
               {
                    breakpoint: 880,
                    settings: {
                       slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }, {
                    breakpoint: 639,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
    	});
    }; 
    
    /*product quantity*/
	$('.qty-plus').click(function(e) {
		var inp= $(this).parent('div').find('input');
        inp.val(parseInt(inp.val())+1);
		return false;
    });
	$('.qty-minus').click(function(e) {
		var inp= $(this).parent('div').find('input');	
		val=parseInt(inp.val())-1;	
		if(val<2){ val=1;}
        inp.val(val);
		return false;
    });
	/* product quantity*/
    
    /* custom-select */
    $('select').selectric({disableOnMobile: false, nativeOnMobile: false});
    
    /* payment method radio*/
    
    $('.payment-item').click(function(e) {
        $('.payment-item').removeClass('payment-check');
        $(this).addClass('payment-check');
		return false;
    });
    
    $( "#datepicker" ).datepicker($.extend({}, $.datepicker.regional['ru'], {
        minDate: 0
        
    })).datepicker("setDate", "0");
    
    $('.product-description-more').click(function(e) {
        $(this).prev('.product-description').addClass('product-description_open');
        $(this).hide();
		return false;
    });
    
    $('.product-thumbs__item a').click(function(e) {
        var im=$(this).attr('href');
        $('#product-image').attr('src', im);
        $('.product-thumbs__item').removeClass('active');
        $(this).parent().addClass('active');
        
		return false;
    });
    
    //related-slider
    if($('.related-slider').length){
    	$('.related-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            appendArrows:$('.related-slider-buttons') ,
			dots:false,			
            responsive: [
               {
                    breakpoint: 880,
                    settings: {
                       slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }, {
                    breakpoint: 639,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
    	});
    }; 
    
    
    
	
	
	});



$(document).bind("click touchstart",function(event) {
    if ($(event.target).closest(".sub-nav, .nav__link").length) return;
	   $('.sub-nav-item').removeClass('open');
        $('.nav__item').removeClass('active'); 
    
    if ($(event.target).closest(".search").length) return;
        $('.header-bottom').removeClass('active-search');
    
	 event.stopPropagation();
  });



function initMap() {
      if($('#map-1').length){
       
        map = new google.maps.Map(document.getElementById('map-1'), {
          zoom: 11,
          center: {lat: 55.811717, lng: 37.5175063},
            scrollwheel: false
        });
        marker = new google.maps.Marker({
          position: {lat: 55.811717, lng: 37.5175063},
          map: map,
             icon: 'img/map-marker.png'
        });
        google.maps.event.trigger(map, "resize");  
      }
    if($('#map-2').length){
     map2 = new google.maps.Map(document.getElementById('map-2'), {
          zoom: 11,
          center: {lat: 55.811717, lng: 37.5175063},
            scrollwheel: false
        });
       marker2 = new google.maps.Marker({
          position: {lat: 55.811717, lng: 37.5175063},
          map: map2,
             icon: 'img/map-marker.png'
        });
         google.maps.event.trigger(map2, "resize");  
    }
    if($('#map-3').length){ 
    map3 = new google.maps.Map(document.getElementById('map-3'), {
          zoom: 11,
          center: {lat: 55.811717, lng: 37.5175063},
            scrollwheel: false
        });
      marker3 = new google.maps.Marker({
          position: {lat: 55.811717, lng: 37.5175063},
          map: map3,
             icon: 'img/map-marker.png'
        });
         google.maps.event.trigger(map3, "resize");  
    }
     if($('#map-4').length){
    
    map4 = new google.maps.Map(document.getElementById('map-4'), {
          zoom: 11,
          center: {lat: 55.811717, lng: 37.5175063},
            scrollwheel: false
        });
      marker4 = new google.maps.Marker({
          position: {lat: 55.811717, lng: 37.5175063},
          map: map4,
             icon: 'img/map-marker.png'
        });
          google.maps.event.trigger(map4, "resize");  
     }
     if($('#map-5').length){
    map5 = new google.maps.Map(document.getElementById('map-5'), {
          zoom: 11,
          center: {lat: 55.811717, lng: 37.5175063},
            scrollwheel: false
        });
     marker5 = new google.maps.Marker({
          position: {lat: 55.811717, lng: 37.5175063},
          map: map5,
             icon: 'img/map-marker.png'
        });
          google.maps.event.trigger(map5, "resize");  
     }
     if($('#map-6').length){

     map6 = new google.maps.Map(document.getElementById('map-6'), {
          zoom: 11,
          center: {lat: 55.811717, lng: 37.5175063},
            scrollwheel: false
        });
       marker6 = new google.maps.Marker({
          position: {lat: 55.811717, lng: 37.5175063},
          map: map6,
             icon: 'img/map-marker.png'
        });
          google.maps.event.trigger(map6, "resize");  
     }

    if($('#map-7').length){

     map7 = new google.maps.Map(document.getElementById('map-7'), {
          zoom: 11,
          center: {lat: 55.811717, lng: 37.5175063},
          scrollwheel: false
        });
        
    bounds  = new google.maps.LatLngBounds();    
        
       marker7 = new google.maps.Marker({
          position: {lat: 55.811717, lng: 37.5175063},
          map: map7,
             icon: 'img/map-marker.png',
           title:"Адрес 1"
        });
        loc = new google.maps.LatLng(marker7.position.lat(), marker7.position.lng());
        bounds.extend(loc);
        
       marker71 = new google.maps.Marker({
          position: {lat: 55.740853, lng: 37.6619363},
          map: map7,
             icon: 'img/map-marker.png',
           title:"Адрес 2"
        });
        loc = new google.maps.LatLng(marker71.position.lat(), marker71.position.lng());
        bounds.extend(loc); 
        map7.fitBounds(bounds);       //auto-zoom
        map7.panToBounds(bounds);    //auto-center
         google.maps.event.trigger(map7, "resize");  
     }
    
    
    if($('#map-8').length){

         map8 = new google.maps.Map(document.getElementById('map-8'), {
              zoom: 11,
              center: {lat: 55.811717, lng: 37.5175063},
              scrollwheel: false
            });

        bounds  = new google.maps.LatLngBounds();    

           marker8 = new google.maps.Marker({
              position: {lat: 55.811717, lng: 37.5175063},
              map: map8,
                 icon: 'img/map-marker.png',
               title:"Адрес 1"
            });
            loc = new google.maps.LatLng(marker8.position.lat(), marker8.position.lng());
            bounds.extend(loc);

           marker81 = new google.maps.Marker({
              position: {lat: 55.740853, lng: 37.6619363},
              map: map8,
                 icon: 'img/map-marker.png',
               title:"Адрес 2"
            });
            loc = new google.maps.LatLng(marker81.position.lat(), marker81.position.lng());
            bounds.extend(loc); 
            map8.fitBounds(bounds);       //auto-zoom
            map8.panToBounds(bounds);    //auto-center
             google.maps.event.trigger(map8, "resize");  
     }
    
    if($('#map-9').length){

         map9 = new google.maps.Map(document.getElementById('map-9'), {
              zoom: 11,
              center: {lat: 55.811717, lng: 37.5175063},
              scrollwheel: false
            });

        bounds  = new google.maps.LatLngBounds();    

           marker9 = new google.maps.Marker({
              position: {lat: 55.811717, lng: 37.5175063},
              map: map9,
                 icon: 'img/map-marker.png',
               title:"Адрес 1"
            });
            loc = new google.maps.LatLng(marker9.position.lat(), marker9.position.lng());
            bounds.extend(loc);

           marker91 = new google.maps.Marker({
              position: {lat: 55.740853, lng: 37.6619363},
              map: map9,
                 icon: 'img/map-marker.png',
               title:"Адрес 2"
            });
            loc = new google.maps.LatLng(marker91.position.lat(), marker91.position.lng());
            bounds.extend(loc); 
            map9.fitBounds(bounds);       //auto-zoom
            map9.panToBounds(bounds);    //auto-center
             google.maps.event.trigger(map9, "resize");  
     }
       
    
}
