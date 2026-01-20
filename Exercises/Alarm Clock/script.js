const inputs = document.querySelectorAll(".ele");
const btn = document.querySelector("#btn");
const cbtn = document.querySelector("#cbtn");


function pad(num) {
    return num.toString().padStart(2, "0");
}


function getCurrentTimeString() {
    const date = new Date();
    let hour = date.getHours() % 12 || 12; 
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let months = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return pad(hour) + pad(minutes) + pad(seconds) + pad(months) + pad(day) + year;
}


function ctime() {
    const date = new Date();
    const dateMap = {
        hour: date.getHours() % 12 || 12,
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        months: date.getMonth() + 1,
        day: date.getDate(),
        year: date.getFullYear()
    };

    inputs.forEach(input => {
        input.value = pad(dateMap[input.id]);
    });
}

function userinput() {
    let user_input = "";
    inputs.forEach(input => {
        user_input += pad(input.value);
    });
    localStorage.setItem("luser_input", user_input);
    alert("Alarm Set!");
}

function checkAlarm() {
    const savedAlarm = localStorage.getItem("luser_input");
    const current_time = getCurrentTimeString();

    if (savedAlarm && savedAlarm === current_time) {
        alert("Alarm ringing!");
        localStorage.removeItem("luser_input");
    }
}


function extrazero(e) {
    const input = e.target;
    if (input.id === "year") return; 
    let value = input.value.replace(/\D/g, "").slice(-2);
    let num = Number(value);
    let max = Number(input.max);

    if (!isNaN(max) && num > max) {
        num = max;
    }
    input.value = pad(num);
}

inputs.forEach(input => input.addEventListener("input", extrazero));
btn.addEventListener("click", userinput);
cbtn.addEventListener("click", ctime);

setInterval(checkAlarm, 1000);

ctime();
