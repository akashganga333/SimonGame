var ButtonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var lvl=0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+lvl);
        nextSequence();
        started=true;
    }
});

function nextSequence(){
    userClickedPattern=[];
    lvl++;
    $("#level-title").text("Level " + lvl);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=ButtonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("gameover");
        $("#level-title").text("Game Over!!! Enter Any key to Restart.")
        setTimeout(function(){
            $("body").removeClass("gameover");
        },200);

        startOver();
    }
    
}

function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
   
   setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
   },100);
}

function startOver(){
    lvl=0;
    gamePattern=[];
    started=false;
}

