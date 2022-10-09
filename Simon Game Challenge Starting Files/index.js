var gamePatterns=[];
var userClickedPattern=[];
var gameColors=["red", "blue", "green", "yellow" ];

var started= false;
var level= 0;

$(document).keydown(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

})

function nextSequence(){
    userClickedPattern=[];
    level= level+1;
    $("#level-title").text("Level " + level);
    var random= Math.floor(Math.random()*4);
    var randomChosenColour= gameColors[random];
    gamePatterns.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound = new Audio('sounds/'+randomChosenColour+'.mp3');
    sound.play();
    
}
$('.btn').click(function handler(){
    var userChosenColour= this.id;
    userClickedPattern.push(userChosenColour);
    sound = new Audio('sounds/'+userChosenColour+'.mp3');
    sound.play();
    function animatePress(currentColor){
        $('#'+currentColor).addClass('pressed');
        const myTimeout = setTimeout(function(){
            $('#'+currentColor).removeClass('pressed');
        }, 100);

    }
    animatePress(userChosenColour);
    checkAnswer(level-1)

})

function checkAnswer(currentLevel) {
    if (userClickedPattern.length === gamePatterns.length){
        for (i=0; i<= currentLevel;i++){
            if (gamePatterns[i] === userClickedPattern[i]){
                console.log("success");
            } else{
                $("#level-title").text("Game over");
                started= false
                var sounds= new Audio('sounds/wrong.mp3')
                $('body').addClass('game-over')
                setTimeout(function(){
                    $('body').removeClass('game-over')
                }, 200)

                setTimeout(startOver,500)
                
            }
        }
        if (gamePatterns[currentLevel] === userClickedPattern[currentLevel] && started == true) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
              
            }


    }
}

function startOver(){
    gamePatterns=[];
    level= 0;
    $('#level-title').text('Press A Key to Start')
}