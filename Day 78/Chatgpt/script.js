const messages = [
    "Initializing Hacking...",
    "Reading your Files...",
    "Password files Detected...",
    "Sending all passwords and personal files to server...",
    "Cleaning up..."
];

const head = document.querySelector("#output");

// random delay between 1–7 seconds
function randomDelay() {
    return Math.floor(Math.random() * 7000) + 1000;
}

// Promise for typing effect
function typeMessage(message) {
    return new Promise((resolve) => {
        let i = 0;
        head.textContent = "";

        const interval = setInterval(() => {
            if (i < message.length) {
                head.textContent += message[i];
                i++;
            } else {
                clearInterval(interval);
                resolve(); // typing finished
            }
        }, 100);
    });
}

// Promise for delay
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// MAIN async function
async function hackingSimulator() {
    for (let msg of messages) {
        await typeMessage(msg);        // wait for typing
        await wait(randomDelay());     // wait random delay
    }
}

hackingSimulator();
