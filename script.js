let countdown = 60;
let isRunning = false;
let timerInterval = null;

function getDatePrefix() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 9001) + 1000;
}

function updateLotteryNumber() {
    const newNumber = generateRandomNumber();
    const fullNumber = getDatePrefix() + newNumber;

    document.getElementById("lottery-result").innerText = newNumber;
    document.getElementById("lottery-full").innerText = fullNumber;
}

function startLottery() {
    if (isRunning) return;

    isRunning = true;
    document.getElementById("status").innerText = "Lottery Running...";

    updateLotteryNumber();

    timerInterval = setInterval(() => {
        countdown--;

        if (countdown <= 0) {
            countdown = 60;
            updateLotteryNumber();
        }

        document.getElementById("countdown").innerText = countdown;
    }, 1000);
}

function checkTime() {
    const now = new Date();

    if (now.getHours() === 12 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        startLottery();
    }

    if (now.getHours() >= 12 && !isRunning) {
        startLottery();
    }
}

setInterval(checkTime, 1000);

window.onload = function () {
    checkTime();
};
