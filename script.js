let seconds = 0;
let tens = 0;
let mins = 0;
let getSeconds = document.querySelector('.seconds');
let getTens = document.querySelector('.tens');
let getMins = document.querySelector('.mins');
let btnStart = document.querySelector('.btn-start');
let btnStop = document.querySelector('.btn-stop');
let btnReset = document.querySelector('.btn-reset');
let btnLap = document.querySelector('.btn-lap');
let interval;
let lapTimes = [];
let lapList = document.createElement('ul');
let lapListContainer = document.querySelector('.lap-times-container');

// Create the beep and ticking sounds
const beep = new Audio('beep.mp3'); // Replace with your beep sound file
const tick = new Audio('ticking.mp3'); // Replace with your ticking sound file

let tickingInterval; // Variable to store the ticking interval

btnStart.addEventListener('click', () => {
    beep.play(); // Play beep sound on start
    clearInterval(interval);
    interval = setInterval(startTimer, 10); // Start the timer

    // Play the ticking sound continuously while the stopwatch is running
    if (!tickingInterval) {
        tickingInterval = setInterval(() => {
            tick.currentTime = 0;  // Reset the ticking sound to the start
            tick.play(); // Play the ticking sound every 100ms
        }, 100); 
    }
});

btnStop.addEventListener('click', () => {
    beep.play(); // Play beep sound on stop
    clearInterval(interval); // Stop the timer

    // Stop the ticking sound when the stopwatch stops
    clearInterval(tickingInterval);
    tickingInterval = null;

    // Pause the ticking sound immediately
    tick.pause(); 
    tick.currentTime = 0; // Reset to start position for next play
});

btnReset.addEventListener('click', () => {
    clearInterval(interval);
    clearInterval(tickingInterval); // Stop the ticking sound on reset
    tickingInterval = null;
    tens = 0;
    seconds = 0;
    mins = 0;
    getSeconds.innerHTML = '00';
    getTens.innerHTML = '00';
    getMins.innerHTML = '00';
    lapTimes = [];
    lapList.innerHTML = '';

    // Pause the ticking sound immediately
    tick.pause();
    tick.currentTime = 0; // Reset to start position for next play
});

btnLap.addEventListener('click', () => {
    lapTimes.push(`${mins}:${seconds}:${tens}`);
    displayLapTimes();
});

function startTimer() {
    tens++;
    if (tens <= 9) {
        getTens.innerHTML = '0' + tens;
    }
    if (tens > 9) {
        getTens.innerHTML = tens;
    }
    if (tens > 99) {
        seconds++;
        getSeconds.innerHTML = '0' + seconds;
        tens = 0;
        getTens.innerHTML = '00';
    }
    if (seconds > 9) {
        getSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        mins++;
        getMins.innerHTML = '0' + mins;
        seconds = 0;
        getSeconds.innerHTML = '00';
    }
    if (mins > 9) {
        getMins.innerHTML = mins;
    }
}

function displayLapTimes() {
    lapList.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapList.appendChild(lapItem);
    });
    lapListContainer.appendChild(lapList);
}
