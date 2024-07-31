var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    //console.log(userClickedPattern.length - 1);
    //console.log(userClickedPattern);
});

$("#start-btn").click(function() {
    if (!started) {
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
        console.log("pressed");
    }
});

// Detect when a keyboard key has been pressed, call nextSequence() only once
$(document).keydown(function(event) {
    if (!started) {
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
        console.log("Key pressed: " + event.key); // Log the key pressed
    }
});

// Function to generate the next sequence
function nextSequence() {
   userClickedPattern = []; // Reset the user's clicked pattern for the new sequence
    level++;
    $("#level-title").text("Level " + level);

        var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);

    console.log(gamePattern);
}

// Function to play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    // Remove the class after 100 milliseconds
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    // Check if the user's answer is correct
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // Check if the user has completed the pattern
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); // Move to the next sequence if the pattern is correct
            }, 1000);
        }
        console.log("success");
    } else {
        playWrongSound();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        console.log("wrong");
        // You can add code here to handle a wrong answer, such as restarting the game
    }
}
function playWrongSound() {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
    $("#level-title").text("Press A Key to Start");
}
