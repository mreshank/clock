
// Constants and Variables for the Clock starts from Here

// ~ - ~ - ~ Clock Tab's Constants ~ - ~ - ~ */  

const clockOptionTabs = document.querySelectorAll(".tab");
const clockOptionContents = document.querySelectorAll(".content");

// ~ - ~ - ~ Timer's Constants ~ - ~ - ~ */ 

const countDownUI = document.getElementById("countDown");

const timerHours = document.getElementById("timerHours");
const timerMinutes = document.getElementById("timerMinutes");
const timerSeconds = document.getElementById("timerSeconds");

const playTimer = document.getElementById("playTimer");
const resetTimer = document.getElementById("resetTimer");

const timerHoursInput = document.getElementById("timerHoursInput");
const timerMinutesInput = document.getElementById("timerMinutesInput");
const timerSecondsInput = document.getElementById("timerSecondsInput");


var setTime = 8, leftTime = setTime, timer, timerState = false; 

// ~ - ~ - ~ StapWatch's Constants and Variables ~ - ~ - ~ */

const stopWatchHours = document.getElementById("stopWatchHours");
const stopWatchMinutes = document.getElementById("stopWatchMinutes");
const stopWatchSeconds = document.getElementById("stopWatchSeconds");

const playStopWatch = document.getElementById("playStopWatch");
const resetStopWatch = document.getElementById("resetStopWatch");

var stopWatchState = false, stopWatchTime = 0, stopWatchTimer;

// ~ - ~ - ~ Alarms's Constants and Variables ~ - ~ - ~ */

const alarmTimeInput = document.getElementById("alarmTimeInput");
const alarmInput = document.getElementById("setAlarm");
const alarmList = document.getElementById("alarmList");

var alarmInputTime, totalAlarms = 0;

// ~ - ~ - ~ Audio Alert's Constants and Variables ~ - ~ - ~ */ 

const main = document.getElementById("main");
var alarmSound = new Audio(), currentAlert;



// ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ */



// Functionalities for the Clock starts from Here

// ~ - ~ - ~ Tabs / Options ~ - ~ - ~ */



clockOptionTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        clockOptionTabs.forEach((tab) => tab.classList.remove("active-tab"));
        clockOptionContents.forEach((content) => content.classList.add("d-none"));
        tab.classList.add("active-tab");
        document.getElementById(tab.getAttribute("data-target")).classList.remove("d-none");
    });
});



// ~ - ~ - ~ Sound Alert Functions ~ - ~ - ~ */



function createAlert(alertMessage, alertType) {
    let newAlert = document.createElement("div");
    newAlert.setAttribute("class", "alertPopUp d-flex flex-column justify-content-center align-items-center position-absolute gap-4 display-4 pt-5 p-5");
    newAlert.innerHTML = `<div class="alertMessage"> ${alertMessage} </div>
    <button class="closeAlert btn p-0"> <img src="./assets/close.png"> </button>`;
    newAlert.querySelector(".closeAlert").addEventListener("click", () => {
        newAlert.remove();
        alarmSound.pause();
        alarmSound.currentTime = 0;
    });
    main.append(newAlert);
    alarmSound.pause();
    alarmSound.src = `./assets/${alertType}.mp3`;
    alertType.volume = 1;
    alarmSound.play();
    return newAlert;
}



// ~ - ~ - ~ Timer Functions ~ - ~ - ~ */



function timerEnded() {
    clearTimeout(timer);
    countDownUI.style.background = `conic-gradient(rgb(255, 245, 0) 0%, 0, grey )`;
    leftTime = setTime;
    timerState = false;
}

function showLeftTime() {
    let h = Math.floor(leftTime/3600);
    let m = Math.floor((leftTime%3600)/60);
    let s = Math.floor(leftTime%60);
    timerHours.innerHTML = h < 10 ? `0${h}`: h;
    timerMinutes.innerHTML = m < 10 ? `0${m}`: m;
    timerSeconds.innerHTML = s < 10 ? `0${s}`: s;
}

function playTimerFx() {
    timerState = true;
    playTimer.querySelector("img").src = "./assets/pause.png";
    playTimer.setAttribute("title", "Pause Timer");
    countDownUI.style.transform="scale(1.15)";
    countDownUI.style.background = `conic-gradient(rgb(255, 245, 0) 0%, 0, grey )`;
    timerHoursInput.disabled = true; 
    timerMinutesInput.disabled = true;
    timerSecondsInput.disabled = true;
    countDown();
}

function pauseTimerFx() {
    timerState = false;
    playTimer.querySelector("img").src = "./assets/play.png";
    playTimer.setAttribute("title", "Play Timer");
    countDownUI.style.transform="scale(1)";
    timerHoursInput.disabled = false; 
    timerMinutesInput.disabled = false;
    timerSecondsInput.disabled = false;
}

function resetTimerFx() {
    leftTime = setTime;
    pauseTimerFx();
    countDown();
}

function countDown () {
    clearTimeout(timer);
    countDownUI.style.background = `conic-gradient(rgb(255, 245, 0) ${(leftTime*100)/setTime}%, 0, grey)`;
    if (leftTime > 0) {
        showLeftTime();
        if(timerState) {
            timer = setTimeout( () => { 
                leftTime = leftTime - 0.1; 
                if(leftTime==0) timerEnded();
                else countDown(); 
            }, 100);
        }
    } else {
        countDownUI.style.transform="scale(1)";
        playTimer.querySelector("img").src = "./assets/play.png";
        timerHoursInput.disabled = false; 
        timerMinutesInput.disabled = false;
        timerSecondsInput.disabled = false;
        if(currentAlert) currentAlert.remove();
        if(setTime>0) currentAlert = createAlert("Timer Up !", "timer");
    }
}

playTimer.addEventListener("click", () => {
    if(timerState) pauseTimerFx();
    else playTimerFx();
    countDown();
});

resetTimer.addEventListener("click", resetTimerFx);

function timerInputChanged() {
    setTime = timerHoursInput.value*3600 + timerMinutesInput.value*60 + timerSecondsInput.value*1;
    leftTime = setTime;
    showLeftTime();
}

timerHoursInput.addEventListener("input", () => {
    if(timerHoursInput.value >= 9999) timerHoursInput.value = 9999;
    timerInputChanged();
});

timerMinutesInput.addEventListener("input", () => {
    if(timerMinutesInput.value >= 60) timerMinutesInput.value = 59;
    timerInputChanged();
});

timerSecondsInput.addEventListener("input", () => {
    if(timerSecondsInput.value >= 60) timerSecondsInput.value = 59;
    timerInputChanged();
});

timerInputChanged();



// ~ - ~ - ~ StopWatch Functions ~ - ~ - ~ */



function playStopWatchFx() {
    stopWatchState = true;
    playStopWatch.querySelector("img").src = "./assets/pause.png";
    playStopWatch.setAttribute("title", "Pause StopWatch");
    countUp();
}

function pauseStopWatchFx() {
    stopWatchState = false;
    playStopWatch.querySelector("img").src = "./assets/play.png";
    playStopWatch.setAttribute("title", "Play StopWatch");
}

function resetStopWatchFx() {
    stopWatchTime = 0;
    pauseStopWatchFx();
    showStopWatchTime();
}

function showStopWatchTime() {
    let h = Math.floor(stopWatchTime/3600);
    let m = Math.floor((stopWatchTime%3600)/60);
    let s = Math.floor(stopWatchTime%60);
    stopWatchHours.innerHTML = h < 10 ? `0${h}`: h;
    stopWatchMinutes.innerHTML = m < 10 ? `0${m}`: m;
    stopWatchSeconds.innerHTML = s < 10 ? `0${s}`: s;
}

function countUp(){
    clearTimeout(stopWatchTimer);
    if(stopWatchState) {
        stopWatchTime += 0.1;
        showStopWatchTime();
        stopWatchTimer = setTimeout(countUp, 100);
    }
}

playStopWatch.addEventListener("click", () => {
    if(stopWatchState) pauseStopWatchFx();
    else playStopWatchFx();
    countUp();
});

resetStopWatch.addEventListener("click", resetStopWatchFx);



// ~ - ~ - ~ Alarm Functions ~ - ~ - ~ */



function createAlarm(time) {
    let setAlarm = new Date();
    setAlarm.setHours(time.substring(0,2));
    setAlarm.setMinutes(time.substring(3,5));
    setAlarm.setSeconds(0);
    let alarmDelay = setAlarm - new Date();
    return setTimeout(() => {
        if(currentAlert) currentAlert.remove();
        currentAlert = createAlert(`Alarm ${time} over !`, "alarm");
    }, alarmDelay);
}

function deleteAlarm(newAlarm, alarmDelay) {
    newAlarm.remove();
    clearTimeout(alarmDelay);
    totalAlarms--;
}

function getAlarm(time) {
    totalAlarms++;
    let newAlarm = document.createElement("div");
    newAlarm.setAttribute("class", "alarmItem col d-flex justify-content-around align-items-center px-sm-5 px-4 py-3");
    newAlarm.innerHTML = `<h4 class="d-flex align-items-end"> ${time} </h4> 
    <img class="align-self-end" src="./assets/delete.png" alt="Delete Alarm"/>`;
    let alarmTimer = createAlarm(time);
    newAlarm.querySelector("img").addEventListener("click", () => deleteAlarm(newAlarm, alarmTimer));
    return newAlarm;
}

alarmInput.addEventListener("click", () => {
    alarmInputTime = alarmTimeInput.value;
    console.log(alarmInputTime);
    if(alarmInputTime) {
        alarmList.append(getAlarm(alarmInputTime));
        alarmTimeInput.value = "";
    } 
});
