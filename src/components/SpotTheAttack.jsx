import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { levelThemes } from "../theme/levelThemes";

const FullScreen = styled.div`
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at top, #450a0a 0%, #020617 55%, #020617 100%);
  padding-top: 60px;
`;


const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.accent};
  margin: 0 0 1rem 0;
  font-size: 2rem;
`;

const ScenarioCard = styled(motion.div)`
  background: ${({ isRevealed, isSafe, theme }) =>
    isRevealed ? (isSafe ? `${theme.correct}22` : `${theme.wrong}22`) : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${({ isRevealed, isSafe, theme }) =>
    isRevealed ? (isSafe ? theme.correct : theme.wrong) : theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s;
`;

const Button = styled(motion.button)`
  background: ${({ variant, theme }) => 
    variant === 'safe' ? theme.correct : 
    variant === 'danger' ? theme.wrong : 
    theme.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  margin-right: 0.5rem;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LevelButton = styled(Button)`
  padding: 0.5rem 1.25rem;
  background: ${({ active, theme }) => active ? theme.accent : 'transparent'};
  border: 2px solid ${({ theme }) => theme.accent};
  color: ${({ active }) => active ? '#fff' : 'inherit'};
  margin: 0 0.5rem 0.5rem 0;
  
  &:disabled {
    opacity: 0.3;
  }
`;

const LEVELS = [
  {
    name: "Beginner",
    pass: 60,
    scenarios: [
      { id: 1, text: "You receive an email from your bank asking you to verify your password by clicking a link", attack: true, explanation: "This is phishing! Banks never ask for passwords via email." },
      { id: 2, text: "Your operating system prompts you to install a security update from the official update center", attack: false, explanation: "Legitimate! Always install updates from official sources." },
      { id: 3, text: "An email with an urgent message about a package delivery contains an .exe attachment", attack: true, explanation: "Suspicious attachment from unknown sender - likely malware!" },
      { id: 4, text: "Your company's IT department sends you a scheduled maintenance notification", attack: false, explanation: "Normal IT communication from verified source." }
    ]
  },
  {
    name: "Intermediate",
    pass: 70,
    scenarios: [
      { id: 5, text: "A pop-up claims you've won a prize and asks for your credit card details to claim it", attack: true, explanation: "Classic scam! Never provide payment info for unsolicited 'prizes'." },
      { id: 6, text: "You download software directly from the developer's official website using HTTPS", attack: false, explanation: "Safe! Always use official sources with secure connections." },
      { id: 7, text: "Someone on social media asks for your phone number to 'verify your account'", attack: true, explanation: "Social engineering attack! Never share personal info via social media." },
      { id: 8, text: "Your antivirus software quarantines a suspicious file you downloaded", attack: false, explanation: "Your antivirus is working correctly to protect you." }
    ]
  },
  {
    name: "Expert",
    pass: 80,
    scenarios: [
      { id: 9, text: "A colleague sends you a Google Drive link, but the sender's email has one letter different from usual", attack: true, explanation: "Email spoofing! Attackers often impersonate colleagues." },
      { id: 10, text: "You enable two-factor authentication on your online accounts", attack: false, explanation: "Excellent security practice! 2FA adds protection." },
      { id: 11, text: "A website offers a free software that asks to disable your antivirus before installation", attack: true, explanation: "Red flag! Legitimate software never requires disabling security." },
      { id: 12, text: "Your password manager suggests using a randomly generated strong password", attack: false, explanation: "Good practice! Password managers enhance security." }
    ]
  }
];

export default function SpotTheAttack() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [unlocked, setUnlocked] = useState([true, false, false]);
  const [revealed, setRevealed] = useState({});
  const [showResult, setShowResult] = useState(false);
  
  const level = LEVELS[levelIdx];
  const theme = levelThemes[levelIdx];

  useEffect(() => {
    setRevealed({});
    setShowResult(false);
  }, [levelIdx]);

  const handleMark = (id, isSafe) => {
    setRevealed(prev => ({ ...prev, [id]: { marked: isSafe, revealed: true } }));
  };

  const handleSubmit = () => {
    setShowResult(true);
    const correctCount = level.scenarios.filter(s => 
      revealed[s.id]?.marked === !s.attack
    ).length;
    const percent = Math.round((correctCount / level.scenarios.length) * 100);
    
    if (percent >= level.pass && levelIdx < LEVELS.length - 1) {
      const newUnlocked = [...unlocked];
      newUnlocked[levelIdx + 1] = true;
      setUnlocked(newUnlocked);
    }
  };

  const allAnswered = Object.keys(revealed).length === level.scenarios.length;
  const correctCount = level.scenarios.filter(s => revealed[s.id]?.marked === !s.attack).length;
  const percent = allAnswered ? Math.round((correctCount / level.scenarios.length) * 100) : 0;

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <FullScreen>
        <Container>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title>🔍 Spot the Attack - {level.name}</Title>
            <p style={{ color: theme.text, marginBottom: '1.5rem' }}>
              Read each scenario and identify if it's SAFE or an ATTACK!
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {LEVELS.map((lv, idx) => (
                <LevelButton
                  key={idx}
                  theme={theme}
                  active={idx === levelIdx}
                  disabled={!unlocked[idx]}
                  onClick={() => unlocked[idx] && setLevelIdx(idx)}
                >
                  {lv.name}
                </LevelButton>
              ))}
            </div>

            <div style={{ marginBottom: '1rem', color: theme.text, fontWeight: 600 }}>
              Progress: {Object.keys(revealed).length} / {level.scenarios.length} answered
            </div>

            {level.scenarios.map(scenario => (
              <ScenarioCard
                key={scenario.id}
                theme={theme}
                isRevealed={revealed[scenario.id]?.revealed}
                isSafe={!scenario.attack}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: scenario.id * 0.1 }}
              >
                <div style={{ fontSize: '1.1rem', marginBottom: '1rem', color: theme.text, lineHeight: 1.6 }}>
                  {scenario.text}
                </div>
                
                {!revealed[scenario.id]?.revealed ? (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button
                      variant="safe"
                      theme={theme}
                      onClick={() => handleMark(scenario.id, true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ✓ Safe
                    </Button>
                    <Button
                      variant="danger"
                      theme={theme}
                      onClick={() => handleMark(scenario.id, false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ⚠️ Attack
                    </Button>
                  </div>
                ) : (
                  <div style={{ 
                    padding: '1rem', 
                    borderRadius: '8px',
                    background: revealed[scenario.id].marked === !scenario.attack ? `${theme.correct}33` : `${theme.wrong}33`,
                    marginTop: '0.5rem'
                  }}>
                    <div style={{ 
                      fontWeight: 700, 
                      marginBottom: '0.5rem',
                      color: revealed[scenario.id].marked === !scenario.attack ? theme.correct : theme.wrong
                    }}>
                      {revealed[scenario.id].marked === !scenario.attack ? '✓ Correct!' : '✗ Incorrect'}
                    </div>
                    <div style={{ color: theme.text }}>
                      <strong>Answer:</strong> {scenario.attack ? 'ATTACK ⚠️' : 'SAFE ✓'}
                    </div>
                    <div style={{ color: theme.text, marginTop: '0.5rem', fontSize: '0.95rem' }}>
                      <strong>Explanation:</strong> {scenario.explanation}
                    </div>
                  </div>
                )}
              </ScenarioCard>
            ))}

            {allAnswered && !showResult && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Button
                  variant="primary"
                  theme={theme}
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Answers ✓
                </Button>
              </div>
            )}

            {showResult && (
              <Card
                style={{ marginTop: '2rem', background: percent >= level.pass ? `${theme.correct}22` : `${theme.wrong}22` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 style={{ color: theme.accent, marginTop: 0 }}>
                  {percent >= level.pass ? '🎉 Level Complete!' : '😅 Try Again!'}
                </h3>
                <p style={{ color: theme.text, fontSize: '1.1rem' }}>
                  Score: <strong>{correctCount}/{level.scenarios.length}</strong> ({percent}%)
                </p>
                <p style={{ color: theme.text }}>
                  Pass requirement: {level.pass}%
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {percent >= level.pass ? (
                    <>
                      {levelIdx < LEVELS.length - 1 && (
                        <Button
                          variant="safe"
                          theme={theme}
                          onClick={() => setLevelIdx(levelIdx + 1)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Next Level ➡️
                        </Button>
                      )}
                      {levelIdx === LEVELS.length - 1 && (
                        <div style={{ color: theme.correct, fontWeight: 700, fontSize: '1.2rem' }}>
                          🏆 All levels complete! You're a threat detection expert!
                        </div>
                      )}
                    </>
                  ) : (
                    <Button
                      theme={theme}
                      onClick={() => {
                        setRevealed({});
                        setShowResult(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Retry Level 🔄
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </Card>
        </Container>
      </FullScreen>
    </ThemeProvider>
  );
}