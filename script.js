// ===============================
// Fantasy App Advanced JS
// ===============================

// Global State
const AppState = {
    user: null,
    balance: 0,
    currentPage: "login",
    matches: [
        { id: 1, team1: "IND", team2: "AUS", prize: 50000 },
        { id: 2, team1: "ENG", team2: "PAK", prize: 25000 },
        { id: 3, team1: "SA", team2: "NZ", prize: 15000 }
    ]
};

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadUser();
    renderPage();
});

// ===============================
// USER AUTH
// ===============================
function login(username) {
    AppState.user = username;
    AppState.balance = 1000;
    localStorage.setItem("fantasyUser", JSON.stringify(AppState));
    renderPage("dashboard");
}

function logout() {
    localStorage.removeItem("fantasyUser");
    AppState.user = null;
    renderPage("login");
}

function loadUser() {
    const saved = localStorage.getItem("fantasyUser");
    if (saved) {
        Object.assign(AppState, JSON.parse(saved));
        AppState.currentPage = "dashboard";
    }
}

// ===============================
// PAGE RENDERING (SPA)
// ===============================
function renderPage(page = AppState.currentPage) {
    AppState.currentPage = page;
    const root = document.getElementById("app");

    if (page === "login") {
        root.innerHTML = `
            <div class="login-page">
                <h2>Login to Fantasy App</h2>
                <input id="username" placeholder="Enter username" />
                <button onclick="handleLogin()">Login</button>
            </div>
        `;
    }

    if (page === "dashboard") {
        root.innerHTML = `
            <div class="dashboard">
                <h2>Welcome ${AppState.user}</h2>
                <p>Balance: ₹${AppState.balance}</p>
                <button onclick="renderPage('matches')">View Matches</button>
                <button onclick="logout()">Logout</button>
            </div>
        `;
    }

    if (page === "matches") {
        let matchHTML = "";
        AppState.matches.forEach(match => {
            matchHTML += `
                <div class="match-card">
                    <h3>${match.team1} vs ${match.team2}</h3>
                    <p>Prize Pool: ₹${match.prize}</p>
                    <button onclick="joinMatch(${match.id})">Join</button>
                </div>
            `;
        });

        root.innerHTML = `
            <div class="matches-page">
                <h2>Available Matches</h2>
                ${matchHTML}
                <button onclick="renderPage('dashboard')">Back</button>
            </div>
        `;
    }
}

// ===============================
// ACTIONS
// ===============================
function handleLogin() {
    const username = document.getElementById("username").value;
    if (!username) return alert("Enter username");
    login(username);
}

function joinMatch(id) {
    const match = AppState.matches.find(m => m.id === id);
    if (!match) return;

    if (AppState.balance >= 100) {
        AppState.balance -= 100;
        saveState();
        alert(`Joined ${match.team1} vs ${match.team2}`);
        renderPage("dashboard");
    } else {
        alert("Insufficient Balance");
    }
}

function saveState() {
    localStorage.setItem("fantasyUser", JSON.stringify(AppState));
}
