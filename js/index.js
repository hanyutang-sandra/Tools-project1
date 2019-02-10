var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': playVideo,
            'onStateChange': onPlayStateChange
        }
    });

    quizSub();
}


function playVideo(event) {
    event.target.seekTo(0).playVideo();
}

function displayQuiz(){
    pauseVideo()
    $('.quiz').addClass('active')
}

let done = false
let interval = setInterval(function(){
    console.log(getTime())
}, 700)

// Modified from http://jsfiddle.net/thirdender/hnkK7/737/

let stopPlayAt = 10, stopPlayTimer;

function onPlayStateChange(event){
    var time, rate, remainingTime;
    clearTimeout(stopPlayTimer);
    if (event.data == YT.PlayerState.PLAYING) {
        time = player.getCurrentTime();
        if (time + .4 < stopPlayAt) {
            rate = player.getPlaybackRate();
            remainingTime = (stopPlayAt - time) / rate;
            stopPlayTimer = setTimeout(displayQuiz, remainingTime * 1000);

        }
    }
}

function getTime(){
    return Math.round(player.getCurrentTime());
}

function stopVideo() {
    player.stopVideo();
}


function pauseVideo() {
    player.pauseVideo();
}

function quizSub(){
    $('.submitbtn').click(function(){
        $('.quiz').removeClass('active');
        player.playVideo()
    })
}


