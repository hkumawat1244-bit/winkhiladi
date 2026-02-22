// lottery.js

// Global variables
let currentNumber = 1000;
let countdown = 60;
let isRunning = false;

// फंक्शन जो आज की तारीख YYYYMMDD format में देगा
function getDatePrefix() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// फंक्शन जो Random Number generate करेगा (1000 से 10000 तक)
function generateRandomNumber() {
    return Math.floor(Math.random() * 9001) + 1000; // 1000 से 10000 तक
}

// फंक्शन जो स्क्रीन पर नंबर अपडेट करेगा
function updateLotteryNumber() {
    const datePrefix = getDatePrefix();
    const newNumber = generateRandomNumber();
    const fullNumber = `${datePrefix}${newNumber}`;
    
    const displayElement = document.getElementById("lottery-result");
    const fullDisplayElement = document.getElementById("lottery-full");
    
    if (displayElement) {
        displayElement.innerText = newNumber;
    }
    
    if (fullDisplayElement) {
        fullDisplayElement.innerText = fullNumber;
    }
    
    console.log(`New Lottery Number: ${fullNumber}`);
}

// Check if it's 12:00 PM and start the generator
function checkStartTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // 12:00 PM (दोपहर) पर शुरू होगा
    if (hours === 12 && minutes === 0 && seconds === 0) {
        startLottery();
    }
    
    // अगर पहले से चल रहा है तो हर मिनट अपडेट करें
    if (isRunning && minutes === 0 && seconds === 0) {
        updateLotteryNumber();
    }
}

// Lottery शुरू करने का फंक्शन
function startLottery() {
    isRunning = true;
    currentNumber = 1000;
    updateLotteryNumber();
    console.log("🎰 Lottery Generator Started at 12:00 PM!");
}

// हर 1 सेकंड में चेक करें
setInterval(checkStartTime, 1000);

// पहली बार लोड होने पर चेक करें
window.onload = function() {
    const now = new Date();
    const hours = now.getHours();
    
    // अगर 12:00 PM के बाद है तो शुरू करें
    if (hours >= 12) {
        startLottery();
    }
    
    // Countdown Timer
    setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            countdown = 60;
        }
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.innerText = countdown;
        }
    }, 1000);
};
