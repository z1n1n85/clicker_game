const BUTTON = document.getElementById('button');
const RECORD = document.getElementById('record');
const TIMER = document.getElementById('timer');
const SCORE = document.getElementById('score');

const MAXTIME = 5000;
const TICK = 10;

let secTime = 0;
let time = MAXTIME;     
let scoreCount = 0;
let record = 0;

BUTTON.onclick = () => {
    gameInit();
}

function gameInit() {
    startTimer();
    BUTTON.onclick = gameProcess;
}

function startTimer() {
    setTimeout(gameEnd, 5000);
    
    let updateTimer = setInterval(() => {
        if (time <= 0){
            clearInterval(updateTimer);
        } else {
            time = time - TICK;
            TIMER.textContent = 'Время: ' + (time / 1000).toFixed(2);
        }
    }, TICK);
}

function gameProcess() {
    scoreCount++;
    SCORE.textContent = 'Счёт: ' + scoreCount;
}

function gameEnd() {
    BUTTON.setAttribute('disabled', true);
}