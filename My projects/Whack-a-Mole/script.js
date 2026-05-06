/**
 * WHACK-A-MOLE GAME
 * A fully functional browser-based game with modern animations and gameplay mechanics
 * 
 * Features:
 * - 8x6 grid of holes with random mole spawning
 * - Progressive difficulty (decreasing mole visibility time)
 * - Score tracking with combo multiplier
 * - 60-second gameplay timer
 * - localStorage for high scores
 * - Sound effects with mute toggle
 * - Touch support for mobile devices
 * - Smooth animations and visual feedback
 */

// ===================================
// GAME STATE & CONFIGURATION
// ===================================

const gameConfig = {
    ROWS: 6,
    COLS: 8,
    GAME_DURATION: 60, // seconds
    INITIAL_MOLE_DURATION: 1000, // milliseconds
    MIN_MOLE_DURATION: 300, // milliseconds
    SPAWN_INTERVAL_START: 800, // milliseconds
    MIN_SPAWN_INTERVAL: 400, // milliseconds
    COMBO_DECAY_TIME: 500, // milliseconds between hits to maintain combo
    FAKE_MOLE_CHANCE: 0.1, // 10% chance of fake mole
    FAKE_MOLE_PENALTY: 5, // points deducted for hitting fake mole
};

let gameState = {
    isRunning: false,
    score: 0,
    highScore: 0,
    combo: 0,
    lastHitTime: 0,
    timeRemaining: gameConfig.GAME_DURATION,
    activeMoleId: null,
    soundEnabled: true,
    lastSpawnTime: 0,
    difficulty: 0, // 0-100 based on time elapsed
};

let gameTimers = {
    gameTimer: null,
    moleTimer: null,
    spawnTimer: null,
};

// ===================================
// DOM ELEMENTS & INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDOM();
    gameState.highScore = loadHighScore();
    setupEventListeners();
    createGameBoard();
    updateUI();
});

/**
 * Initialize all DOM elements and cache references
 */
function initializeDOM() {
    window.DOM = {
        gameBoard: document.getElementById('gameBoard'),
        scoreDisplay: document.getElementById('score'),
        highScoreDisplay: document.getElementById('highScore'),
        comboDisplay: document.getElementById('combo'),
        timerDisplay: document.getElementById('timer'),
        startBtn: document.getElementById('startBtn'),
        restartBtn: document.getElementById('restartBtn'),
        soundBtn: document.getElementById('soundBtn'),
        statusMessage: document.getElementById('statusMessage'),
        hitSound: document.getElementById('hitSound'),
        missSound: document.getElementById('missSound'),
        gameOverSound: document.getElementById('gameOverSound'),
    };
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    DOM.startBtn.addEventListener('click', startGame);
    DOM.restartBtn.addEventListener('click', restartGame);
    DOM.soundBtn.addEventListener('click', toggleSound);
    
    // Event delegation for hole clicks
    DOM.gameBoard.addEventListener('click', handleHoleClick);
    
    // Touch support for mobile
    DOM.gameBoard.addEventListener('touchstart', handleTouchStart, { passive: true });
}

/**
 * Create the 8x6 game board with holes
 */
function createGameBoard() {
    DOM.gameBoard.innerHTML = '';
    const totalHoles = gameConfig.ROWS * gameConfig.COLS;

    for (let i = 0; i < totalHoles; i++) {
        const hole = document.createElement('div');
        hole.className = 'hole';
        hole.id = `hole-${i}`;
        hole.setAttribute('data-hole-id', i);
        DOM.gameBoard.appendChild(hole);
    }
}

// ===================================
// GAME LIFECYCLE
// ===================================

/**
 * Start the game
 */
function startGame() {
    if (gameState.isRunning) return;

    gameState.isRunning = true;
    gameState.score = 0;
    gameState.combo = 0;
    gameState.timeRemaining = gameConfig.GAME_DURATION;
    gameState.lastHitTime = 0;
    gameState.activeMoleId = null;

    DOM.startBtn.disabled = true;
    DOM.restartBtn.disabled = false;

    updateUI();
    setStatusMessage('Game started!', 'success');

    // Start game timer (updates every 100ms for smooth countdown)
    gameTimers.gameTimer = setInterval(updateGameTimer, 100);

    // Start spawning moles
    spawnMole();
}

/**
 * Restart the game
 */
function restartGame() {
    stopGame();
    startGame();
}

/**
 * Stop the game
 */
function stopGame() {
    gameState.isRunning = false;

    // Clear all timers
    clearInterval(gameTimers.gameTimer);
    clearTimeout(gameTimers.moleTimer);
    clearTimeout(gameTimers.spawnTimer);

    // Hide active mole if exists
    if (gameState.activeMoleId !== null) {
        hideMole(gameState.activeMoleId, true);
    }

    DOM.startBtn.disabled = false;
    DOM.restartBtn.disabled = true;
}

/**
 * Update game timer and check for game over
 */
function updateGameTimer() {
    if (!gameState.isRunning) return;

    gameState.timeRemaining -= 0.1;
    DOM.timerDisplay.textContent = Math.ceil(gameState.timeRemaining);

    // Calculate difficulty (0-100)
    gameState.difficulty = ((gameConfig.GAME_DURATION - gameState.timeRemaining) / 
                           gameConfig.GAME_DURATION) * 100;

    if (gameState.timeRemaining <= 0) {
        endGame();
    }
}

/**
 * End the game
 */
function endGame() {
    stopGame();

    // Save high score
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        saveHighScore(gameState.highScore);
        setStatusMessage(
            `🎉 Game Over! Final Score: ${gameState.score} | New High Score! 🏆`,
            'game-over'
        );
    } else {
        setStatusMessage(
            `Game Over! Final Score: ${gameState.score} | High Score: ${gameState.highScore}`,
            'game-over'
        );
    }

    playSound('gameOverSound');
    updateUI();
}

// ===================================
// MOLE SPAWNING & MANAGEMENT
// ===================================

/**
 * Spawn a mole in a random hole
 */
function spawnMole() {
    if (!gameState.isRunning) return;

    // Hide previous mole if still visible
    if (gameState.activeMoleId !== null) {
        hideMole(gameState.activeMoleId, true);
    }

    // Get a random hole that wasn't the last one
    let randomIds = [];
    for (let i = 0; i < gameConfig.ROWS * gameConfig.COLS; i++) {
        if (i !== gameState.activeMoleId) {
            randomIds.push(i);
        }
    }

    const moleId = randomIds[Math.floor(Math.random() * randomIds.length)];
    gameState.activeMoleId = moleId;

    const hole = document.getElementById(`hole-${moleId}`);
    const isFakeMole = Math.random() < gameConfig.FAKE_MOLE_CHANCE;

    // Create mole element
    const mole = document.createElement('div');
    mole.className = isFakeMole ? 'mole fake' : 'mole';
    mole.id = `mole-${moleId}`;

    // Add mole features (eyes and mouth)
    const pupils = document.createElement('div');
    pupils.className = 'mole-pupils';
    mole.appendChild(pupils);

    const mouth = document.createElement('div');
    mouth.className = 'mole-mouth';
    mole.appendChild(mouth);

    hole.appendChild(mole);

    // Calculate dynamic mole duration based on difficulty
    const moleDuration = calculateMoleDuration();

    // Hide mole after duration
    gameTimers.moleTimer = setTimeout(() => {
        hideMole(moleId);
    }, moleDuration);

    // Schedule next spawn
    scheduleNextSpawn();
}

/**
 * Calculate mole visibility duration based on game progress
 * Duration decreases as difficulty increases
 */
function calculateMoleDuration() {
    const minDuration = gameConfig.MIN_MOLE_DURATION;
    const maxDuration = gameConfig.INITIAL_MOLE_DURATION;
    
    const durationReduction = (gameState.difficulty / 100) * (maxDuration - minDuration);
    return Math.max(minDuration, maxDuration - durationReduction);
}

/**
 * Calculate spawn interval based on game progress
 * Spawn speed increases as difficulty increases
 */
function calculateSpawnInterval() {
    const minInterval = gameConfig.MIN_SPAWN_INTERVAL;
    const maxInterval = gameConfig.SPAWN_INTERVAL_START;
    
    const intervalReduction = (gameState.difficulty / 100) * (maxInterval - minInterval);
    return Math.max(minInterval, maxInterval - intervalReduction);
}

/**
 * Schedule the next mole spawn
 */
function scheduleNextSpawn() {
    if (!gameState.isRunning) return;

    const spawnInterval = calculateSpawnInterval();
    
    gameTimers.spawnTimer = setTimeout(() => {
        if (gameState.isRunning) {
            spawnMole();
        }
    }, spawnInterval);
}

/**
 * Hide a mole from a specific hole
 * @param {number} holeId - The ID of the hole
 * @param {boolean} immediate - If true, skip animation
 */
function hideMole(holeId, immediate = false) {
    const mole = document.getElementById(`mole-${holeId}`);
    
    if (!mole) return;

    if (immediate) {
        mole.remove();
    } else {
        mole.classList.add('hiding');
        setTimeout(() => {
            if (mole.parentElement) {
                mole.remove();
            }
        }, 300); // Duration of popDown animation
    }

    if (gameState.activeMoleId === holeId) {
        gameState.activeMoleId = null;
    }
}

// ===================================
// CLICK HANDLING
// ===================================

/**
 * Handle hole click event
 * @param {Event} event - Click event
 */
function handleHoleClick(event) {
    if (!gameState.isRunning) return;

    const hole = event.target.closest('.hole');
    if (!hole) return;

    const holeId = parseInt(hole.getAttribute('data-hole-id'));
    const mole = document.getElementById(`mole-${holeId}`);

    if (mole) {
        // Clicked on a mole
        const isFakeMole = mole.classList.contains('fake');
        hitMole(mole, holeId, isFakeMole);
    } else {
        // Clicked on empty hole
        missClick(holeId);
    }
}

/**
 * Handle touch start event for mobile
 * @param {TouchEvent} event - Touch event
 */
function handleTouchStart(event) {
    if (!gameState.isRunning) return;

    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const hole = element?.closest('.hole');

    if (!hole) return;

    const holeId = parseInt(hole.getAttribute('data-hole-id'));
    const mole = document.getElementById(`mole-${holeId}`);

    if (mole) {
        const isFakeMole = mole.classList.contains('fake');
        hitMole(mole, holeId, isFakeMole);
    } else {
        missClick(holeId);
    }
}

/**
 * Handle hitting a mole
 * @param {HTMLElement} mole - The mole element
 * @param {number} holeId - The hole ID
 * @param {boolean} isFakeMole - Whether it's a fake mole
 */
function hitMole(mole, holeId, isFakeMole) {
    // Prevent double-clicking the same mole
    if (mole.classList.contains('hit')) return;

    mole.classList.add('hit');

    if (isFakeMole) {
        // Hit a fake mole - lose points
        gameState.score = Math.max(0, gameState.score - gameConfig.FAKE_MOLE_PENALTY);
        gameState.combo = 0;
    } else {
        // Hit a real mole
        const now = Date.now();
        const timeSinceLastHit = now - gameState.lastHitTime;

        // Update combo (if within decay time)
        if (timeSinceLastHit <= gameConfig.COMBO_DECAY_TIME) {
            gameState.combo++;
        } else {
            gameState.combo = 1;
        }

        gameState.lastHitTime = now;

        // Calculate points with combo multiplier
        const basePoints = 1;
        const comboBonus = Math.floor(gameState.combo / 3); // 1 extra point every 3 hits
        gameState.score += basePoints + comboBonus;
    }

    playSound('hitSound');
    updateUI();

    // Hide mole after hit animation
    setTimeout(() => {
        hideMole(holeId);
    }, 300);
}

/**
 * Handle clicking on an empty hole
 * @param {number} holeId - The hole ID
 */
function missClick(holeId) {
    const hole = document.getElementById(`hole-${holeId}`);
    hole.classList.add('miss-click');

    // Reset combo on miss
    gameState.combo = 0;

    playSound('missSound');
    updateUI();

    // Remove animation class
    setTimeout(() => {
        hole.classList.remove('miss-click');
    }, 400);
}

// ===================================
// UI UPDATES
// ===================================

/**
 * Update all UI displays
 */
function updateUI() {
    DOM.scoreDisplay.textContent = gameState.score;
    DOM.highScoreDisplay.textContent = gameState.highScore;
    DOM.comboDisplay.textContent = gameState.combo;
    DOM.timerDisplay.textContent = Math.ceil(gameState.timeRemaining);

    // Add update animation
    animateValueUpdate(DOM.scoreDisplay);
    if (gameState.combo > 0) {
        animateValueUpdate(DOM.comboDisplay);
    }
}

/**
 * Animate value updates
 * @param {HTMLElement} element - The element to animate
 */
function animateValueUpdate(element) {
    element.classList.add('update');
    setTimeout(() => {
        element.classList.remove('update');
    }, 300);
}

/**
 * Set status message
 * @param {string} message - The message to display
 * @param {string} type - The message type (default, success, game-over)
 */
function setStatusMessage(message, type = 'default') {
    DOM.statusMessage.textContent = message;
    DOM.statusMessage.className = 'status-message';
    if (type !== 'default') {
        DOM.statusMessage.classList.add(type);
    }
}

// ===================================
// SOUND EFFECTS
// ===================================

/**
 * Initialize Web Audio API for fallback sound generation
 */
let audioContext = null;
function getAudioContext() {
    if (!audioContext) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }
    return audioContext;
}

/**
 * Play a sound effect using Web Audio API (fallback)
 * @param {string} type - The type of sound ('hit', 'miss', 'gameOver')
 */
function playWebAudioSound(type) {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        if (type === 'hit') {
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.setValueAtTime(600, now + 0.05);
        } else if (type === 'miss') {
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.setValueAtTime(200, now + 0.1);
        } else if (type === 'gameOver') {
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.setValueAtTime(300, now + 0.05);
            osc.frequency.setValueAtTime(200, now + 0.1);
        }

        osc.start(now);
        osc.stop(now + 0.1);
    } catch (e) {
        console.warn('Could not play Web Audio sound:', e);
    }
}

/**
 * Play a sound effect
 * @param {string} soundId - The ID of the audio element
 */
function playSound(soundId) {
    if (!gameState.soundEnabled) return;

    const audio = DOM[soundId];
    if (audio) {
        try {
            audio.currentTime = 0;
            audio.play().catch(() => {
                // Fallback to Web Audio API if audio element fails
                const type = soundId.replace('Sound', '');
                playWebAudioSound(type);
            });
        } catch (e) {
            // Fallback to Web Audio API
            const type = soundId.replace('Sound', '');
            playWebAudioSound(type);
        }
    }
}

/**
 * Toggle sound on/off
 */
function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    DOM.soundBtn.textContent = gameState.soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF';
    DOM.soundBtn.classList.toggle('muted');
    
    if (gameState.soundEnabled) {
        setStatusMessage('Sound enabled', 'success');
    } else {
        setStatusMessage('Sound disabled');
    }
}

// ===================================
// LOCAL STORAGE
// ===================================

/**
 * Load high score from localStorage
 * @returns {number} The saved high score or 0
 */
function loadHighScore() {
    const saved = localStorage.getItem('whackAMoleHighScore');
    return saved ? parseInt(saved, 10) : 0;
}

/**
 * Save high score to localStorage
 * @param {number} score - The score to save
 */
function saveHighScore(score) {
    localStorage.setItem('whackAMoleHighScore', score.toString());
}

// ===================================
// PAGE UNLOAD HANDLER
// ===================================

/**
 * Clean up on page unload
 */
window.addEventListener('beforeunload', () => {
    stopGame();
    clearInterval(gameTimers.gameTimer);
    clearTimeout(gameTimers.moleTimer);
    clearTimeout(gameTimers.spawnTimer);
});
