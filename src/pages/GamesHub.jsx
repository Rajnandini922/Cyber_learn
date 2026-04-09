import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { levelThemes } from "../theme/levelThemes";
import Navbar from "../components/Navbar";

const Page = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at top, #450a0a 0%, #020617 55%, #020617 100%);
`;

const Container = styled.div`
  max-width: 960px;
  margin: 3.5rem auto 3rem auto;
  padding: 0 1.5rem;
`;

const Header = styled.h1`
  color: #f97373;
  margin: 0 0 0.6rem 0;
  font-size: 1.8rem;
`;

const Subtitle = styled.p`
  color: #e5e7eb;
  margin: 0 0 1.6rem 0;
  opacity: 0.85;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const GameCard = styled(motion.div)`
  border-radius: 14px;
  padding: 1.2rem 1.4rem;
  background: #020617;
  border: 1px solid rgba(248, 113, 113, 0.35);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(248, 113, 113, 0.55);
    border-color: #f97373;
  }
`;

const GameTitle = styled.h3`
  margin: 0;
  color: #fca5a5;
  font-size: 1rem;
  font-weight: 700;
`;

const GameDesc = styled.p`
  margin: 0;
  color: #e5e7eb;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const games = [
  { key: "flashcards", title: "Flashcards", desc: "Review cybersecurity terms", path: "/flashcards", icon: "📇" },
  { key: "puzzlematch", title: "Puzzle Match", desc: "Match terms to definitions", path: "/puzzlematch", icon: "🧩" },
  { key: "quiztime", title: "Quiz Time", desc: "Timed multiple-choice", path: "/quiztime", icon: "🎯" },
  { key: "spottheattack", title: "Spot the Attack", desc: "Identify suspicious scenarios", path: "/spottheattack", icon: "🔍" },
  { key: "memorymatch", title: "Memory Match", desc: "Pair cybersecurity terms", path: "/memorymatch", icon: "🧠" }
];

export default function GamesHub() {
  const navigate = useNavigate();
  const theme = levelThemes[0];

  return (
    <ThemeProvider theme={theme}>
      <Page>
        <Navbar />
        <Container>
          <Header>🎮 Games Hub</Header>
          <Subtitle>Pick a game to view details or start playing.</Subtitle>

          <GamesGrid>
            {games.map((g, i) => (
              <GameCard
                key={g.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                onClick={() => navigate(`/games/${g.key}`)}
                role="button"
                tabIndex={0}
              >
                <div style={{ fontSize: 20 }}>{g.icon}</div>
                <GameTitle>{g.title}</GameTitle>
                <GameDesc>{g.desc}</GameDesc>
              </GameCard>
            ))}
          </GamesGrid>
        </Container>
      </Page>
    </ThemeProvider>
  );
}
