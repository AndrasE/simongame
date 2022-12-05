//the possibly buttoncolours
var buttonColours = ["red", "blue", "green", "yellow"];

//empty arrays for both cpu and user
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

// user chosen colours
$(".btn").click(function() {
  if (started == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  } else {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); //push in array
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}});
//checking the asnwer notice if in if, thats where you fckd it up..
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("true");
   if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    } , 1500);
  }
  } else {
    $("#level-title").text("You suck!😋 Press A Key or Click to Start");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    startOver();
  }
}

//random chosen colours + animate object + calling the function for sound
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); //push in array
  console.log(gamePattern);

//animation
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
//calling sound funciton
  playSound(randomChosenColour);
}

//animating the chosen button of user by adding + removing classes
function animatePress(clicked) {
$("#"+ clicked).addClass("pressed");
//timout removing class
setTimeout(function () {
  $("#"+ clicked).removeClass("pressed")
}, 80);
}

//sound function using the buttons id`s in filename
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};
