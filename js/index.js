$('.front>button').click(function(){
    $('.cover').removeClass('active');
});







var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '480',
        width: '853',
        videoId: '9bYyTZLe5Ro',
        autoplay: 1,
        events: {
            'onReady': playVideo,
            'onStateChange': onPlayStateChange
        }
    });
}

function playVideo(event) {
    event.target.seekTo(0).playVideo();
}

var drag1 = '.drag1';
var drag2 = '.drag2';
function displayQuiz1(){
    pauseVideo()
    $('.front').removeClass('active')
    $('.cover').addClass('active')
    $('.drag1').addClass('active')
}

function displayQuiz2(){
    pauseVideo()
    $('.drag1').removeClass('active')
    $('.front').removeClass('active')
    $('.cover').addClass('active')
    $('.drag2').addClass('active')
}

let done = false
let interval = setInterval(function(){
    console.log(getTime())
}, 700)

// Modified from http://jsfiddle.net/thirdender/hnkK7/737/


let stopPlayAt1 = 10, stopPlayAt2 = 70, stopPlayTimer;


function onPlayStateChange(event){
    var time, rate, remainingTime;
    clearTimeout(stopPlayTimer);
    if (event.data == YT.PlayerState.PLAYING) {
        time = player.getCurrentTime();
        if (time + .1 < stopPlayAt1) {
            rate = player.getPlaybackRate();
            remainingTime = (stopPlayAt1 - time) / rate;
            stopPlayTimer = setTimeout(displayQuiz1, remainingTime * 1000);

        }else if(time + .1 >=stopPlayAt1 && time + .1 < stopPlayAt2 - .1){
            rate = player.getPlaybackRate();
            remainingTime = (stopPlayAt2 - time) / rate;
            stopPlayTimer = setTimeout(displayQuiz2, remainingTime * 1000);
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




//drag and drop
//code modified from https://gist.github.com/catc/a7588f6bae341bbc7c2dbc941e744f18

const displace = window.displacejs;
var finished1 = 0;

function sorting1(){

    let displaceInstances;

    try{
        displaceInstances.forEach(d=>d.destroy())
    }catch(e){}

    const blockWidth = 104;
    const blockHeight = 41;

    const targetWidth = $('#t1a').width();
    const targetHeight = $('#t1a').height();

    const dict={
        '#b1a': '#t1b',
        '#b1b': '#t1a',
        '#b1c': '#t1c',
        '#b1d': '#t1d',
    };

    displaceInstances = ['#b1a', '#b1b', '#b1c', '#b1d'].map(block => {
        const bel = document.querySelector(block);
        return displace(bel, {
            onMouseDown: function(bel){
                bel.className += ' active';
            },
            onMouseUp: function(bel){
                bel.className = bel.className.replace('active', '');
                checkPosition(bel);
            },
        });
    });

    //check moved position
    function checkPosition(el){
        let id = '#' + el.id;
        if($(id).offset().top + 15 >= $(dict[id]).offset().top
            && $(id).offset().top + blockHeight <= $(dict[id]).offset().top + targetHeight +15
            && $(id).offset().left +15 >= $(dict[id]).offset().left){
                finished1 += 1;
                $(id).css({
                    'position': 'relative',
                    'top': 0,
                    'left': 0,
                    'right': 0,
                    'opacity': 0.5
                });
                $(dict[id]).children('span').append(el);
                if(finished1 === 4){
                    $('.drag1_button').addClass('active')
            }
        }
    }

}

sorting1();

$('.drag1_button').click(function(){
    $('.cover').removeClass('active');
    $('.drag1').removeClass('active')
});



var finished2 = 0;

function sorting2(){

    let displaceInstances;

    try{
        displaceInstances.forEach(d=>d.destroy())
    }catch(e){}

    const blockWidth = 104;
    const blockHeight = 41;

    const targetWidth = $('#t2a').width();
    const targetHeight = $('#t2a').height();

    const dict={
        '#b2a': '#t2b',
        '#b2b': '#t2a',
        '#b2c': '#t2c'
    };

    displaceInstances = ['#b2b', '#b2c', '#b2a'].map(block => {
        const bel = document.querySelector(block);
        return displace(bel, {
            onMouseDown: function(bel){
                bel.className += ' active';
            },
            onMouseUp: function(bel){
                bel.className = bel.className.replace('active', '');
                checkPosition(bel);
            },
        });
    });

    //check moved position
    function checkPosition(el){
        let id = '#' + el.id;
        if($(id).offset().top + 15 >= $(dict[id]).offset().top
            && $(id).offset().top + blockHeight <= $(dict[id]).offset().top + targetHeight +15
            && $(id).offset().left +15 >= $(dict[id]).offset().left){
            finished2 += 1;
            console.log(finished1);
            $(id).css({
                'position': 'relative',
                'top': 0,
                'left': 0,
                'right': 0,
                'opacity': 0.5
            });
            $(dict[id]).children('span').append(el);
            if(finished2 === 3){
                $('.drag2_button').addClass('active')
            }
        }
    }

}

sorting2();

$('.drag2_button').click(function(){
    $('.drag2').removeClass('active')
    $('.cover').removeClass('active')
});



