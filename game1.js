var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = -1;


//Start the game with a key pressed (Only once)
$(document).one("keydown", function() {
  $("h1").html("Level " + level);
  nextSequence();
});


//Funcion next Sequence
function nextSequence() {

userClickedPattern = [];
  level++;
  $("h1").html("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

//Funcion click boton
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);


  //Llamar a las siguientes funciones cada vez que se hace click en un boton
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)


});


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {

    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currenLevel) {

  if (gamePattern[currenLevel] === userClickedPattern[currenLevel]) {

    console.log("correct");

  if (gamePattern.length === userClickedPattern.length) {

    setTimeout( function () {nextSequence();}, 1000);
  }
  }

  else {console.log("Wrong");

playSound("wrong");

$("body").addClass("game-over");

setTimeout(function(){
  $("body").removeClass("game-over");
}, 200);

$("h1").html("Game Over AHOOOOIL!, Press Any Key to Restart");

startOver();
}
}


function startOver() {

gamePattern = [];
userClickedPattern = [];
level = -1;

$(document).one("keydown", function() {
  $("h1").html("Level " + level);
  nextSequence();
});
}




// Si apreto tecla parte con un color y se guarda en game Pattern
// Si apreto la que salio se guarda en user clicked pattern pero apenas la apreto aparece otra del game pattern por lo que no me deja
// copiar el game pattern
//gamePattern: green, blue, red, yellow, red
//userClickedPattern: green, green, blue, green, blue, red, green, blue, red, yellow, green, blue, red, yellow, red
