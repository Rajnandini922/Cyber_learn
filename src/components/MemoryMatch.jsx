import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { levelThemes } from "../theme/levelThemes";

/* Layout + background */

const FullScreen = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at top, #450a0a 0%, #020617 55%, #020617 100%);
  padding-top: 60px;
`;

const Container = styled.div`
  max-width: 880px;
  margin: 3rem auto 3rem auto;
  padding: 0 1.5rem;
`;

const Card = styled(motion.div)`
  background: #020617;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(248, 113, 113, 0.5);
`;

const Title = styled.h1`
  color: #f97373;
  margin: 0 0 1rem 0;
`;

/* Grid + card styles */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MemoryCard = styled(motion.div)`
  aspect-ratio: 1;
  background: ${({ isFlipped, isMatched }) =>
    isMatched
      ? "#16a34a"
      : isFlipped
      ? "#f97373"
      : "rgba(15, 23, 42, 0.9)"};
  border: 2px solid
    ${({ isMatched }) =>
      isMatched ? "#4ade80" : "rgba(148, 163, 184, 0.4)"};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: ${({ isMatched }) => (isMatched ? "default" : "pointer")};
  user-select: none;
  color: ${({ isFlipped }) => (isFlipped ? "#0b1120" : "#e5e7eb")};
  transition: all 0.3s;

  &:hover {
    transform: ${({ isMatched }) => (isMatched ? "none" : "scale(1.05)")};
  }
`;

/* Buttons + stats */

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  color: #f9fafb;
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 0 0 rgba(248, 113, 113, 0);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 18px rgba(248, 113, 113, 0.6);
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.2rem 0;
  padding: 0.9rem 1rem;
  background: rgba(15, 23, 42, 0.9);
  border-radius: 10px;
  border: 1px solid rgba(248, 113, 113, 0.35);
`;

const StatItem = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text};

  strong {
    color: ${({ theme }) => theme.accent};
    font-size: 1.5rem;
    display: block;
  }
`;

/* Game config */

const LEVELS = [
  {
    name: "Beginner",
    items: ["Phishing", "Firewall", "Malware", "Encryption"]
  },
  {
    name: "Intermediate",
    items: ["Ransomware", "2FA", "VPN", "Hashing", "Trojan", "Worm"]
  },
  {
    name: "Expert",
    items: [
      "DDoS",
      "Rootkit",
      "Zero-Day",
      "SQL Injection",
      "XSS",
      "CSRF",
      "Botnet",
      "APT"
    ]
  }
];

export default function MemoryMatch() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const level = LEVELS[levelIdx];
  const theme = levelThemes[levelIdx] || levelThemes[0];

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIdx]);

  function resetGame() {
    const items = level.items;
    const pairs = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((val, id) => ({ id, val }));
    setDeck(pairs);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStartTime(Date.now());
    setEndTime(null);
  }

  function flipCard(id) {
    if (flipped.includes(id) || matched.includes(id) || flipped.length >= 2)
      return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;

      if (deck[a].val === deck[b].val) {
        setMatched((m) => {
          const next = [...m, a, b];
          if (next.length === deck.length) {
            setEndTime(Date.now());
          }
          return next;
        });
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }

  const isComplete = matched.length === deck.length && deck.length > 0;
  const timeElapsed =
    endTime && startTime ? Math.round((endTime - startTime) / 1000) : 0;

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <FullScreen>
        <Container>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Title>🧠 Memory Match - {level.name}</Title>
            <p style={{ color: theme.text }}>
              Find all matching pairs of cybersecurity terms!
            </p>

            <Stats theme={theme}>
              <StatItem theme={theme}>
                <strong>{moves}</strong>
                <div>Moves</div>
              </StatItem>
              <StatItem theme={theme}>
                <strong>{Math.floor(matched.length / 2)}</strong>
                <div>Pairs Found</div>
              </StatItem>
              <StatItem theme={theme}>
                <strong>{level.items.length}</strong>
                <div>Total Pairs</div>
              </StatItem>
            </Stats>

            <Grid>
              {deck.map((card, idx) => (
                <MemoryCard
                  key={card.id}
                  isFlipped={flipped.includes(idx) || matched.includes(idx)}
                  isMatched={matched.includes(idx)}
                  onClick={() => flipCard(idx)}
                  whileTap={{ scale: 0.95 }}
                >
                  {flipped.includes(idx) || matched.includes(idx)
                    ? card.val
                    : "?"}
                </MemoryCard>
              ))}
            </Grid>

            {isComplete && (
              <Card
                style={{ marginTop: "2rem", background: "#16653433" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 style={{ color: "#4ade80", marginTop: 0 }}>
                  🎉 Level Complete!
                </h3>
                <p style={{ color: theme.text }}>
                  Time: <strong>{timeElapsed}s</strong> | Moves:{" "}
                  <strong>{moves}</strong>
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap"
                  }}
                >
                  <Button
                    onClick={resetGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Again 🔄
                  </Button>
                  {levelIdx < LEVELS.length - 1 && (
                    <Button
                      onClick={() => setLevelIdx(levelIdx + 1)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next Level ➡️
                    </Button>
                  )}
                </div>
              </Card>
            )}

            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              {LEVELS.map((lv, idx) => (
                <Button
                  key={idx}
                  onClick={() => setLevelIdx(idx)}
                  style={{
                    background:
                      idx === levelIdx ? "#f97373" : "transparent",
                    border: "2px solid #f97373",
                    padding: "0.5rem 1rem"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {lv.name}
                </Button>
              ))}
            </div>
          </Card>
        </Container>
      </FullScreen>
    </ThemeProvider>
  );
}
