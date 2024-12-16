let clockbtn = document.getElementById("clock-btn");
let clock = document.querySelector(".clock");
let stopwatchbtn = document.getElementById("stopwatch-btn");
let stopwatch = document.querySelector(".stopwatch");
let timerbtn = document.getElementById("timer-btn");
let timer = document.querySelector(".timer");
let intervalid;
let istimer = true;
clockbtn.classList.remove("active");
clock.classList.add("hide");

// Add event listeners for tabs
clockbtn.addEventListener("click", () => {
    clockbtn.classList.add("active");
    clock.classList.remove("hide");
    if (stopwatchbtn.classList.contains("active")) {
        stopwatchbtn.classList.remove("active");
        stopwatch.classList.add("hide");
    }
    if (timerbtn.classList.contains("active")) {
        timerbtn.classList.remove("active");
        timer.classList.add("hide");
    }
    if (!intervalid) intervalid = setInterval(showTime, 1000);
});

stopwatchbtn.addEventListener("click", () => {
    clearInterval(intervalid); // Stop the clock interval
    intervalid = null;

    stopwatchbtn.classList.add("active");
    stopwatch.classList.remove("hide");
    if (clockbtn.classList.contains("active")) {
        clockbtn.classList.remove("active");
        clock.classList.add("hide");
    }
    if (timerbtn.classList.contains("active")) {
        timerbtn.classList.remove("active");
        timer.classList.add("hide");
    }
});

timerbtn.addEventListener("click", () => {
    clearInterval(intervalid); // Stop the clock interval
    intervalid = null;

    timerbtn.classList.add("active");
    timer.classList.remove("hide");
    if (clockbtn.classList.contains("active")) {
        clockbtn.classList.remove("active");
        clock.classList.add("hide");
    }
    if (stopwatchbtn.classList.contains("active")) {
        stopwatchbtn.classList.remove("active");
        stopwatch.classList.add("hide");
    }
});

// Clock Functionality
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let am_pm = "AM";

    if (hour >= 12) {
        if (hour > 12) {
            hour -= 12;
            am_pm = "PM";
        }
    } else if (hour === 0) {
        hour = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = `${hour}:${min}:${sec}`;
    document.getElementById("clock-time").innerText = currentTime;
    document.getElementById("am_pm").innerText = am_pm;
}

// Stopwatch Functionality
let startButton = document.getElementById('start-btn');
let stopButton = document.getElementById('stop-btn');
let resetButton = document.getElementById('restart-btn');

let hour = 0, minute = 0, second = 0, count = 0;

// Start Stopwatch
startButton.addEventListener('click', function () {
    istimer = true;
    stopWatch();
});

// Stop Stopwatch
stopButton.addEventListener('click', function () {
    istimer = false;
});

// Reset Stopwatch
resetButton.addEventListener('click', function () {
    istimer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('stopwatch-clk').innerHTML = "00:00:00";
});

function stopWatch() {
    if (istimer) {
        count++;
        if (count === 100) {
            second++;
            count = 0;
        }
        if (second === 60) {
            minute++;
            second = 0;
        }
        if (minute === 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hourString = hour < 10 ? "0" + hour : hour;
        let minuteString = minute < 10 ? "0" + minute : minute;
        let secondString = second < 10 ? "0" + second : second;

        document.getElementById('stopwatch-clk').innerHTML =
            `${hourString}:${minuteString}:${secondString}`;
        setTimeout(stopWatch, 10);
    }
}



//Timer Functionality

let tistart = document.getElementById('tistart-btn');
let tiStop = document.getElementById('tistop-btn');
let tiReset = document.getElementById('tirestart-btn');

let inc = document.getElementById('inc-min');
let dec = document.getElementById("dec-min");

let tihour = 0, timinute = 5, tisecond = 0;
let timerActive = false;

// Increase Timer by 5 minutes
inc.addEventListener('click', function () {
    timinute += 5;
    if (timinute === 60) {
        timinute = 0;
        tihour++;
    }
    updateTimerDisplay();
});

// Decrease Timer by 5 minutes
dec.addEventListener('click', function () {
    if (tihour === 0 && timinute === 5) return; // Minimum limit
    timinute -= 5;
    if (timinute < 0) {
        timinute = 55;
        tihour--;
    }
    updateTimerDisplay();
});

// Start Timer countdown
tistart.addEventListener('click', function () {
    timerActive = true;
    runTimer();
});

// Stop Timer
tiStop.addEventListener("click", () => {
    timerActive = false;
});

// Reset Timer
tiReset.addEventListener("click", () => {
    timerActive = false;
    tihour = 0;
    timinute = 5;
    tisecond = 0;
    updateTimerDisplay();
});

// Timer countdown logic
function runTimer() {
    if (timerActive) {
        if (tisecond === 0) {
            if (timinute === 0) {
                if (tihour === 0) {
                    timerActive = false; // Timer complete
                    return;
                }
                tihour--;
                timinute = 59;
            } else {
                timinute--;
            }
            tisecond = 59;
        } else {
            tisecond--;
        }
        updateTimerDisplay();
        setTimeout(runTimer, 1000);
    }
}

// Helper to update Timer display
function updateTimerDisplay() {
    document.getElementById('timer-clk').innerHTML =
        `${tihour < 10 ? "0" + tihour : tihour}:${timinute < 10 ? "0" + timinute : timinute}:${tisecond < 10 ? "0" + tisecond : tisecond}`;
}