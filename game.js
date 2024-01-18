//Based on the game: https://londonappbrewery.github.io/Simon-Game/
//From the Udemy Course: The Complete 2024 Web Development Bootcamp, Created By Dr. Angela Yu
//https://www.udemy.com/course/the-complete-web-development-bootcamp/

$(document).ready(function () {
  let gamePattern = [];
  let userClickedPattern = [];
  let started = false;
  let level = 0;
  const buttonColors = ["red", "blue", "green", "yellow"];

  $(".btn").on("click", function () {
    let userChosenColor = $(this).attr("id");
    $("#" + userChosenColor)
      .fadeOut("fast")
      .fadeIn("fast");
    userClickedPattern.push(userChosenColor);
    playAudio(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });

  function nextSequence() {
    userClickedPattern = []; //reset UCP each level
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor)
      .fadeOut("fast")
      .fadeIn("fast");

    playAudio(randomChosenColor);

    level++;

    $("h1").text("Level " + level);
    console.log("gamePattern: " + gamePattern);
    console.log("userClickedPattern: " + userClickedPattern);
  }

  function playAudio(color) {
    switch (color) {
      case "red":
        let red = new Audio("sounds/red.mp3");
        red.play();
        break;
      case "yellow":
        let yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
        break;
      case "green":
        let green = new Audio("sounds/green.mp3");
        green.play();
        break;
      case "blue":
        let blue = new Audio("sounds/blue.mp3");
        blue.play();
        break;
      default:
        console.log("no sound matched");
    }
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel) {
    console.log("GP: " + gamePattern[currentLevel]);
    console.log("UCP: " + userClickedPattern[currentLevel]);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      endGame();
    }
  }

  function endGame() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    //reset vars
    level = 0;
    gamePattern = [];
    started = false;
  }

  $(document).keydown(function () {
    if (!started) {
      nextSequence();
      started = true;
    }
  });
});
