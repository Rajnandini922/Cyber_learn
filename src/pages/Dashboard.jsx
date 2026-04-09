import React from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { levelThemes } from "../theme/levelThemes";

/* === Glowing red background === */

const glowPulse = keyframes`
  0%   { opacity: 0.25; transform: scale(1); }
  50%  { opacity: 0.8;  transform: scale(1.1); }
  100% { opacity: 0.25; transform: scale(1); }
`;

const GlowBackground = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 140%;
    height: 140%;
    left: -20%;
    top: -20%;
    background:
      radial-gradient(circle at 50% 10%, #7f1d1d55, transparent 65%),
      radial-gradient(circle at 50% 60%, #b91c1c44, transparent 70%);
    animation: ${glowPulse} 12s ease-in-out infinite;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at top, #450a0a 0%, #020617 55%, #020617 100%);
  position: relative;
  z-index: 1;
`;

/* === Cards & typography === */

const BigLearnCard = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  padding: 1.8rem;
  border: 1px solid rgba(248, 113, 113, 0.5);
  background: #020617;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &::before {
    content: "";
    position: absolute;
    inset: -40%;
    background: radial-gradient(circle at top left, #f9737355, transparent 60%);
    opacity: 0.5;
    z-index: -1;
  }

  &:hover {
    border-color: #f97373;
    box-shadow: 0 0 30px rgba(248, 113, 113, 0.55);
    transform: translateY(-2px);
  }
`;

const SectionHeader = styled.h2`
  color: #f97373;
  font-size: 1.5rem;
  margin: 0 0 0.8rem 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const LearnTitle = styled.h3`
  color: #fca5a5;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 800;
`;

const LearnDesc = styled.p`
  color: #e5e7eb;
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
`;

/* Welcome stats card */

const StatsPanel = styled.div`
  background: #020617;
  border-radius: 16px;
  padding: 1.4rem 1.6rem;
  border: 1px solid rgba(248, 113, 113, 0.45);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.9);
  cursor: pointer;
`;

/* Modal */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const ModalCard = styled(motion.div)`
  background: #020617;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  width: 320px;
  border: 1px solid rgba(248, 113, 113, 0.5);
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.25);

  &:first-of-type {
    border-top: none;
  }

  span {
    color: #e5e7eb;
    font-size: 0.9rem;
    opacity: 0.85;
  }

  strong {
    color: #f97373;
    font-weight: 700;
  }
`;

const ResetButton = styled(motion.button)`
  background: ${({ variant }) =>
    variant === "secondary" ? "#f97373" : "#ef4444"};
  color: ${({ variant }) => (variant === "secondary" ? "#020617" : "#f9fafb")};
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
`;

/* === Component === */

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const theme = levelThemes[0];

  const [showStats, setShowStats] = React.useState(false);

  const userName = localStorage.getItem("cyberUserName") || "Learner";
  const quizScore = Number(localStorage.getItem("quizTimeScore") || 0);
  const puzzleLevel = Number(localStorage.getItem("puzzleMatchLevel") || 0);
  const quizLevel = Number(localStorage.getItem("quizTimeLevel") || 0);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlowBackground />
        <PageContainer>
          <Navbar onLogout={onLogout} />

          {/* Centered welcome card */}
          <div
            style={{
              maxWidth: 480,
              margin: "3rem auto 0 auto",
              padding: "0 1.5rem"
            }}
          >
            <StatsPanel onClick={() => setShowStats(true)}>
              <h2 style={{ color: "#f97373", margin: 0 }}>
                Welcome, {userName}!
              </h2>
              <p
                style={{
                  color: "#e5e7eb",
                  marginTop: "0.5rem",
                  opacity: 0.85
                }}
              >
                Every click makes you a bit more secure. Tap here to view your
                progress.
              </p>
            </StatsPanel>
          </div>

          {/* Caption */}
          <p
            style={{
              textAlign: "center",
              color: "#e5e7eb",
              opacity: 0.75,
              marginTop: "0.8rem",
              fontSize: "0.9rem",
              maxWidth: 480,
              marginInline: "auto"
            }}
          >
            Start with a learning path or jump into interactive games below.
          </p>

          {/* Two-column area */}
          <div
            style={{
              maxWidth: 1080,
              margin: "2.8rem auto 4rem auto",
              padding: "0 1.5rem",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "2.4rem"
            }}
          >
            <div style={{ maxWidth: 480 }}>
              <SectionHeader>
                <span>📚</span> Learning Paths
              </SectionHeader>
              <p
                style={{
                  color: "#e5e7eb",
                  marginBottom: 16,
                  opacity: 0.85
                }}
              >
                Explore in-depth cybersecurity topics and build your knowledge
                foundation.
              </p>
              <BigLearnCard
                onClick={() => navigate("/choose-topic")}
                whileTap={{ scale: 0.98 }}
              >
                <LearnTitle>
                  <span>🎓</span> Explore Cybersecurity Topics
                </LearnTitle>
                <LearnDesc>
                  Choose from topics including Network Security, Cloud Security,
                  Cryptography, and more.
                </LearnDesc>
              </BigLearnCard>
            </div>

            <div
              style={{
                maxWidth: 480,
                justifySelf: "end",
                marginTop: "1.5rem"   // adjust value to how low you want
              }}
            >
              <SectionHeader>
                <span>🎮</span> Interactive Games
              </SectionHeader>
              <p
                style={{
                  color: "#e5e7eb",
                  marginBottom: 16,
                  opacity: 0.85
                }}
              >
                Choose the games hub to see all cybersecurity games.
              </p>
              <BigLearnCard
                onClick={() => navigate("/games")}
                whileTap={{ scale: 0.98 }}
              >
                <LearnTitle>
                  <span>🕹️</span> Go to Games Hub
                </LearnTitle>
                <LearnDesc>
                  View all interactive games like Flashcards, Puzzle Match, Quiz
                  Time, and more.
                </LearnDesc>
              </BigLearnCard>
            </div>
          </div>

          {/* Stats modal */}
          {showStats && (
            <ModalOverlay
              role="dialog"
              aria-modal="true"
              onClick={() => setShowStats(false)}
            >
              <ModalCard
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 style={{ margin: 0, color: "#f97373" }}>Your Progress</h3>
                <p
                  style={{
                    color: "#e5e7eb",
                    marginTop: 8,
                    marginBottom: 12,
                    opacity: 0.9
                  }}
                >
                  Quick overview of your progress. Close to return.
                </p>
                <div>
                  <StatRow>
                    <span>Quiz Score</span>
                    <strong>{quizScore}</strong>
                  </StatRow>
                  <StatRow>
                    <span>Puzzle Level</span>
                    <strong>{puzzleLevel + 1}</strong>
                  </StatRow>
                  <StatRow>
                    <span>Quiz Level</span>
                    <strong>{quizLevel + 1}</strong>
                  </StatRow>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 12,
                    flexWrap: "wrap"
                  }}
                >
                  <ResetButton
                    onClick={() => {
                      localStorage.clear();
                      localStorage.setItem("cyberUserName", userName);
                      window.location.reload();
                    }}
                  >
                    Reset Progress
                  </ResetButton>
                  <ResetButton
                    variant="secondary"
                    onClick={() => setShowStats(false)}
                  >
                    Close
                  </ResetButton>
                </div>
              </ModalCard>
            </ModalOverlay>
          )}
        </PageContainer>
      </>
    </ThemeProvider>
  );
}
