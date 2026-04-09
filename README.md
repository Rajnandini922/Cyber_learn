# Cyber_learn
# CyberLearn – Cybersecurity Learning Web App

A fun, interactive platform for beginners to learn cybersecurity terms and concepts through games, quizzes, and gamified learning experiences.

## 🎮 Features

### Core Gameplay
- **5 Interactive Games:**
  - 🎯 **Quiz Time** – Timed multiple-choice questions (3 difficulty levels)
  - 🧩 **Puzzle Match** – Drag-and-drop term-to-definition matching
  - 🔍 **Spot the Attack** – Identify real-world attack scenarios
  - 🧠 **Memory Match** – Flip cards to find matching term pairs
  - 📇 **Flashcards** – Study mode with interactive card flipping

### User Experience
- **Landing Page** – Name entry screen with persistent localStorage
- **Dashboard** – Game selection, progress overview, score tracking
- **Leaderboard** – Rank system with mock players and real user scores
- **Resources** – Curated links to cybersecurity learning materials
- **Contact** – Feedback form (local demo storage)

### Design & Layout
- ✨ **Split-Screen UI** – Visual/avatar left, content right (responsive)
- 🎨 **Pastel Color Palette** – Soft blues, teals, pinks, purples
- 📱 **Fully Responsive** – Mobile, tablet, desktop optimized
- ♿ **Accessible** – ARIA labels, keyboard navigation, semantic HTML
- 🎬 **Smooth Animations** – Framer Motion transitions, hover effects

### Technical Features
- 💾 **LocalStorage Progress** – Games, levels, scores, user name saved
- 🔐 **Level Unlock System** – Pass a level to unlock the next
- 📊 **Real-Time Stats** – XP, rank, level progression
- 🎯 **Difficulty Tiers** – Beginner (60%), Intermediate (70%), Expert (80%)
- ⚡ **Fast & Optimized** – Vite bundling, lazy-loaded routes

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation with mobile menu
│   ├── GameSplitScreen.jsx     # Reusable split-screen layout
│   ├── FlashCards.jsx          # Flashcard game component
│   ├── PuzzleMatch.jsx         # Drag-drop matching game
│   ├── QuizTime.jsx            # Timed quiz (merged firewall questions)
│   ├── SpotTheAttack.jsx       # Attack scenario identification
│   └── MemoryMatch.jsx         # Card-flip memory game
├── pages/
│   ├── Dashboard.jsx           # Home page with game grid
│   ├── Leaderboard.jsx         # Ranking system
│   ├── Resources.jsx           # External learning links
│   ├── Contact.jsx             # Feedback form
│   └── LevelPage.jsx           # Game selection & user stats
├── theme/
│   └── levelThemes.js          # 3-level pastel color schemes
├── App.jsx                     # Router & name entry landing
├── main.jsx                    # React entry point
├── index.css                   # Global styles
└── index.html                  # Root HTML

public/
└── (static assets)
```

## 🎨 Color Palette

**Theme 1 (Beginner):** Cyan accents on dark blue background
**Theme 2 (Intermediate):** Amber accents on dark purple background
**Theme 3 (Expert):** Pink accents on dark purple background
**Light Theme (Leaderboard/Contact):** Pastel gradient backgrounds with light cards

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
# Clone or download the project
cd le

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser. Enter your name to begin!

### Build for Production
```bash
npm run build
npm run preview
```

## 📖 How to Play

1. **Enter your name** on the landing page
2. **Choose a game** from the dashboard
3. **Complete levels** to unlock higher difficulties
4. **Earn points** and climb the leaderboard
5. **Track progress** with real-time stats

### Game Rules
- **Quiz Time:** Answer questions before time runs out (15s per question)
- **Puzzle Match:** Drag terms to match definitions
- **Spot the Attack:** Mark scenarios as safe or dangerous
- **Memory Match:** Flip cards to find matching pairs
- **Flashcards:** Study at your own pace

## 💾 Data Persistence

All user data is stored in browser **localStorage**:
- `cyberUserName` – Player name
- `quizTimeLevel` – Current quiz level
- `quizTimeScore` – Best quiz score
- `puzzleMatchLevel` – Current puzzle level
- `memoryMatchScore` – Memory game score
- `quizTimeUnlocked` – Unlocked levels array
- `puzzleMatchUnlocked` – Unlocked levels array

**Reset data:** Click "Reset Progress" on the dashboard

## 🎯 Learning Outcomes

Students will learn:
- Cybersecurity terminology (phishing, malware, encryption, etc.)
- Common attack vectors and how to identify them
- Firewall concepts and network security basics
- Two-factor authentication and password best practices
- Real-world scenarios and defensive strategies

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** styled-components
- **Animations:** Framer Motion
- **Routing:** React Router
- **Icons:** Emoji
- **Storage:** Browser LocalStorage
- **Deployment Ready:** Vercel, Netlify, GitHub Pages

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 13+)
- Mobile Chrome (Android 8+)

## 🔧 Customization

### Add New Game Content
Edit game files to add/modify questions:
```jsx
// Example: Add to QuizTime LEVELS array
{
  name: "Advanced",
  pass: 85,
  questions: [
    { question: "...", options: [...], correct: "..." }
  ]
}
```

### Change Color Theme
Edit `src/theme/levelThemes.js` to customize pastel colors

### Add More Games
1. Create new component in `src/components/`
2. Add route to `src/App.jsx`
3. Add card to dashboard in `src/pages/Dashboard.jsx`

## 🐛 Known Limitations

- Demo uses mock leaderboard (except user score)
- No backend/database (localStorage only)
- Contact form stores data locally (for demo)
- No user authentication

## 🚀 Future Enhancements

- [ ] Backend API with user accounts
- [ ] Multiplayer quiz battles
- [ ] Achievement badges & trophies
- [ ] Custom difficulty settings
- [ ] Sound effects & background music
- [ ] Mobile app (React Native)
- [ ] Teacher dashboard for classrooms

## 📄 License

MIT License – Free to use and modify

## 👨‍💼 Support

For issues, suggestions, or contributions, open an issue on GitHub or contact via the Contact page.

---

**Happy Learning! 🎓🛡️**

