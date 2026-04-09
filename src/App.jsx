import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { levelThemes } from "./theme/levelThemes";

import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import FlashCards from "./components/FlashCards";
import PuzzleMatch from "./components/PuzzleMatch";
import QuizTime from "./components/QuizTime";
import SpotTheAttack from "./components/SpotTheAttack";
import MemoryMatch from "./components/MemoryMatch";
import LandingPage from "./pages/LandingPage";
import ChooseTopic from "./pages/ChooseTopic";
import TopicDetails from "./pages/TopicDetails";
import NetworkSecurityDetails from "./pages/NetworkSecurityDetails";
import GameDetails from "./pages/GameDetails";
import GamesHub from "./pages/GamesHub";

function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const savedName = localStorage.getItem("cyberUserName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cyberUserName");
    setUserName(null);
  };

  if (!userName) {
    return (
      <ThemeProvider theme={levelThemes[0]}>
        <LandingPage
          onNameSubmit={(name) => {
            localStorage.setItem("cyberUserName", name);
            setUserName(name);
          }}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={levelThemes[0]}>
      <Router>
        <Routes>
          {/* Redirect root to dashboard after login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Main flow */}
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
          <Route path="/flashcards" element={<FlashCards />} />
          <Route path="/puzzlematch" element={<PuzzleMatch />} />
          <Route path="/quiztime" element={<QuizTime />} />
          <Route path="/spottheattack" element={<SpotTheAttack />} />
          <Route path="/memorymatch" element={<MemoryMatch />} />
          <Route path="/choose-topic" element={<ChooseTopic />} />
          <Route path="/topic-details" element={<TopicDetails />} />
          <Route path="/network-security" element={<NetworkSecurityDetails />} />
          <Route path="/games/:gameId" element={<GameDetails />} />

          {/* Topic details with id */}
          <Route path="/topic-details/:topicId" element={<TopicDetails />} />

          {/* Other pages */}
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

          {/* Games hub */}
          <Route path="/games" element={<GamesHub />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
