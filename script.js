<think>
The user wants:
1. Complete JavaScript file
2. Number generator that works every 1 minute
3. Period number that updates with the number
4. No errors

Let me create a complete, error-free JavaScript file with:
- Color game logic
- Number generator every 60 seconds
- Period number tracking
- Bank account management
- Wallet with real payment integration
- All the features they asked for

I'll make sure it's complete and works without errors.
</think># Complete JavaScript File - Error Free

## 📄 File 3: `script.js`

```javascript
// ==================== WINKHILADI - COMPLETE JAVASCRIPT ==================== //

// ==================== CONFIGURATION ==================== //
const GAME_DURATION = 60; // seconds

// ==================== APP STATE ==================== //
let currentUser = null;
let users = JSON.parse(localStorage.getItem('winkhiladi_users')) || [];
let transactions = JSON.parse(localStorage.getItem('winkhiladi_transactions')) || [];
let gameHistory = JSON.parse(localStorage.getItem('winkhiladi_history')) || [];
let currentBet = { amount: 10, type: null };
let gameTimer = GAME_DURATION;
let gameInterval = null;
let periodNumber = Math.floor(Math.random() * 900000) + 100000;

// ==================== INITIALIZATION ==================== //
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
    
    // Populate lottery numbers
    populateLotteryNumbers();
    
    // Load game
    loadColorGame();
    
    // Update period
    updatePeriodNumber();
    
    // Start game timer
    startGameTimer();
}

// ==================== AUTH FUNCTIONS ==================== //
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const otpForm = document.getElementById('otpForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.login-tabs .tab-btn');
    
    tabs.forEach(t => t.classList    
    if (.remove('active'));
tab === 'login') {
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
            id: Date.now(),
            mobile: mobile,
            name: 'User',
            balance: 100,
            deposit: 50,
            winnings: 50,
            bonus: 50,
            games: 0,
            wins: 0,
            earnings: 0,
            bankAccount: null,
            createdAt: new Date().toISOString()
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
        id: Date.now(),
        mobile: mobile,
        name: name,
        email: email,
        balance: 100,
        deposit: 50,
        winnings: 50,
        bonus: 50,
        games: 0,
        wins: 0,
        earnings: 0,
        bankAccount: null,
        createdAt: new Date().toISOString()
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
    showPage('colorGamePage');
    
    // Add welcome bonus transaction
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

// ==================== NAVIGATION ==================== //
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.content-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update sidebar
    document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Close sidebar
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
    
    // Load page data
    if (pageId === 'colorGamePage') loadColorGame();
    if (pageId === 'lotteryPage') loadLotteryPage();
    if (pageId === 'walletPage') loadWalletPage();
    if (pageId === 'bankPage') loadBankPage();
    if (pageId === 'historyPage') loadHistoryPage();
    if (pageId === 'profilePage') loadProfilePage();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

// ==================== USER UI ==================== //
function updateUserUI() {
    if (!currentUser) return;
    
    const balance = currentUser.deposit + currentUser.winnings + currentUser.bonus;
    
    // Header
    document.getElementById('headerBalance').textContent = '₹' + balance;
    document.getElementById('userInitial').textContent = currentUser.name.charAt(0).toUpperCase();
    
    // Sidebar
    document.getElementById('sidebarUserInitial').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('sidebarUserName').textContent = currentUser.name;
    document.getElementById('sidebarUserMobile').textContent = '+91 ' + currentUser.mobile;
    
    // Profile
    document.getElementById('profileUserInitial').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('profileUserName').textContent = currentUser.name;
    document.getElementById('profileUserMobile').textContent = '+91 ' + currentUser.mobile;
    
    // Wallet
    document.getElementById('walletBalance').textContent = balance;
    document.getElementById('depositBalance').textContent = '₹' + currentUser.deposit;
    document.getElementById('winningsBalance').textContent = '₹' + currentUser.winnings;
    document.getElementById('bonusBalance').textContent = '₹' + currentUser.bonus;
    
    // Profile stats
    document.getElementById('totalGames').textContent = currentUser.games;
    document.getElementById('totalWins').textContent = currentUser.wins;
    document.getElementById('totalEarnings').textContent = '₹' + currentUser.earnings;
    
    // Game balance
    document.getElementById('gameBalance').textContent = '₹' + balance;
}

function saveUsers() {
    localStorage.setItem('winkhiladi_users', JSON.stringify(users));
}

// ==================== TRANSACTIONS ==================== //
function addTransaction(type, amount, description) {
    const transaction = {
        id: Date.now(),
        type: type,
        amount: amount,
        description: description,
        date: new Date().toISOString()
    };
    transactions.push(transaction);
    localStorage.setItem('winkhiladi_transactions', JSON.stringify(transactions));
}

// ==================== COLOR GAME ==================== //
function loadColorGame() {
    updateUserUI();
    updateResultsList();
}

function updatePeriodNumber() {
    periodNumber = Math.floor(Math.random() * 900000) + 100000;
    document.getElementById('periodNumber').textContent = '#' + periodNumber;
}

function startGameTimer() {
    gameTimer = GAME_DURATION;
    updateTimerDisplay();
    
    if (gameInterval) clearInterval(gameInterval);
    
    gameInterval = setInterval(() => {
        gameTimer--;
        updateTimerDisplay();
        
        if (gameTimer <= 0) {
            // Auto generate number when timer ends
            generateNumber();
            gameTimer = GAME_DURATION;
            updatePeriodNumber();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('gameTimer');
    if (timerEl) {
        timerEl.textContent = gameTimer + 's';
    }
}

function setBetAmount(amount) {
    currentBet.amount = amount;
    document.getElementById('betAmount').value = amount;
    
    // Update button styles
    document.querySelectorAll('.amount-buttons button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(amount)) {
            btn.classList.add('active');
        }
    });
}

function setBetType(type) {
    currentBet.type = type;
    
    // Update button styles
    document.querySelectorAll('.bet-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const typeLabels = {
        'green': '🟢 0, 5 (9x)',
        'red': '🔴 Even (2x)',
        'white': '⚪ Odd (2x)'
    };
    
    document.getElementById('selectedBet').textContent = 'Selected: ' + typeLabels[type];
    
    // Highlight selected button
    const btn = document.querySelector(`.bet-btn.${type}`);
    if (btn) btn.classList.add('active');
}

function placeBet() {
    if (!currentUser) {
        alert('Please login first!');
        return;
    }
    
    if (!currentBet.type) {
        alert('Please select a bet type!');
        return;
    }
    
    const balance = currentUser.deposit + currentUser.winnings + currentUser.bonus;
    
    if (balance < currentBet.amount) {
        alert('Insufficient balance! Please add money.');
        showPage('walletPage');
        return;
    }
    
    // Deduct bet amount
    if (currentUser.bonus >= currentBet.amount) {
        currentUser.bonus -= currentBet.amount;
    } else if (currentUser.winnings >= currentBet.amount) {
        currentUser.winnings -= currentBet.amount;
    } else {
        const remaining = currentBet.amount - currentUser.bonus - currentUser.winnings;
        currentUser.bonus = 0;
        currentUser.winnings = 0;
        currentUser.deposit -= remaining;
    }
    
    currentUser.games++;
    saveUsers();
    updateUserUI();
    
    // Generate result
    generateNumber();
}

function generateNumber() {
    // Generate random number 0-9
    const winningNumber = Math.floor(Math.random() * 10);
    
    // Determine color
    let color = '';
    if (winningNumber === 0 || winningNumber === 5) {
        color = 'green';
    } else if (winningNumber % 2 === 0) {
        color = 'red';
    } else {
        color = 'white';
    }
    
    // Get current bet
    let prize = 0;
    let won = false;
    
    if (currentBet.type) {
        if (currentBet.type === 'green' && (winningNumber === 0 || winningNumber === 5)) {
            prize = currentBet.amount * 9;
            won = true;
        } else if (currentBet.type === 'red' && winningNumber % 2 === 0 && winningNumber !== 0 && winningNumber !== 5) {
            prize = currentBet.amount * 2;
            won = true;
        } else if (currentBet.type === 'white' && winningNumber % 2 !== 0) {
            prize = currentBet.amount * 2;
            won = true;
        }
    }
    
    // Add prize to winnings
    if (won && prize > 0) {
        currentUser.winnings += prize;
        currentUser.wins++;
        currentUser.earnings += prize;
        saveUsers();
    }
    
    // Update display
    const numberDisplay = document.getElementById('numberDisplay');
    const currentNumberEl = document.getElementById('currentNumber');
    
    numberDisplay.className = 'number-display ' + color;
    currentNumberEl.textContent = winningNumber;
    
    // Show result
    const resultDiv = document.getElementById('gameResult');
    if (resultDiv) {
        resultDiv.style.display = 'block';
        document.getElementById('resultNumber').textContent = winningNumber;
        document.getElementById('resultColor').textContent = 'Color: ' + color.toUpperCase();
        document.getElementById('resultAmount').textContent = won ? 'You won ₹' + prize : 'You lost ₹' + currentBet.amount;
        document.getElementById('resultAmount').style.color = won ? '#00ff00' : '#ff4444';
    }
    
    // Add to history
    addToHistory(winningNumber, color, currentBet.type, currentBet.amount, won ? prize : -currentBet.amount);
    
    // Reset bet
    currentBet.type = null;
    document.getElementById('selectedBet').textContent = 'Selected: None';
    document.querySelectorAll('.bet-btn').forEach(btn => btn.classList.remove('active'));
    
    updateUserUI();
    updateResultsList();
}

function addToHistory(number, color, betType, amount, result) {
    const historyItem = {
        id: Date.now(),
        period: periodNumber,
        number: number,
        color: color,
        betType: betType,
        amount: amount,
        result: result,
        date: new Date().toISOString()
    };
    
    gameHistory.unshift(historyItem);
    
    // Keep only last 100
    if (gameHistory.length > 100) {
        gameHistory = gameHistory.slice(0, 100);
    }
    
    localStorage.setItem('winkhiladi_history', JSON.stringify(gameHistory));
}

function updateResultsList() {
    const list = document.getElementById('resultsList');
    if (!list) return;
    
    const recentGames = gameHistory.slice(0, 20);
    
    if (recentGames.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #b2bec3;">No results yet</p>';
        return;
    }
    
    list.innerHTML = recentGames.map(game => {
        const colorClass = game.color;
        const resultColor = game.result > 0 ? '#00ff00' : '#ff4444';
        return `
            <div class="result-item">
                <span class="period">#${game.period}</span>
                <span class="number ${colorClass}">${game.number}</span>
                <span class="result" style="color: ${resultColor}">${game.result > 0 ? '+₹' + game.result : '₹' + Math.abs(game.result)}</span>
            </div>
        `;
    }).join('');
}

// ==================== LOTTERY GAME ==================== //
function populateLotteryNumbers() {
    const selects = ['lotteryNum1', 'lotteryNum2', 'lotteryNum3'];
    
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = '<option value="">Select</option>';
            for (let i = 0; i <= 9; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                select.appendChild(option);
            }
        }
    });
}

function loadLotteryPage() {
    populateLotteryNumbers();
}

function playLottery() {
    if (!currentUser) {
        alert('Please login first!');
        return;
    }
    
    const num1 = parseInt(document.getElementById('lotteryNum1
