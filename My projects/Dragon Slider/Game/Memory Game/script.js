var colors = ["red", "blue", "green", "yellow"];

var gameSeq = [];
var mySeq = [];

var isStarted = false;
var level = 0;


// start game on keypress
document.addEventListener("keydown", function() {
    if(!isStarted) {
        startTheGame();
    }
});

// also start on click for mobile
document.querySelector("#level-title").addEventListener("click", function() {
    if(!isStarted) {
        startTheGame();
    }
});


function startTheGame() {
    document.querySelector("#level-title").innerText = "Level " + level;
    nextLevel();
    isStarted = true;
}

// handle clicks
var allButtons = document.querySelectorAll(".btn");

for(var i=0; i<allButtons.length; i++) {
    allButtons[i].addEventListener("click", function() {
        if(!isStarted) return; // ignore if game hasnt started

        var btnColor = this.id;
        mySeq.push(btnColor);
        
        flashButton(btnColor);

        checkResult(mySeq.length - 1);
    });
}


function checkResult(currIndex) {
    // check if correct
    if(gameSeq[currIndex] === mySeq[currIndex]) {
        
        // check if sequence is done
        if(mySeq.length === gameSeq.length) {
            
            // wait a bit before next
            setTimeout(function() {
                nextLevel();
            }, 1000);
        }

    } else {
        // game over styling
        document.body.classList.add("game-over");
        
        document.querySelector("#level-title").innerText = "Game Over, Press Any Key to Restart";

        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 200);

        resetGame();
    }
}

function nextLevel() {
    // reset player sequence for new level
    mySeq = [];
    level++;
    
    document.querySelector("#level-title").innerText = "Level " + level;

    var rand = Math.floor(Math.random() * 4);
    var randomColor = colors[rand];
    
    gameSeq.push(randomColor);

    // flash the new color after slight delay
    setTimeout(() => {
        flashButton(randomColor);
    }, 500);
}

function flashButton(color) {
    var btn = document.querySelector("#" + color);
    
    btn.classList.add("pressed");
    
    setTimeout(function() {
        btn.classList.remove("pressed");
    }, 150);
}

function resetGame() {
    level = 0;
    gameSeq = [];
    isStarted = false;
}

