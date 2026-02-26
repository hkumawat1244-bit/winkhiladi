let balance = 5000;
let currentBet = 500;
let timeLeft = 45;
let gameActive = true;
let history = [];
let selectedPayment = '';

document.addEventListener('DOMContentLoaded', initGame);

function initGame() {
    updateBalance();
    loadHistory();
    startTimer();
    showTab('lottery');
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function setAmount(amount) {
    currentBet = amount;
    document.querySelectorAll('.bet-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    updatePayout();
}

function placeBet(number) {
    if (!gameActive || balance < currentBet) {
        alert(balance < currentBet ? '❌ Low Balance!' : '⏳ Wait for next round!');
        return;
    }

    // Record bet
    saveBet(number, currentBet);
    
    balance -= currentBet;
    updateBalance();
    document.querySelector('.num-btn.active')?.classList.remove('active');
    event.target.classList.add('active');
}

function updatePayout() {
    document.getElementById('payout').textContent = `₹${currentBet * 2}`;
}

function startTimer() {
    gameActive = true;
    timeLeft = 45;
    document.getElementById('result').innerHTML = '<i class="fas fa-play"></i> Place Your Bet!';
    
    const interval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            generateResult();
        }
    }, 1000);
}

function generateResult() {
    gameActive = false;
    const result = Math.floor(Math.random() * 10).toString();
    
    // Check win
    const betNum = document.querySelector('.num-btn.active')?.textContent;
    let isWin = betNum === result;
    
    if (isWin) {
        balance += currentBet * 2;
        showWin(result);
    } else {
        showLose(result);
    }
    
    updateBalance();
    saveResult(result, isWin);
    updateHistory(result, isWin);
    
    setTimeout(startTimer, 5000);
}

function showWin(result) {
    document.getElementById('result').innerHTML = 
        `<i class="fas fa-trophy"></i> WIN! <strong>${result}</strong>`;
}

function showLose(result) {
    document.getElementById('result').innerHTML = 
        `<i class="fas fa-times"></i> ${result}`;
}

function updateBalance() {
    document.getElementById('balance').textContent = balance.toLocaleString();
}

function selectPayment(method) {
    selectedPayment = method;
    document.querySelectorAll('.method').forEach(m => m.classList.remove('active'));
    event.target.classList.add('active');
}

function processDeposit() {
    const amount = parseInt(document.getElementById('depositAmount').value);
    if (amount < 100) return alert('Min ₹100');
    
    // Simulate API call
    document.getElementById('depositStatus').innerHTML = 
        '<div style="color:#00c851;">✅ Deposited ₹' + amount + ' via ' + selectedPayment.toUpperCase() + '</div>';
    balance += amount;
    updateBalance();
    
    saveTransaction('deposit', amount);
}

function processWithdraw() {
    const amount = parseInt(document.getElementById('withdrawAmount').value);
    const upi = document.getElementById('withdrawUpi').value;
    
    if (amount < 500 || !upi) return alert('Min ₹500 + UPI ID required');
    if (amount > balance) return alert('Insufficient Balance');
    
    document.getElementById('withdrawStatus').innerHTML = 
        '<div style="color:#00c851;">✅ Withdraw Request Sent! Processing...</div>';
    balance -= amount;
    updateBalance();
    
    saveTransaction('withdraw', -amount);
}

// Local Storage Functions
function saveBet(number, amount) {
    let bets = JSON.parse(localStorage.getItem('bets') || '[]');
    bets.push({number, amount, time: new Date().toISOString()});
    localStorage.setItem('bets', JSON.stringify(bets));
}

function saveResult(result, isWin) {
    let results = JSON.parse(localStorage.getItem('results') || '[]');
    results.push({result, isWin, time: new Date().toISOString()});
    localStorage.setItem('results', JSON.stringify(results));
}

function saveTransaction(type, amount) {
    let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push({type, amount, time: new Date().toISOString()});
    localStorage.setItem('transactions', JSON.stringify(transactions));
    loadHistory();
}

function updateHistory(result, isWin) {
    let history = JSON.parse(localStorage.getItem('history') || '[]');
    history.unshift({result, isWin, time: Date.now()});
    if (history.length > 20) history.pop();
    localStorage.setItem('history', JSON.stringify(history));
}

function loadHistory() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const historyEl = document.getElementById('transactionHistory');
    historyEl.innerHTML = transactions.slice(-10).reverse().map(t => 
        `<div class="history-item ${t.type}">${t.type.toUpperCase()}: ₹${Math.abs(t.amount)}</div>`
    ).join('');
}
