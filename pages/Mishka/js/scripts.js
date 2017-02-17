var navMain = document.querySelector(".main-header__nav");
var navBtn = document.querySelector(".main-header__btn");

navMain.classList.remove("main-header__nav--no-js");

navBtn.addEventListener("click", function() {
    if (navMain.classList.contains("main-header__nav--closed")) {
      navMain.classList.remove("main-header__nav--closed");
      navMain.classList.add("main-header__nav--show");
    } else {
      navMain.classList.add("main-header__nav--closed");
      navMain.classList.remove("main-header__nav--show");
    }
});

//Инициализация плеера
function onYouTubeIframeAPIReady() {
	  player = new YT.Player('player', {
		height: 'auto',
		playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0, 'rel': 0},
		width: 'auto',
		videoId: '0rq42Xe9Mv4',
		events: {
		  'onReady': onPlayerReady
		}
  });
}

// Обработчик готовность
function onPlayerReady(event) {
	var player = event.target;
	iframe = document.getElementById('player');
	setupListener();
	updateTimerDisplay();
	updateProgressBar();

	time_update_interval = setInterval(function () {
		updateTimerDisplay();
		updateProgressBar();
	}, 1000);
}
/*Слушать события*/
function setupListener (){
	document.getElementById('full').addEventListener('click', playFullscreen);
}
/*Включение фуллскрина*/
function playFullscreen (){
	player.playVideo();//won't work on mobile

	  var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
	  if (requestFullScreen) {
		requestFullScreen.bind(iframe)();
	  }
}

/*Громкость*/
function editVolume () {
	if (player.getVolume() == 0) {
		player.setVolume('100');
	} else {
		player.setVolume('0');
	}
}

/*Качество*/
function editQuality () {
	player.setPlaybackQuality('medium');
	document.getElementById('quality').innerHTML = '480';
}

// Обновляем время на панельке - счетчик
function updateTimerDisplay(){
	document.getElementById('time').innerHTML = formatTime(player.getCurrentTime());
}
/*Формат времени*/
function formatTime(time){
	time = Math.round(time);
	var minutes = Math.floor(time / 60),
	seconds = time - minutes * 60;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	return minutes + ":" + seconds;
}

// Обновляем прогресс
function updateProgressBar(){

	var line_width = jQuery('#line').width();
	var persent = (player.getCurrentTime() / player.getDuration());
	jQuery('.viewed').css('width', persent * line_width);
	per = persent * 100;
	jQuery('#fader').css('left', per+'%');
}

/*Линия прогресса*/
function progress (event) {

	var line_width = jQuery('#line').width();
	// положение элемента
	var pos = jQuery('#line').offset();
	var elem_left = pos.left;
	// положение курсора внутри элемента
	var Xinner = event.pageX - elem_left;
	var newTime = player.getDuration() * (Xinner / line_width);
	// Skip video to new time.
	player.seekTo(newTime);
}
