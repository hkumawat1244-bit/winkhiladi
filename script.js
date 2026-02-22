<think>
The user is asking which JavaScript file they should upload. They have two options:
1. The simple frontend-only JavaScript (script.js) that uses localStorage
2. The backend JavaScript (server.js) that requires Node.js and a server

Since they are using GitHub Pages (which only hosts static files), they should use the frontend JavaScript (script.js) that works with localStorage for demo purposes.

However, for real payments and bank integration, they need a backend server. But GitHub Pages cannot run Node.js backend.

I should clarify:
1. For GitHub Pages (static hosting): Use the simple script.js with localStorage (demo mode)
2. For real payments: They need to deploy the backend separately (on Heroku, Render, Railway, etc.)

Let me provide clear instructions on which file to use and explain the limitations.

</think># Which JavaScript File to Upload?

## 📋 Two Options:

| Option | File | Purpose | Hosting |
|--------|------|---------|---------|
| **1** | `script.js` | Frontend only (Demo) | GitHub Pages ✅ |
| **2** | `server.js` | Backend (Real Payments) | Heroku/Render/ Railway ❌ |

---

## 🎯 For GitHub Pages (Static Hosting):

### Use: `script.js` (Frontend Only)

```javascript
// ==================== WINKHILADI - FRONTEND JAVASCRIPT ==================== //

// ==================== APP DATA ==================== //
let currentUser = null;
let users = JSON.parse(localStorage.getItem('winkhiladi_users')) || [];
let transactions = JSON.parse(localStorage.getItem('winkhiladi_transactions')) || [];
let lotteryHistory = JSON.parse(localStorage.getItem('winkhiladi_lottery')) || [];

// Default Data
const defaultMatches = [
    { id: 1, team1: { name: 'IND', logo: '🇮🇳' }, team2: { name: 'AUS', logo: '🇦🇺' }, date: 'Today', time: '7:00 PM', status: 'upcoming', contests: 1250 },
    { id: 2, team1: { name: 'IND', logo: '🇮🇳' }, team2: { name: 'PAK', logo: '🇵🇰' }, date: 'Tomorrow', time: '3:30 PM', status: 'upcoming', contests: 2500 },
    { id: 3, team1: { name: 'ENG', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, team2: { name: 'NZ', logo: '🇳🇿' }, date: 'Today', time: '8:00 PM', status: 'live', contests: 890 },
    { id: 4, team1: { name: 'SA', logo: '🇿🇦' }, team2: { name: 'WI', logo: '🇧🇬' }, date: '25 Jan', time: '5:00 PM', status: 'upcoming', contests: 650 }
];

const defaultContests = [
    { id: 1, name: 'Mega Jackpot', prize: 10000000, entry: 49, spots: 10000, joined: 7842, type: 'Mega' },
    { id: 2, name: 'Premium League', prize: 100000, entry: 199, spots: 1000, joined: 756, type: 'Premium' },
    { id: 3, name: 'Head to Head', prize: 100, entry: 10, spots: 2, joined: 1, type: 'H2H' },
    { id: 4, name: 'Practice', prize: 0, entry: 0, spots: 100, joined: 45, type: 'Free' },
    { id: 5, name: 'Grand Finale', prize: 1000000, entry: 999, spots: 2000, joined: 1567, type: 'Grand' }
];

const defaultLeaderboard = [
    { rank: 1, name: 'Rahul Sharma', points: 2845, avatar: 'RS' },
    { rank: 2, name: 'Amit Patel', points: 2720, avatar: 'AP' },
    { rank: 3, name: 'Vikram Singh', points: 2590, avatar: 'VS' },
    { rank: 4, name: 'Suresh Kumar', points: 2450, avatar: 'SK' },
    { rank: 5, name: 'Rajesh Gupta', points: 2310, avatar: 'RG' },
    { rank: 6, name: 'Ankit Sharma', points: 2180, avatar: 'AS' },
    { rank: 7, name: 'Mohit Verma', points: 2050, avatar: 'MV' },
    { rank: 8, name: 'Deepak Yadav', points: 1920, avatar: 'DY' },
    { rank: 9, name: 'Praveen Kumar', points: 1790, avatar: 'PK' },
    { rank: 10, name: 'Manish Singh', points: 1660, avatar: 'MS' }
];

// ==================== INITIALIZATION ==================== //
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
    
    populateLotteryNumbers();
    loadHomeData();
    startCountdown();
}

// ==================== AUTH FUNCTIONS ==================== //
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const otpForm = document.getElementById('otpForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.login-tabs .tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        tabs[0].classList.add('active');
        loginForm.style.display = 'block';
        otpForm.style.display = 'none';
        registerForm.style.display = 'none';
    } else {
        tabs[1].classList.add('active');
        loginForm.style.display = 'none';
        otpForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

let generatedOTP = '';

function sendOTP() {
    const mobile = document.getElementById('loginMobile').value;
    
    if (mobile.length !== 10) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }
    
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'block';
    
    document.getElementById('otpDisplay').textContent = generatedOTP;
    
    alert('OTP sent! Demo OTP: ' + generatedOTP);
}

function resendOTP() {
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('otpDisplay').textContent = generatedOTP;
    alert('New OTP sent! Demo OTP: ' + generatedOTP);
}

function verifyOTP() {
    const otp = document.getElementById('otpInput').value;
    const mobile = document.getElementById('loginMobile').value;
    
    if (otp !== generatedOTP) {
        alert('Invalid OTP! Please enter: ' + generatedOTP);
        return;
    }
    
    let user = users.find(u => u.mobile === mobile);
    
    if (!user) {
        user = {
            mobile: mobile,
            name: 'User',
            balance: 100,
            deposit: 50,
            winnings: 50,
            bonus: 50,
            contests: 0,
            wins: 0,
            earnings: 0,
            bankAccount: null
        };
        users.push(user);
        saveUsers();
    }
    
    currentUser = user;
    loginSuccess();
}

function registerUser() {
    const name = document.getElementById('regName').value;
    const mobile = document.getElementById('regMobile').value;
    const email = document.getElementById('regEmail').value;
    
    if (!name || !mobile || !email) {
        alert('Please fill all fields');
        return;
    }
    
    if (mobile.length !== 10) {
        alert('Please enter a valid mobile number');
        return;
    }
    
    if (users.find(u => u.mobile === mobile)) {
        alert('Mobile number already registered!');
        return;
    }
    
    const newUser = {
        mobile: mobile,
        name: name,
        email: email,
        balance: 100,
        deposit: 50,
        winnings: 50,
        bonus: 50,
        contests: 0,
        wins: 0,
        earnings: 0,
        bankAccount: null
    };
    
    users.push(newUser);
    saveUsers();
    
    currentUser = newUser;
    alert('Registration successful! ₹100 bonus credited!');
    loginSuccess();
}

function loginSuccess() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('mainApp').classList.add('active');
    
    updateUserUI();
    showPage('homePage');
    
    if (!transactions.find(t => t.type === 'bonus')) {
        addTransaction('bonus', 50, 'Welcome Bonus');
    }
    
    alert('Welcome to WinKhiladi! 🎉');
}

function logout() {
    currentUser = null;
    document.getElementById('mainApp').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
    
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('otpForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginMobile').value = '';
    document.getElementById('otpInput').value = '';
    
    alert('Logged out successfully!');
}

function updateUserUI() {
    if (!currentUser) return;
    
    document.getElementById('headerBalance').textContent = '₹' + currentUser.balance;
    document.getElementById('userInitial').textContent = currentUser.name.charAt(0).toUpperCase();
    
    document.getElementById('sidebarUserInitial').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('sidebarUserName').textContent = currentUser.name;
    document.getElementById('sidebarUserMobile').textContent = '+91 ' + currentUser.mobile;
    
    document.getElementById('profileUserInitial').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('profileUserName').textContent = currentUser.name;
    document.getElementById('profileUserMobile').textContent = '+91 ' + currentUser.mobile;
    
    document.getElementById('walletBalance').textContent = currentUser.balance;
    document.getElementById('depositBalance').textContent = '₹' + currentUser.deposit;
    document.getElementById('winningsBalance').textContent = '₹' + currentUser.winnings;
    document.getElementById('bonusBalance').textContent = '₹' + currentUser.bonus;
    
    document.getElementById('totalContests').textContent = currentUser.contests;
    document.getElementById('totalWins').textContent = currentUser.wins;
    document.getElementById('totalEarnings').textContent = '₹' + currentUser.earnings;
}

// ==================== NAVIGATION ==================== //
function showPage(pageId) {
    document.querySelectorAll('.content-page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
    
    if (pageId === 'homePage') loadHomeData();
    if (pageId === 'matchesPage') loadMatchesData();
    if (pageId === 'contestsPage') loadContestsData();
    if (pageId === 'leaderboardPage') loadLeaderboardData();
    if (pageId === 'walletPage') loadWalletData();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

// ==================== HOME PAGE ==================== //
function loadHomeData() {
    const matchesList = document.getElementById('homeMatchesList');
    matchesList.innerHTML = defaultMatches.slice(0, 3).map(match => `
        <div class="match-card-small" onclick="showPage('matchesPage')">
            <div class="match-teams">
                <div class="match-team">
                    <span class="logo">${match.team1.logo}</span>
                    <span class="name">${match.team1.name}</span>
                </div>
                <span class="match-vs">VS</span>
                <div class="match-team">
                    <span class="logo">${match.team2.logo}</span>
                    <span class="name">${match.team2.name}</span>
                </div>
            </div>
            <div class="match-details">
                <div class="date">${match.date} • ${match.time}</div>
                <div class="contests">${match.contests} Contests</div>
            </div>
        </div>
    `).join('');
}

// ==================== MATCHES PAGE ==================== //
function loadMatchesData() {
    const matchesList = document.getElementById('allMatchesList');
    matchesList.innerHTML = defaultMatches.map(match => `
        <div class="match-card-full">
            <div class="match-status">
                <span class="status-badge ${match.status}">${match.status === 'live' ? '🔴 LIVE' : '📅 UPCOMING'}</span>
                <span>${match.date} • ${match.time}</span>
            </div>
            <div class="match-teams-large">
                <div class="team">
                    <span class="logo">${match.team1.logo}</span>
                    <span class="name">${match.team1.name}</span>
                </div>
                <span class="vs">VS</span>
                <div class="team">
                    <span class="logo">${match.team2.logo}</span>
                    <span class="name">${match.team2.name}</span>
                </div>
            </div>
            <div class="match-actions">
                <button class="btn-primary" onclick="joinMatch(${match.id})">View Contests</button>
            </div>
        </div>
    `).join('');
}

function joinMatch(matchId) {
    showPage('contestsPage');
}

// ==================== CONTESTS PAGE ==================== //
function loadContestsData() {
    const contestsList = document.getElementById('allContestsList');
    contestsList.innerHTML = defaultContests.map(contest => {
        const spotsLeft = contest.spots - contest.joined;
        return `
            <div class="contest-card-full">
                <div class="contest-header">
                    <span class="contest-type">${contest.type}</span>
                    ${contest.prize >= 100000 ? '<span class="guaranteed">🔥 Hot</span>' : ''}
                </div>
                <h3>${contest.name}</h3>
                <div class="contest-prize">
                    <span class="label">Prize Pool</span>
                    <span class="amount">₹${formatNumber(contest.prize)}</span>
                </div>
                <div class="contest-info">
                    <div class="info-item">
                        <span class="value">₹${contest.entry}</span>
                        <span class="label">Entry</span>
                    </div>
                    <div class="info-item">
                        <span class="value">${contest.spots}</span>
                        <span class="label">Spots</span>
                    </div>
                    <div class="info-item">
                        <span class="value">${spotsLeft}</span>
                        <span class="label">Left</span>
                    </div>
                </div>
                <button class="btn-primary" onclick="joinContest(${contest.id})">Join Now - ₹${contest.entry}</button>
            </div>
        `;
    }).join('');
}

function joinContest(contestId) {
    const contest = defaultContests.find(c => c.id === contestId);
    
    if (!currentUser) {
        alert('Please login first!');
        return;
    }
    
    if (currentUser.balance < contest.entry) {
        alert('Insufficient balance! Please add money.');
        showPage('walletPage');
        return;
    }
    
    const confirm = window.confirm(`Join ${contest.name} for ₹${contest.entry}?`);
    
    if (confirm) {
        currentUser.balance -= contest.entry;
        currentUser.contests++;
        saveUsers();
        updateUserUI();
        
        addTransaction('debit', contest.entry, `Joined ${contest.name}`);
        
        alert('Successfully joined contest! Good luck! 🍀');
    }
}

// ==================== LOTTERY PAGE ==================== //
function populateLotteryNumbers() {
    const selects = ['lotteryNum1', 'lotteryNum2', 'lotteryNum3'];
    
    selects.forEach(id => {
        const select = document.getElementById(id);
        for (let i = 0; i <= 9; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }
    });
}

function playLottery() {
    if (!currentUser) {
        alert('Please login first!');
        return;
    }
    
    const num1 = document.getElementById('lotteryNum1').value;
    const num2 = document.getElementById('lotteryNum2').value;
    const num3 =
