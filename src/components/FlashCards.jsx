import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { SplitScreen, LeftPanel, RightPanel } from "./GameSplitScreen";
import { levelThemes } from "../theme/levelThemes";

const LEVELS = [
  {
    name: "Beginner",
    pass: 60,
    cards: [
      { front: "What is phishing?", back: "A social engineering attack to steal info" },
      { front: "What does VPN stand for?", back: "Virtual Private Network" },
      { front: "What is a strong password?", back: "A long, unique mix of letters, numbers, and symbols" }
    ]
  },
  {
    name: "Intermediate",
    pass: 70,
    cards: [
      { front: "What is a firewall?", back: "A system that blocks unauthorized access" },
      { front: "What is malware?", back: "Malicious software" },
      { front: "What is two-factor authentication?", back: "A login method using two forms of ID" }
    ]
  },
  {
    name: "Expert",
    pass: 80,
    cards: [
      { front: "What is a DDoS attack?", back: "Distributed Denial of Service: flooding a server with traffic" },
      { front: "What is hashing?", back: "A one-way function to secure passwords" },
      { front: "What is a backdoor?", back: "A hidden way to access a system" }
    ]
  }
];

/* Red/black card style */
const Card = styled(motion.div)`
  background: #020617;
  border-radius: 18px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.9);
  padding: 2rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 420px;
  text-align: center;
  color: #e5e7eb;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid rgba(248, 113, 113, 0.5);
`;

/* Buttons reused for levels / nav, in red theme */
const LevelButton = styled.button`
  background: ${({ active }) => (active ? "#f97373" : "rgba(15, 23, 42, 0.9)")};
  color: ${({ active }) => (active ? "#020617" : "#e5e7eb")};
  border-radius: 999px;
  padding: 0.5rem 1.2rem;
  margin: 0 0.5rem;
  font-weight: bold;
  font-size: 0.95rem;
  opacity: ${({ unlocked }) => (unlocked ? 1 : 0.5)};
  cursor: ${({ unlocked }) => (unlocked ? "pointer" : "not-allowed")};
  border: ${({ active }) => (active ? "2px solid #fca5a5" : "1px solid rgba(148,163,184,0.4)")};
  background-clip: padding-box;
`;

export default function FlashCards() {
  const [levelIdx, setLevelIdx] = useState(
    Number(localStorage.getItem("flashCardsLevel")) || 0
  );
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [unlocked, setUnlocked] = useState(
    JSON.parse(localStorage.getItem("flashCardsUnlocked") || "[true,false,false]")
  );

  const level = LEVELS[levelIdx];
  const theme = levelThemes[levelIdx];
  const cards = level.cards;

  useEffect(() => {
    setCardIdx(0);
    setFlipped(false);
    setReviewed([]);
    setShowSummary(false);
  }, [levelIdx]);

  function handleFlip() {
    setFlipped((f) => !f);
    if (!flipped && !reviewed.includes(cardIdx)) {
      setReviewed((r) => [...r, cardIdx]);
    }
  }

  function handleNext() {
    setFlipped(false);
    if (cardIdx < cards.length - 1) {
      setCardIdx((i) => i + 1);
    } else {
      setShowSummary(true);
      const percent = Math.round((reviewed.length / cards.length) * 100);
      if (percent >= level.pass && levelIdx < LEVELS.length - 1) {
        setUnlocked((prev) => {
          const arr = [...prev];
          arr[levelIdx + 1] = true;
          localStorage.setItem("flashCardsUnlocked", JSON.stringify(arr));
          return arr;
        });
      }
      localStorage.setItem("flashCardsLevel", levelIdx);
    }
  }

  function handleRetry() {
    setCardIdx(0);
    setFlipped(false);
    setReviewed([]);
    setShowSummary(false);
  }

  const levelSelector = (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      {LEVELS.map((l, idx) => (
        <LevelButton
          key={l.name}
          active={idx === levelIdx}
          unlocked={unlocked[idx]}
          onClick={() => unlocked[idx] && setLevelIdx(idx)}
          aria-label={`Go to ${l.name} level`}
        >
          {l.name}
        </LevelButton>
      ))}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {/* SplitScreen component already uses page background; if needed, update it to the red gradient like others */}
      <SplitScreen>
        <LeftPanel>
          <h2 style={{ color: "#f97373" }}>{level.name} Level</h2>
          <div style={{ margin: "1rem 0", color: "#e5e7eb" }}>
            <b>Progress:</b> {cardIdx + 1} / {cards.length}
            <br />
            <b>Reviewed:</b> {reviewed.length}
          </div>
          {levelSelector}
        </LeftPanel>
        <RightPanel>
          {showSummary ? (
            <Card
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div>
                <h2 style={{ color: "#f97373" }}>{level.name} Level Complete!</h2>
                <p>
                  Cards reviewed:{" "}
                  <strong>
                    {reviewed.length} / {cards.length}
                  </strong>
                </p>
                <p>
                  Qualification:{" "}
                  <strong>
                    {reviewed.length / cards.length * 100 >= level.pass
                      ? "Passed 🎉"
                      : "Try Again 😅"}
                  </strong>
                </p>
                {reviewed.length / cards.length * 100 >= level.pass &&
                  levelIdx < LEVELS.length - 1 && (
                    <LevelButton onClick={() => setLevelIdx(levelIdx + 1)} unlocked>
                      Next Level ➡️
                    </LevelButton>
                  )}
                {reviewed.length / cards.length * 100 < level.pass && (
                  <LevelButton onClick={handleRetry} unlocked>
                    Retry Level 🔄
                  </LevelButton>
                )}
                {reviewed.length / cards.length * 100 >= level.pass &&
                  levelIdx === LEVELS.length - 1 && (
                    <div
                      style={{
                        marginTop: 12,
                        fontWeight: 600,
                        color: "#f97373"
                      }}
                    >
                      All levels complete! 🏆
                    </div>
                  )}
              </div>
            </Card>
          ) : (
            <AnimatePresence mode="wait">
              <Card
                key={cardIdx + (flipped ? "-back" : "-front")}
                initial={{ opacity: 0, x: flipped ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: flipped ? -40 : 40 }}
                transition={{ duration: 0.4 }}
                tabIndex={0}
                aria-label={flipped ? cards[cardIdx].back : cards[cardIdx].front}
                onClick={handleFlip}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && handleFlip()
                }
                style={{ minHeight: 180 }}
              >
                {flipped ? cards[cardIdx].back : cards[cardIdx].front}
              </Card>
            </AnimatePresence>
          )}
          {!showSummary && (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <LevelButton
                unlocked={cardIdx > 0}
                onClick={() => {
                  setCardIdx((i) => Math.max(0, i - 1));
                  setFlipped(false);
                }}
                disabled={cardIdx === 0}
                aria-label="Previous card"
              >
                ⬅️ Prev
              </LevelButton>
              <LevelButton
                unlocked={true}
                onClick={handleNext}
                aria-label="Next card"
              >
                {cardIdx === cards.length - 1 ? "Finish" : "Next ➡️"}
              </LevelButton>
            </div>
          )}
        </RightPanel>
      </SplitScreen>
    </ThemeProvider>
  );
}
