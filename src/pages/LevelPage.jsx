import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FullScreenContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: #0f172a;
  padding: 2rem 0;
`;

const SplitScreen = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-width: 280px;
`;

const RightPanel = styled.div`
  flex: 1.5;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  max-height: 90vh;
`;

const AvatarCircle = styled(motion.div)`
  width: 160px;
  height: 160px;
  background: linear-gradient(135deg, #38bdf8, #7dd3fc);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 24px rgba(56, 189, 248, 0.3);
`;

const LevelTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.6rem;
  color: #0f172a;
  text-align: center;
  font-weight: 800;
`;

const LevelSubtitle = styled.p`
  margin: 0.5rem 0 1.5rem;
  font-size: 0.95rem;
  color: #64748b;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 240px;
  height: 12px;
  background: #e2e8f0;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #38bdf8, #0ea5e9);
  border-radius: 20px;
`;

const StatBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.1);
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
  font-weight: 700;
`;

const StatValue = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  color: #38bdf8;
`;

const GameOptionCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 1.6rem;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease;
  border: 1px solid rgba(56, 189, 248, 0.1);
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 28px rgba(56, 189, 248, 0.15);
    border-color: #38bdf8;
  }
`;

const GameIcon = styled.span`
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

const OptionTitle = styled.h3`
  font-size: 1.3rem;
  color: #0f172a;
  margin: 0 0 0.6rem;
  font-weight: 800;
`;

const OptionDesc = styled.p`
  font-size: 0.95rem;
  color: #475569;
  margin: 0 0 1rem;
  line-height: 1.6;
`;

const StyledButton = styled.button`
  background: linear-gradient(90deg, #38bdf8, #0ea5e9);
  color: #fff;
  font-weight: 700;
  border-radius: 12px;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25);
  transition: all 0.3s ease;
  align-self: flex-start;
  margin-top: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(56, 189, 248, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

const games = [
  {
    key: "quiz-time",
    icon: "🎯",
    title: "Quiz Time",
    desc: "Test your knowledge with timed multiple-choice questions. 3 difficulty levels with increasing complexity.",
    route: "/quiztime",
  },
  {
    key: "puzzle-match",
    icon: "🧩",
    title: "Puzzle Match",
    desc: "Drag and drop terms to match their definitions. Learn through interactive matching challenges.",
    route: "/puzzlematch",
  },
  {
    key: "spot-the-attack",
    icon: "🔍",
    desc: "Identify suspicious scenarios and real-world attack vectors. Spot the danger before it strikes.",
    title: "Spot the Attack",
    route: "/spottheattack",
  },
  {
    key: "memory-match",
    icon: "🧠",
    title: "Memory Match",
    desc: "Flip cards to find matching pairs of cybersecurity concepts. Test your memory and quick thinking.",
    route: "/memorymatch",
  },
  {
    key: "flashcards",
    icon: "📇",
    title: "Flashcards",
    desc: "Study with interactive flashcards. Master key terminology and concepts at your own pace.",
    route: "/flashcards",
  },
];

const LevelPage = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    name: "Learner",
    level: 1,
    progress: 0,
    xp: 0,
    gamesPlayed: 0,
  });

  useEffect(() => {
    // Load user data from localStorage
    const name = localStorage.getItem("cyberUserName") || "Learner";
    const quizLevel = Number(localStorage.getItem("quizTimeLevel") || 0);
    const quizScore = Number(localStorage.getItem("quizTimeScore") || 0);
    const puzzleLevel = Number(localStorage.getItem("puzzleMatchLevel") || 0);
    
    const totalXP = quizScore + (puzzleLevel * 25);
    const avgLevel = Math.ceil((quizLevel + puzzleLevel) / 2) + 1;
    const gamesPlayed = (quizScore > 0 ? 1 : 0) + (puzzleLevel > 0 ? 1 : 0);

    setUserStats({
      name,
      level: avgLevel,
      progress: Math.min(100, (quizLevel + puzzleLevel) * 25),
      xp: totalXP,
      gamesPlayed,
    });
  }, []);

  const handleGameClick = (route) => {
    navigate(route);
  };

  return (
    <>
      <Navbar />
      <FullScreenContainer>
        <SplitScreen>
          <LeftPanel>
            <AvatarCircle
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.08 }}
            >
              🧑‍💻
            </AvatarCircle>

            <LevelTitle>Level {userStats.level}: Cyber Guardian</LevelTitle>
            <LevelSubtitle>Welcome, {userStats.name}!</LevelSubtitle>

            <div style={{ width: "100%", maxWidth: 240 }}>
              <ProgressBarContainer>
                <ProgressBarFill
                  initial={{ width: 0 }}
                  animate={{ width: `${userStats.progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </ProgressBarContainer>
            </div>

            <StatBox>
              <StatLabel>XP Earned</StatLabel>
              <StatValue>{userStats.xp}</StatValue>
            </StatBox>

            <StatBox>
              <StatLabel>Games Played</StatLabel>
              <StatValue>{userStats.gamesPlayed}</StatValue>
            </StatBox>

            <StatBox>
              <StatLabel>Progress</StatLabel>
              <StatValue>{userStats.progress}%</StatValue>
            </StatBox>
          </LeftPanel>

          <RightPanel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 style={{ color: "#0f172a", marginBottom: 0.5, fontSize: "1.4rem", fontWeight: 800 }}>
                Choose a Game 🎮
              </h2>
              <p style={{ color: "#64748b", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Pick any game below to start learning cybersecurity concepts in a fun, interactive way.
              </p>
            </motion.div>

            {games.map((game, index) => (
              <GameOptionCard
                key={game.key}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleGameClick(game.route)}
              >
                <GameIcon>{game.icon}</GameIcon>
                <OptionTitle>{game.title}</OptionTitle>
                <OptionDesc>{game.desc}</OptionDesc>
                <StyledButton onClick={(e) => { e.stopPropagation(); handleGameClick(game.route); }}>
                  Play Now ⚡
                </StyledButton>
              </GameOptionCard>
            ))}

            <motion.div
              style={{ marginTop: "1.6rem", padding: "1.2rem", background: "#ffffff", borderRadius: 12, border: "1px solid rgba(56, 189, 248, 0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 style={{ color: "#38bdf8", margin: "0 0 0.8rem", fontSize: "1rem", fontWeight: 700 }}>💡 Pro Tips</h3>
              <ul style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.6, margin: 0, paddingLeft: "1.4rem" }}>
                <li>Complete games to unlock higher difficulty levels</li>
                <li>Your progress is saved automatically</li>
                <li>Mix different game types to learn better</li>
              </ul>
            </motion.div>
          </RightPanel>
        </SplitScreen>
      </FullScreenContainer>
    </>
  );
};

export default LevelPage;
