let messages = [
    "Initializing Hacking...",
    "Reading your Files...",
    "Password files Detected...",
    "Sending all passwords and personal files to server...",
    "Cleaning up..."
];

let i = 0;
let j = 0;
let head = document.querySelector("#head");

function randomDelay() {
    return Math.floor(Math.random() * 7000) + 1000;
}

function showMessage() {
    if (i >= messages.length) return;

    let typingInterval = setInterval(() => {
        if (j < messages[i].length) {
            head.textContent += messages[i][j];
            j++;
        } else {
            clearInterval(typingInterval);
            setTimeout(() => {
                head.textContent = "";
                j = 0;
                i++;
                showMessage();
            }, randomDelay());
        }
    }, 100);
}

showMessage();
