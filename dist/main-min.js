const BUTTON=document.getElementById("button"),RECORD=document.getElementById("record"),TIMER=document.getElementById("timer"),SCORE=document.getElementById("score"),MAXTIME=5e3,TICK=10;let time=MAXTIME,scoreCount=0,recordCount=0,iMessage=0,buttonMessage=["Нужно тыкать быстро","У тебя только 5 сек.","Ты готов?"];function gameInstruction(){iMessage<3?BUTTON.firstChild.textContent=buttonMessage[iMessage]:gameSetup(),iMessage++}function gameSetup(){scoreCount=0,SCORE.textContent="Счёт: 00",time=MAXTIME,TIMER.textContent="Время: "+(time/1e3).toFixed(2),BUTTON.firstChild.textContent="Старт",BUTTON.onclick=gameInit}function gameInit(){startTimer(),gameProcess(),BUTTON.firstChild.textContent="Тыкай!",BUTTON.onclick=gameProcess}function startTimer(){let t=setInterval(()=>{time<=0?(clearInterval(t),gameEnd()):(time-=TICK,TIMER.textContent="Время: "+(time/1e3).toFixed(2))},TICK)}function gameProcess(){scoreCount++,SCORE.textContent=scoreCount>9?"Счёт: "+scoreCount:"Счёт: 0"+scoreCount}function gameEnd(){BUTTON.firstChild.textContent="Конец!",BUTTON.setAttribute("disabled",!0),setTimeout(()=>{BUTTON.removeAttribute("disabled"),BUTTON.firstChild.textContent="Заново?"},3e3),BUTTON.onclick=gameSetup,scoreCount>recordCount&&(recordCount=scoreCount,RECORD.textContent=recordCount>9?"Рекорд: "+recordCount:"Рекорд: 0"+recordCount)}BUTTON.onclick=gameInstruction;