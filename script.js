// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable key navigation
document.addEventListener("keydown", function(e) {
    if (
        e.key === "F5" ||
        e.key === "F12" ||
        (e.ctrlKey && e.key === "r") ||
        (e.ctrlKey && e.key === "u") ||
        (e.altKey && e.key === "ArrowLeft")
    ) {
        e.preventDefault();
    }
});

// Prevent back button (history push trick)
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

// After 2 minutes unlock
setTimeout(function() {
    document.getElementById("prankMessage").style.display = "block";
}, 120000);
