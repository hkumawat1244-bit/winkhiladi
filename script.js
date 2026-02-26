class NavigationLock {
    constructor(options = {}) {
        this.timeLeft = options.time || 30;
        this.timerElement = document.getElementById('timer');
        this.overlay = document.getElementById('navigationLockOverlay');
        this.isLocked = false;
        
        this.init();
    }

    init() {
        this.lockNavigation();
        this.startCountdown();
    }

    lockNavigation() {
        this.isLocked = true;
        document.body.classList.add('navigation-locked');
        document.body.style.pointerEvents = 'none';
        this.overlay.style.pointerEvents = 'all';
        this.overlay.style.display = 'flex';

        // Multiple navigation prevention methods
        this.attachEventListeners();
    }

    unlockNavigation() {
        this.isLocked = false;
        document.body.classList.remove('navigation-locked');
        document.body.style.pointerEvents = 'auto';
        this.overlay.style.display = 'none';
        
        this.detachEventListeners();
    }

    attachEventListeners() {
        // Mouse events
        document.addEventListener('click', this.preventAll);
        document.addEventListener('contextmenu', this.preventAll);
        document.addEventListener('mousedown', this.preventAll);
        
        // Keyboard events
        document.addEventListener('keydown', this.preventKeys);
        
        // Form events
        document.addEventListener('submit', this.preventAll);
        
        // Touch events (mobile)
        document.addEventListener('touchstart', this.preventAll);
        document.addEventListener('touchmove', this.preventAll);
    }

    detachEventListeners() {
        document.removeEventListener('click', this.preventAll);
        document.removeEventListener('contextmenu', this.preventAll);
        document.removeEventListener('mousedown', this.preventAll);
        document.removeEventListener('keydown', this.preventKeys);
        document.removeEventListener('submit', this.preventAll);
        document.removeEventListener('touchstart', this.preventAll);
        document.removeEventListener('touchmove', this.preventAll);
    }

    preventAll = (e) => {
        if (this.isLocked) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }

    preventKeys = (e) => {
        if (!this.isLocked) return;

        const blockedKeys = [
            'F5', 'F12', // Refresh, DevTools
            'Backspace', // Back navigation
            'Escape'     // Sometimes used for navigation
        ];

        const ctrlCombinations = [
            'r', 'n', 'w', 't', // Ctrl+R, Ctrl+N, Ctrl+W, Ctrl+T
            'F5'               // Ctrl+F5
        ];

        if (blockedKeys.includes(e.key) || 
            (e.ctrlKey && ctrlCombinations.includes(e.key.toLowerCase())) ||
            (e.metaKey && ctrlCombinations.includes(e.key.toLowerCase()))) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    startCountdown() {
        const countdown = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;
            
            document.querySelector('.timer-status').textContent = 
                this.timeLeft > 1 ? 'seconds remaining...' : 'Unlocking now!';

            if (this.timeLeft <= 0) {
                clearInterval(countdown);
                this.unlockNavigation();
            }
        }, 1000);
    }
}

// Usage: Page load pe automatically start
document.addEventListener('DOMContentLoaded', () => {
    new NavigationLock({ time: 30 });
});
