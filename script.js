// ==================== WINKHILADI BACKEND ==================== //

const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== RAZORPAY SETUP ==================== //
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Your Key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET // Your Key Secret
});

// ==================== MIDDLEWARE ==================== //
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== DATABASE CONNECTION ==================== //
// For demo, using in-memory storage. For production, use MongoDB
let users = [];
let transactions = [];
let userIdCounter = 1;

// ==================== SCHEMAS ==================== //
const UserSchema = new mongoose.Schema({
    mobile: String,
    name: String,
    email: String,
    bankAccount: {
        accountNumber: String,
        ifsc: String,
        accountHolderName: String,
        bankName: String
    },
    wallet: {
        deposit: Number,
        winnings: Number,
        bonus: Number
    },
    totalContests: Number,
    totalWins: Number,
    totalEarnings: Number,
    createdAt: Date
});

const TransactionSchema = new mongoose.Schema({
    userId: Number,
    type: String, // deposit, withdraw, contest, lottery, win
    amount: Number,
    status: String, // pending, success, failed
    orderId: String,
    paymentId: String,
    description: String,
    createdAt: Date
});

// ==================== ROUTES ==================== //

// 1. Register User
app.post('/api/register', async (req, res) => {
    try {
        const { mobile, name, email } = req.body;
        
        // Check if user exists
        let user = users.find(u => u.mobile === mobile);
        
        if (user) {
            return res.json({ success: true, user, message: 'User found' });
        }
        
        // Create new user
        user = {
            id: userIdCounter++,
            mobile,
            name,
            email,
            bankAccount: null,
            wallet: {
                deposit: 100, // Welcome bonus
                winnings: 0,
                bonus: 50
            },
            totalContests: 0,
            totalWins: 0,
            totalEarnings: 0,
            createdAt: new Date()
        };
        
        users.push(user);
        
        // Add welcome bonus transaction
        transactions.push({
            id: transactions.length + 1,
            userId: user.id,
            type: 'bonus',
            amount: 50,
            status: 'success',
            description: 'Welcome Bonus',
            createdAt: new Date()
        });
        
        res.json({ success: true, user, message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Login User
app.post('/api/login', async (req, res) => {
    try {
        const { mobile } = req.body;
        
        const user = users.find(u => u.mobile === mobile);
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        // Generate OTP (demo)
        const otp = Math.floor(1000 + Math.random() * 9000);
        
        res.json({ success: true, user, otp, message: 'OTP sent' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. Create Razorpay Order (Add Money)
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, userId } = req.body;
        
        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: 'order_' + Date.now(),
            payment_capture: 1
        };
        
        const order = await razorpay.orders.create(options);
        
        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. Verify Payment
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { orderId, paymentId, amount, userId } = req.body;
        
        // Update user wallet
        const user = users.find(u => u.id === userId);
        if (user) {
            user.wallet.deposit += amount;
            
            // Add transaction
            transactions.push({
                id: transactions.length + 1,
                userId: user.id,
                type: 'deposit',
                amount: amount,
                status: 'success',
                orderId: orderId,
                paymentId: paymentId,
                description: 'Add Money via Razorpay',
                createdAt: new Date()
            });
        }
        
        res.json({ success: true, message: 'Payment verified' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 5. Add Bank Account
app.post('/api/add-bank', async (req, res) => {
    try {
        const { userId, bankDetails } = req.body;
        
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        user.bankAccount = bankDetails;
        
        res.json({ success: true, message: 'Bank account added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 6. Withdraw Money
app.post('/api/withdraw', async (req, res) => {
    try {
        const { userId, amount } = req.body;
        
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        if (!user.bankAccount) {
            return res.json({ success: false, message: 'Please add bank account first' });
        }
        
        const totalBalance = user.wallet.deposit + user.wallet.winnings;
        
        if (amount > totalBalance) {
            return res.json({ success: false, message: 'Insufficient balance' });
        }
        
        // Deduct from wallet (priority: winnings first, then deposit)
        if (amount <= user.wallet.winnings) {
            user.wallet.winnings -= amount;
        } else {
            const remaining = amount - user.wallet.winnings;
            user.wallet.winnings = 0;
            user.wallet.deposit -= remaining;
        }
        
        // Create Razorpay Payout
        const payout = await razorpay.payouts.create({
            account_number: 'YOUR_RAZORPAY_ACCOUNT_NUMBER', // Your business account
            to_user: user.bankAccount.accountNumber,
            amount: amount * 100,
            currency: 'INR',
            mode: 'IMPS',
            purpose: 'refund',
            queue_if_low_balance: true
        });
        
        // Add transaction
        transactions.push({
            id: transactions.length + 1,
            userId: user.id,
            type: 'withdraw',
            amount: amount,
            status: 'pending',
            payoutId: payout.id,
            description: 'Withdrawal to bank',
            createdAt: new Date()
        });
        
        res.json({ 
            success: true, 
            message: 'Withdrawal initiated',
            payoutId: payout.id
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 7. Get User Data
app.get('/api/user/:userId', async (req, res) => {
    try {
        const user = users.find(u => u.id === parseInt(req.params.userId));
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 8. Get Transactions
app.get('/api/transactions/:userId', async (req, res) => {
    try {
        const userTransactions = transactions.filter(
            t => t.userId === parseInt(req.params.userId)
        );
        
        res.json({ success: true, transactions: userTransactions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 9. Play Lottery
app.post('/api/lottery', async (req, res) => {
    try {
        const { userId, numbers } = req.body;
        
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        if (user.wallet.deposit + user.wallet.winnings < 10) {
            return res.json({ success: false, message: 'Insufficient balance' });
        }
        
        // Deduct entry fee
        if (user.wallet.winnings >= 10) {
            user.wallet.winnings -= 10;
        } else {
            const remaining = 10 - user.wallet.winnings;
            user.wallet.winnings = 0;
            user.wallet.deposit -= remaining;
        }
        
        // Generate winning numbers
        const winningNumbers = [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10)
        ];
        
        // Calculate prize
        let matches = 0;
        numbers.forEach(num => {
            if (winningNumbers.includes(num)) matches++;
        });
        
        let prize = 0;
        if (matches === 3) prize = 1000;
        else if (matches === 2) prize = 100;
        else if (matches === 1) prize = 10;
        
        // Add prize to winnings
        user.wallet.winnings += prize;
        user.totalEarnings += prize;
        
        if (prize > 0) {
            user.totalWins++;
        }
        
        // Add transaction
        transactions.push({
            id: transactions.length + 1,
            userId: user.id,
            type: 'lottery',
            amount: -10,
            status: 'success',
            description: 'Lottery Entry',
            createdAt: new Date()
        });
        
        if (prize > 0) {
            transactions.push({
                id: transactions.length + 1,
                userId: user.id,
                type: 'win',
                amount: prize,
                status: 'success',
                description: `Lottery Win (${matches} matches)`,
                createdAt: new Date()
            });
        }
        
        res.json({
            success: true,
            winningNumbers,
            matches,
            prize,
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==================== START SERVER ==================== //
app.listen(PORT, () => {
    console.log(`🏆 WinKhiladi Server running on port ${PORT}`);
    console.log(`📱 API Base URL: http://localhost:${PORT}/api`);
});
