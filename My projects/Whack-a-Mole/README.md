# 🔨 Whack-a-Mole Game

A fully functional, modern browser-based Whack-a-Mole game built with vanilla HTML, CSS, and JavaScript. Features smooth animations, progressive difficulty, and a polished user experience.

## 🎮 Features

### Core Gameplay
- **8×6 Grid of Holes**: 48 interactive holes displayed in a responsive grid layout
- **Random Mole Spawning**: Moles appear randomly, never in the same hole consecutively
- **Progressive Difficulty**: 
  - Mole visibility time decreases from 1000ms to 300ms
  - Spawn speed increases from 800ms to 400ms
  - Difficulty scales over the 60-second game duration
- **60-Second Gameplay**: Complete game within a minute
- **Score Counter**: Track your hits in real-time
- **Combo Multiplier**: Build combos for consecutive fast hits (earn bonus points)

### Visual Experience
- **Smooth Animations**: 
  - Pop-up animation when mole appears (0.3s)
  - Pop-down animation when mole disappears (0.3s)
  - Hit animation with brightness flash (0.4s)
  - Miss click shake animation (0.4s)
- **Visual Feedback**:
  - Mole has animated eyes and mouth
  - Fake moles are distinctly styled in purple
  - Hit moles flash yellow before disappearing
  - Click feedback with hole animations
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

### Bonus Features
- **Fake Moles** (10% chance): Hit a fake mole to lose 5 points and break your combo
- **Combo System**: Earn bonus points for consecutive hits within 500ms
- **High Score Tracking**: Automatically saves your best score using localStorage
- **Sound Effects**: Mute/unmute button with feedback for hits, misses, and game-over
- **Touch Support**: Fully playable on mobile and tablet devices with touch controls
- **Persistent UI**: High score persists across browser sessions

## 🚀 Getting Started

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### How to Play
1. **Open**: Open `index.html` in your web browser
2. **Start**: Click the "Start Game" button
3. **Play**: Click on moles as they appear to score points
4. **Avoid Empty Holes**: Clicking empty holes breaks your combo
5. **Beat Fake Moles**: Avoid purple fake moles (they cost 5 points!)
6. **Time**: You have 60 seconds to maximize your score

### Controls
- **Mouse/Trackpad**: Click on moles
- **Touch**: Tap on moles (mobile/tablet)
- **Sound Toggle**: Click "🔊 Sound" button to mute/unmute
- **Restart**: Click "Restart" button after game ends

## 📊 Game Mechanics

### Scoring
```
Real Mole Hit: 1 point (+ combo bonus every 3 consecutive hits)
Fake Mole Hit: -5 points
Miss Click: No points, combo resets
```

### Difficulty Progression
```
Time Elapsed    Mole Duration    Spawn Interval
0s             1000ms          800ms
30s            650ms           600ms
60s (end)      300ms           400ms
```

### Combo System
- Maintain combo by hitting real moles within 500ms of the previous hit
- Break combo by: hitting a fake mole, missing (clicking empty hole), or waiting too long
- Earn bonus points: +1 point every 3 consecutive hits

## 📁 Project Structure

```
Whack-a-Mole/
├── index.html      # Game HTML structure
├── style.css       # Styling and animations
├── script.js       # Game logic and mechanics
└── README.md       # This file
```

## 🎨 Customization

### Change Game Duration
In `script.js`, modify:
```javascript
const gameConfig = {
    GAME_DURATION: 60, // Change to desired seconds
    // ... other settings
};
```

### Adjust Difficulty Scaling
```javascript
gameConfig: {
    INITIAL_MOLE_DURATION: 1000, // Starting visibility time
    MIN_MOLE_DURATION: 300,      // Ending visibility time
    SPAWN_INTERVAL_START: 800,   // Initial spawn interval
    MIN_SPAWN_INTERVAL: 400,     // Final spawn interval
};
```

### Modify Fake Mole Settings
```javascript
FAKE_MOLE_CHANCE: 0.1,      // 10% chance of fake mole
FAKE_MOLE_PENALTY: 5,       // Points deducted for hitting fake
```

### Adjust Grid Size
In `script.js`:
```javascript
const gameConfig = {
    ROWS: 6,  // Change to desired rows
    COLS: 8,  // Change to desired columns
};
```

## 🔧 Technical Details

### Animation Performance
- CSS transitions used for maximum performance
- No layout thrashing through optimized DOM updates
- GPU-accelerated transforms for smooth animations
- Efficient event delegation with single listener

### Event Handling
- Event delegation on game board for click events
- Touch event support with `touchstart` listeners
- Passive event listeners for better scrolling performance
- Proper cleanup on page unload

### State Management
- Centralized `gameState` object for game data
- `gameConfig` for configuration constants
- `gameTimers` object for tracking active timers
- Proper timer cleanup to prevent memory leaks

### Browser Compatibility
- Works in all modern browsers
- No external dependencies
- localStorage support for persistence
- CSS Grid for responsive layout

## 🎯 Code Quality

- **Modular Functions**: Each function has a single responsibility
- **Clear Comments**: Code sections are well-documented
- **Variable Naming**: Descriptive names following camelCase convention
- **Memory Management**: Proper cleanup of timers and listeners
- **Mobile-First**: Responsive CSS with media queries

## 📱 Responsive Breakpoints

- **Desktop** (>1024px): 8 columns, full features
- **Tablet** (768px-1024px): 6 columns
- **Mobile** (480px-768px): 4 columns
- **Small Mobile** (<480px): 3 columns

## 🎵 Sound Specifications

The game includes sound effects for:
- **Hit Sound**: When mole is clicked
- **Miss Sound**: When empty hole is clicked
- **Game Over Sound**: When game ends

Note: Audio uses embedded base64 data, no external files needed.

## 💾 Local Storage

High score is automatically saved to browser's localStorage:
```
Key: 'whackAMoleHighScore'
Type: String (integer value)
Persistence: Until manually cleared
```

## 🐛 Known Limitations

- Sound might not play on first interaction due to browser autoplay policies
- On very slow devices, animations might not reach 60fps
- Touch events don't trigger on desktop browsers (use mouse instead)

## 🚀 Future Enhancements

Possible features to add:
- [ ] Leaderboard system
- [ ] Different game modes (Time Attack, Endless, etc.)
- [ ] Power-ups (freeze time, double points, etc.)
- [ ] Character skins for moles
- [ ] Background music
- [ ] Difficulty multipliers
- [ ] Achievement badges
- [ ] Share score on social media

## 📄 License

Free to use and modify for personal or educational purposes.

## 👨‍💻 Author

Created with ❤️ as a comprehensive example of vanilla JavaScript game development.

---

**Enjoy playing! Good luck beating your high score! 🎮🔨**
