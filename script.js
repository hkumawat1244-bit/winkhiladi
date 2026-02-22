const App = {
    user: null,
    balance: 0,
    matches: [
        { id: 1, t1: "IND", t2: "AUS", prize: 50000 },
        { id: 2, t1: "ENG", t2: "PAK", prize: 25000 },
        { id: 3, t1: "SA", t2: "NZ", prize: 15000 }
    ]
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    const saved = localStorage.getItem("fantasyPro");
    if (saved) Object.assign(App, JSON.parse(saved));
    render(App.user ? "dashboard" : "login");
}

function save() {
    localStorage.setItem("fantasyPro", JSON.stringify(App));
}

function render(page) {
    const app = document.getElementById("app");

    if (page === "login") {
        app.innerHTML = `
            <div class="card">
                <h2>FantasyX Pro Login</h2>
                <input id="username" placeholder="Enter Username">
                <button class="primary" onclick="login()">Login</button>
            </div>
        `;
    }

    if (page === "dashboard") {
        app.innerHTML = `
            <div class="nav">
                <strong>${App.user}</strong>
                <button class="danger" onclick="logout()">Logout</button>
            </div>
            <div class="card">
                <h3>Wallet Balance</h3>
                <h2>₹${App.balance}</h2>
                <button class="primary" onclick="addMoney()">Add ₹500</button>
            </div>
            <div class="card">
                <button class="primary" onclick="render('matches')">View Matches</button>
                <button class="primary" onclick="render('leaderboard')">Leaderboard</button>
            </div>
        `;
    }

    if (page === "matches") {
        let html = `<div class="card"><h2>Available Matches</h2>`;
        App.matches.forEach(m => {
            html += `
                <div class="match-card">
                    <strong>${m.t1} vs ${m.t2}</strong>
                    <p>Prize Pool: ₹${m.prize}</p>
                    <button class="primary" onclick="joinMatch(${m.id})">Join (₹100)</button>
                </div>
            `;
        });
        html += `<button class="danger" onclick="render('dashboard')">Back</button></div>`;
        app.innerHTML = html;
    }

    if (page === "leaderboard") {
        app.innerHTML = `
            <div class="card">
                <h2>Leaderboard</h2>
                <p>🥇 Player1 - ₹5000</p>
                <p>🥈 Player2 - ₹3500</p>
                <p>🥉 Player3 - ₹2000</p>
                <button class="danger" onclick="render('dashboard')">Back</button>
            </div>
        `;
    }
}

function login() {
    const username = document.getElementById("username").value;
    if (!username) return alert("Enter Username");
    App.user = username;
    App.balance = 1000;
    save();
    render("dashboard");
}

function logout() {
    localStorage.removeItem("fantasyPro");
    App.user = null;
    render("login");
}

function addMoney() {
    App.balance += 500;
    save();
    render("dashboard");
}

function joinMatch(id) {
    if (App.balance < 100) return alert("Insufficient Balance");
    App.balance -= 100;
    save();
    alert("Match Joined Successfully!");
    render("dashboard");
}
