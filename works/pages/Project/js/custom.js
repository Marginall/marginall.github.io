
/* mobile search */

$('.link_search').click(function(){
  $('.fixed__search').toggleClass('js-fixed__search_show')
});

$('.fixed .top-menu__item a').click(function(){
  $('.fixed .top-menu__wrapper').toggleClass('js-fixed__search_show')
});
