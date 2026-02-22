// WinKhiladi - JavaScript Functionality

// Match Data
const matches = {
    live: [
        {
            id: 1,
            team1: { name: 'IND', logo: '🇮🇳' },
            team2: { name: 'AUS', logo: '🇦🇺' },
            score1: '287/4',
            score2: '156/2',
            overs1: '42.3',
            overs2: '28.1',
            status: 'IND need 132 runs in 75 balls'
        }
    ],
    upcoming: [
        {
            id: 2,
            team1: { name: 'IND', logo: '🇮🇳' },
            team2: { name: 'PAK', logo: '🇵🇰' },
            date: '15 Jan 2025',
            time: '7:00 PM',
            contests: 1250
        },
        {
            id: 3,
            team1: { name: 'ENG', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
            team2: { name: 'NZ', logo: '🇳🇿' },
            date: '16 Jan 2025',
            time: '3:30 PM',
            contests: 890
        },
        {
            id: 4,
            team1: { name: 'SA', logo: '🇿🇦' },
            team2: { name: 'WI', logo: '🇧🇩' },
            date: '17 Jan 2025',
            time: '8:00 PM',
            contests: 650
        }
    ]
};

// Contest Data
const contests = [
    {
        id: 1,
        type: 'Mega',
        guaranteed: true,
        prize: 500000,
        entry: 49,
        spots: 10000,
        joined: 7842,
        winner: 2500
    },
    {
        id: 2,
        type: 'Premium',
        guaranteed: true,
        prize: 100000,
        entry: 199,
        spots: 1000,
        joined: 756,
        winner: 300
    },
    {
        id: 3,
        type: 'Head to Head',
        guaranteed: false,
        prize: 100,
        entry: 10,
        spots: 2,
        joined: 1,
        winner: 1
    },
    {
        id: 4,
        type: 'Practice',
        guaranteed: false,
        prize: 0,
        entry: 0,
        spots: 100,
        joined: 45,
        winner: 10
    },
    {
        id: 5,
        type: 'Grand',
        guaranteed: true,
        prize: 1000000,
        entry: 999,
        spots: 2000,
        joined: 1567,
        winner: 500
    },
    {
        id: 6,
        type: 'Daily',
        guaranteed: true,
        prize: 25000,
        entry: 29,
        spots: 5000,
        joined: 3421,
        winner: 1000
    }
];

// Leaderboard Data
const leaderboard = [
    { rank: 1, name: 'Rahul Sharma', avatar: 'RS', points: 2845, team: 'Super11' },
    { rank: 2, name: 'Amit Patel', avatar: 'AP', points: 2720, team: 'CricketKing' },
    { rank: 3, name: 'Vikram Singh', avatar: 'VS', points: 2590, team: 'Winner11' },
    { rank: 4, name: 'Suresh Kumar', avatar: 'SK', points: 2450, team: 'FantasyPro' },
    { rank: 5, name: 'Rajesh Gupta', avatar: 'RG', points: 2310, team: 'TeamIndia' },
    { rank: 6, name: 'Ankit Sharma', avatar: 'AS', points: 2180, team: 'Champions' },
    { rank: 7, name: 'Mohit Verma', avatar: 'MV', points: 2050, team: 'Victory11' },
    { rank: 8, name: 'Deepak Yadav', avatar: 'DY', points: 1920, team: 'DreamTeam' },
    { rank: 9, name: 'Praveen Kumar', avatar: 'PK', points: 1790, team: 'Star11' },
    { rank: 10, name: 'Manish Singh', avatar: 'MS', points: 1660, team: 'Royal11' }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadLiveMatches();
    loadUpcomingMatches();
    loadContests();
    loadLeaderboard();
    setupSmoothScrolling();
});

// Load Live Matches
function loadLiveMatches() {
    const container = document.getElementById('liveMatches');
    
    if (matches.live.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray);">No live matches currently</p>';
        return;
    }
    
    let html = '';
    matches.live.forEach(match => {
        html += `
            <div class="match-card">
                <div class="match-status">
                    <span class="status-badge status-live">🔴 LIVE</span>
                    <span class="status-badge">${match.status}</span>
                </div>
                <div class="match-teams">
                    <div class="team">
                        <div class="team-logo">${match.team1.logo}</div>
                        <div class="team-name">${match.team1.name}</div>
                        <div style="font-size: 24px; font-weight: bold; color: var(--secondary);">${match.score1}</div>
                        <div style="color: var(--gray);">(${match.overs1} ov)</div>
                    </div>
                    <span class="vs">VS</span>
                    <div class="team">
                        <div class="team-logo">${match.team2.logo}</div>
                        <div class="team-name">${match.team2.name}</div>
                        <div style="font-size: 24px; font-weight: bold; color: var(--secondary);">${match.score2}</div>
                        <div style="color: var(--gray);">(${match.overs2} ov)</div>
                    </div>
                </div>
                <div class="match-info">
                    <span class="match-date">🏏 T20 International</span>
                    <button class="entry-btn" onclick="alert('Create your team now!')">Create Team</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load Upcoming Matches
function loadUpcomingMatches() {
    const container = document.getElementById('upcomingMatches');
    
    let html = '';
    matches.upcoming.forEach(match => {
        html += `
            <div class="match-card">
                <div class="match-status">
                    <span class="status-badge status-upcoming">📅 UPCOMING</span>
                    <span class="status-badge">${match.date} • ${match.time}</span>
                </div>
                <div class="match-teams">
                    <div class="team">
                        <div class="team-logo">${match.team1.logo}</div>
                        <div class="team-name">${match.team1.name}</div>
                    </div>
                    <span class="vs">VS</span>
                    <div class="team">
                        <div class="team-logo">${match.team2.logo}</div>
                        <div class="team-name">${match.team2.name}</div>
                    </div>
                </div>
                <div class="match-info">
                    <span class="contest-count">🏆 ${match.contests} Contests</span>
                    <button class="entry-btn" onclick="alert('Contests will open soon!')">View Contests</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load Contests
function loadContests() {
    const container = document.getElementById('featuredContests');
    
    let html = '';
    contests.forEach(contest => {
        const spotsLeft = contest.spots - contest.joined;
        const prizeFormatted = formatCurrency(contest.prize);
        
        html += `
            <div class="contest-card">
                <div class="contest-header">
                    <span class="contest-type">${contest.type}</span>
                    ${contest.guaranteed ? '<span class="guaranteed">✓ Guaranteed</span>' : ''}
                </div>
                <div class="contest-prize">
                    <div class="prize-label">Total Prize Pool</div>
                    <div class="prize-amount">${prizeFormatted}</div>
                </div>
                <div class="contest-details">
                    <div class="detail-item">
                        <div class="detail-value">₹${contest.entry}</div>
                        <div class="detail-label">Entry</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${contest.spots}</div>
                        <div class="detail-label">Spots</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${contest.winner}</div>
                        <div class="detail-label">Winners</div>
                    </div>
                </div>
                <div class="contest-footer">
                    <span class="spots-left">${spotsLeft} spots left</span>
                    <button class="entry-btn" onclick="joinContest(${contest.id})">Join Now</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load Leaderboard
function loadLeaderboard() {
    const container = document.getElementById('leaderboard');
    
    let html = '';
    leaderboard.forEach((user, index) => {
        const rankClass = user.rank <= 3 ? `rank-${user.rank}` : '';
        
        html += `
            <div class="leaderboard-item">
                <span class="rank ${rankClass}">#${user.rank}</span>
                <div class="user-avatar">${user.avatar}</div>
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-team">${user.team}</div>
                </div>
                <div class="user-points">${user.points.toLocaleString()} pts</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Helper function to format currency
function formatCurrency(amount) {
    if (amount >= 10000000) {
        return '₹' + (amount / 10000000).toFixed(1) + 'Cr';
    } else if (amount >= 100000) {
        return '₹' + (amount / 100000).toFixed(1) + 'L';
    } else if (amount >= 1000) {
        return '₹' + (amount / 1000).toFixed(1) + 'K';
    }
    return '₹' + amount;
}

// Join Contest function
function joinContest(contestId) {
    const contest = contests.find(c => c.id === contestId);
    if (contest) {
        if (contest.entry === 0) {
            alert('Joining free contest...');
        } else {
            alert(`Entry fee: ₹${contest.entry}\nPrize: ${formatCurrency(contest.prize)}\n\nLogin to join this contest!`);
        }
    }
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Alert function (placeholder for future functionality)
function alert(message) {
    // Create custom alert
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        padding: 30px 50px;
        border-radius: 20px;
        color: white;
        font-size: 18px;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s ease;
    `;
    
    alertDiv.innerHTML = `
        <div style="font-size: 40px; margin-bottom: 15px;">🏆</div>
        <div>${message}</div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 30px;
            border: none;
            border-radius: 20px;
            background: white;
            color: var(--primary);
            font-weight: bold;
            cursor: pointer;
        ">OK</button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Add animation keyframes
    if (!document.getElementById('alertStyles')) {
        const style = document.createElement('style');
        style.id = 'alertStyles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}
