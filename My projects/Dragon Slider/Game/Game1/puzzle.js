// Slider Puzzle Logic
var puzzleContainer = document.getElementById( 'puzzle-container' );
var messageBox = document.getElementById("message");

let myTiles = [];

function startGame() {
    // restart global vars
    myTiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
    
    // shuffle
    let is_ok = false;
    while(is_ok == false){
       doShuffle(myTiles);
       is_ok = checkSolvable(myTiles);
       // console.log("shuffling...");
    }

    drawBoard();
    messageBox.innerText = "";
}

function doShuffle(arr) {
    // standard shuffle algo
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// checks if inversions are even
function checkSolvable( theArray ) {
    let count = 0;
    // filter out null
    let numbers = theArray.filter(n => n !== null);
    
    for(let i=0; i<numbers.length; i++) {
        for(let j=i+1; j<numbers.length; j++) {
            if(numbers[i] > numbers[j]) {
                count++;
            }
        }
    }
    
    if (count % 2 == 0) return true;
    else return false;
}

function drawBoard() {
    puzzleContainer.innerHTML = ''; // clear old stuff
    
    for(let i=0; i<myTiles.length; i++) {
        let val = myTiles[i];
        let tileDiv = document.createElement('div');
        
        if (val == null) {
            tileDiv.className = "tile empty";
        } else {
            tileDiv.className = "tile";
            tileDiv.innerText = val;
            
            // click handler
            tileDiv.onclick = function() {
                tryMove(i);
            };
        }
        puzzleContainer.appendChild(tileDiv);
    }
    
    checkWinner();
}

function tryMove( index ) {
    let emptyIdx = myTiles.indexOf(null);
    let diff = Math.abs(index - emptyIdx);
    
    let canMove = false;
    
    // up or down
    if (diff == 3) canMove = true;
    
    // left or right
    if (diff == 1) {
        // check for row wrap
        // if index is 2 and empty is 3 (different rows) -> no
        let row1 = Math.floor(index/3);
        let row2 = Math.floor(emptyIdx/3);
        if(row1 == row2) canMove=true;
    }
    
    if (canMove) {
        // swap logic
        let temp = myTiles[index];
        myTiles[index] = myTiles[emptyIdx];
        myTiles[emptyIdx] = temp;
        
        drawBoard();
    }
}

function checkWinner() {
    // hardcoded win state
    let winningPart = [1,2,3,4,5,6,7,8,null];
    let won = true;
    
    for(let k=0; k<9; k++) {
        if(myTiles[k] !== winningPart[k]) {
            won = false;
            break;
        }
    }
    
    if(won) {
        messageBox.innerText = "🎉 You Win! The Dragon is pleased! 🎉";
        // alert("You win!");
    }
}

// run it
startGame();