let gamePattern = []; 
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];
// console.log('gamePattern: '+ gamePattern);
// console.log('userClickedPattern: ' + userClickedPattern);


let level = 0;
let started = false;


$(document).keypress(function () {
    if (!started) {
        $('#level-title').text('level ' + level);
        nextSequence();

        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    console.log('userPattern: ' + userClickedPattern);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#'+randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);

    level++;
    $('#level-title').text('level ' + level);

}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Gameover, Press Any Key to Restart.');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }
}

$('.btn').click(function(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
    $('#'+currentColor).addClass('pressed');

    setTimeout(function (){
        $('#'+currentColor).removeClass('pressed');
    }, 100);
}

function playSound(name) {
    let audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
