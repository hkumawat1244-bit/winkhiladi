let timeLeft = 30;
const timerElement = document.getElementById("timer");

// Disable clicks inside page
document.body.style.pointerEvents = "none";
document.getElementById("overlay").style.pointerEvents = "all";

const countdown = setInterval(function() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.getElementById("overlay").style.display = "none";
        document.body.style.pointerEvents = "auto";
    }
}, 1000);
