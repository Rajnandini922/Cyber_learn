import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "../components/Navbar";
import { lightTheme } from "../theme/levelThemes";

// Dark red page background
const Page = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at top, #450a0a 0%, #020617 55%, #020617 100%);
`;

// Centered content
const Content = styled.div`
  max-width: 480px;
  margin: 4rem auto 3rem auto;
  padding: 0 1.5rem;
`;

// Main leaderboard card
const Card = styled.div`
  background: #020617;
  border-radius: 20px;
  padding: 2rem 2.4rem;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(248, 113, 113, 0.5);
`;

// Title
const Title = styled.h1`
  color: #f97373;
  margin: 0 0 1.8rem;
  text-align: center;
  font-size: 2rem;
`;

// Row with hover + active red glow
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  margin-bottom: 0.7rem;
  background: ${({ active }) =>
    active ? "rgba(248, 113, 113, 0.12)" : "#020617"};
  border: 1px solid
    ${({ active }) =>
      active ? "rgba(248, 113, 113, 0.9)" : "rgba(75, 85, 99, 0.7)"};
  color: #e5e7eb;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;

  &:hover {
    background: rgba(248, 113, 113, 0.18);
    border-color: rgba(248, 113, 113, 0.9);
    box-shadow: 0 0 24px rgba(248, 113, 113, 0.45);
    transform: translateY(-1px);
  }
`;

// Rank number
const Rank = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  min-width: 32px;
  color: ${({ rank }) =>
    rank === 1
      ? "#fbbf24"
      : rank === 2
      ? "#e5e7eb"
      : rank === 3
      ? "#fb923c"
      : "#9ca3af"};
`;

// Player name
const Name = styled.div`
  flex: 1;
  font-weight: 600;
`;

// Score
const Score = styled.div`
  font-weight: 700;
  color: #fca5a5;
  font-size: 1rem;
`;

export default function Leaderboard() {
  const userName = localStorage.getItem("cyberUserName") || "You";
  const userScore = Number(localStorage.getItem("quizTimeScore") || 0);

  const [activeIndex, setActiveIndex] = useState(null);

  const mockLeaders = [
    { name: "CyberNinja", score: 950 },
    { name: "HackerPro", score: 920 },
    { name: "SecureMax", score: 890 },
    { name: userName, score: userScore },
    { name: "CodeBreaker", score: 850 },
    { name: "NetGuard", score: 820 }
  ].sort((a, b) => b.score - a.score);

  return (
    // lightTheme is still required by ThemeProvider; the page itself uses hard-coded red/black
    <ThemeProvider theme={lightTheme}>
      <Page>
        <Navbar />
        <Content>
          <Card>
            <Title>🏆 Leaderboard</Title>
            {mockLeaders.map((player, idx) => (
              <Row
                key={idx}
                active={activeIndex === idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(idx)}
              >
                <Rank rank={idx + 1}>{idx + 1}</Rank>
                <Name>{player.name}</Name>
                <Score>{player.score} pts</Score>
              </Row>
            ))}
          </Card>
        </Content>
      </Page>
    </ThemeProvider>
  );
}
