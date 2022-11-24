const BUTTON = document.getElementById('button');
const RECORD = document.getElementById('record');
const TIMER = document.getElementById('timer');
const SCORE = document.getElementById('score');

const MAXTIME = 5000;  // таймер в милисекундах
const TICK = 10;       // шаг у таймера

let time = MAXTIME;     
let scoreCount = 0;
let recordCount = 0;
let iMessage = 0; 
let buttonMessage = ['Нужно тыкать быстро', 'У тебя только 5 сек.', 'Ты готов?'];

BUTTON.onclick = gameInstruction;

function gameInstruction() {
    iMessage < 3 ? BUTTON.firstChild.textContent = buttonMessage[iMessage]: gameSetup();
    iMessage++;
}

function gameSetup() {
    scoreCount = 0;
    SCORE.textContent = 'Счёт: 00';
    
    time = MAXTIME;   
    TIMER.textContent = 'Время: ' + (time / 1000).toFixed(2);
    
    BUTTON.firstChild.textContent = 'Старт';
    BUTTON.onclick = gameInit;
}

function gameInit() {
    startTimer();
    gameProcess();
    BUTTON.firstChild.textContent = 'Тыкай!';
    BUTTON.onclick = gameProcess;
}

function startTimer() {
    let updateTimer = setInterval(() => {
        if (time <= 0){
            clearInterval(updateTimer);
            gameEnd();
        } else {
            time = time - TICK;
            TIMER.textContent = 'Время: ' + (time / 1000).toFixed(2);
        }
    }, TICK);
}

function gameProcess() {
    scoreCount++;
    SCORE.textContent = scoreCount > 9 ? 'Счёт: ' + scoreCount: 'Счёт: 0' + scoreCount;
}

function gameEnd() {
    BUTTON.firstChild.textContent = 'Конец!';
    BUTTON.setAttribute('disabled', true);
    setTimeout(() =>{
        BUTTON.removeAttribute("disabled");
        BUTTON.firstChild.textContent = 'Заново?';
    }, 3000);
    BUTTON.onclick = gameSetup;

    if (scoreCount > recordCount){
        recordCount = scoreCount;
        RECORD.textContent = recordCount > 9 ? 'Рекорд: ' + recordCount: 'Рекорд: 0' + recordCount;
    }
}