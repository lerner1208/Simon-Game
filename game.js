
var gameLevel = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];



$(".startBtn").on("click",function(){
    $(".startBtn").animate({opacity:0, },0);
    $(".startBtn").prop("disabled", true);
    nextSequence();
});


function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    var time = 0;
    gameLevel++;
    $("#level-title").text("Level " + gameLevel);
    

    if(gamePattern.length > 0){
        for(i = 0 ; i < gamePattern.length ; i++){
            delay(i);
        }
    }

    function delay(i) {
    setTimeout(function(){
        var prevColor = gamePattern[i];
        $('#' + prevColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(prevColor);
        console.log(gamePattern);
        console.log("prev:" + gamePattern[i]);
    }, i * 400);
    }

    setTimeout(function(){
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}, gamePattern.length * 400);


    gamePattern.push(randomChosenColor);
}

$(".btn").on("click",function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});



function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor){
    var buttonPressed =  $("#" + currentColor);
    buttonPressed.addClass("pressed");
    setTimeout(function(){ buttonPressed.removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel){

        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("success");
            if(gamePattern.length === userClickedPattern.length){
                setTimeout(function () {
                    nextSequence();
                  }, 1000);
            }
        }
        else{
            console.log("Wrong")
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){ $("body").removeClass("game-over"); }, 200);
            $("#level-title").html("Game Over");
            $(".startBtn").text("Restart Game");
            startOver();
        }
}



function startOver(){
    gameLevel = 0;
    gamePattern = [];
    userClickedPattern = [];

    $(".startBtn").animate({opacity:100, },0);
    $(".startBtn").prop("disabled", false);
}
