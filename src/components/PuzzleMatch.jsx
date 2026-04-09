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
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
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

const Button = styled(motion.button)`
  background: ${({ variant, theme }) => 
    variant === 'primary' ? theme.accent : 
    variant === 'success' ? theme.correct :
    variant === 'danger' ? theme.wrong : 
    theme.card};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LevelButton = styled(Button)`
  padding: 0.5rem 1.25rem;
  background: ${({ active, theme }) => active ? theme.accent : 'transparent'};
  border: 2px solid ${({ theme }) => theme.accent};
  color: ${({ active, theme }) => active ? '#fff' : theme.text};
  
  &:disabled {
    opacity: 0.3;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.accent};
  border-radius: 4px;
`;

const DropZone = styled.div`
  background: ${({ hasAnswer, isCorrect, theme }) => 
    hasAnswer ? (isCorrect ? `${theme.correct}22` : `${theme.wrong}22`) : 
    'rgba(255, 255, 255, 0.05)'};
  border: 2px dashed ${({ hasAnswer, isCorrect, theme }) => 
    hasAnswer ? (isCorrect ? theme.correct : theme.wrong) : 
    theme.border};
  border-radius: 12px;
  padding: 1.25rem;
  min-height: 80px;
  margin-bottom: 1rem;
  transition: all 0.3s;
  
  &:hover {
    border-style: solid;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const DraggableOption = styled.div`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.card};
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  cursor: grab;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s;
  
  &:active {
    cursor: grabbing;
    transform: scale(0.98);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.3);
  }
`;

const LEVELS = [
  {
    name: "Beginner",
    pass: 60,
    questions: [
      { definition: "Tricking users into giving credentials", answer: "Phishing" },
      { definition: "Program that replicates across systems", answer: "Worm" },
      { definition: "Blocks unauthorized network access", answer: "Firewall" },
      { definition: "Software that harms your computer", answer: "Malware" }
    ]
  },
  {
    name: "Intermediate",
    pass: 70,
    questions: [
      { definition: "Encrypts data with a key pair", answer: "Asymmetric Encryption" },
      { definition: "Locks files and demands ransom", answer: "Ransomware" },
      { definition: "Verifies user identity", answer: "Authentication" },
      { definition: "Disguises malware as legitimate software", answer: "Trojan Horse" }
    ]
  },
  {
    name: "Expert",
    pass: 80,
    questions: [
      { definition: "Attack that floods a server with traffic", answer: "DDoS" },
      { definition: "One-way function to secure passwords", answer: "Hashing" },
      { definition: "Security flaw in software", answer: "Vulnerability" },
      { definition: "Hidden backdoor access method", answer: "Rootkit" }
    ]
  }
];

export default function PuzzleMatch() {
  const [levelIdx, setLevelIdx] = useState(
    Number(localStorage.getItem("puzzleMatchLevel")) || 0
  );
  const [unlocked, setUnlocked] = useState(
    JSON.parse(localStorage.getItem("puzzleMatchUnlocked") || "[true,false,false]")
  );
  
  const level = LEVELS[levelIdx];
  const theme = levelThemes[levelIdx];
  
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const shuffled = [...level.questions.map(q => q.answer)].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setAnswers({});
    setShowResult(false);
  }, [levelIdx]);

  useEffect(() => {
    localStorage.setItem("puzzleMatchLevel", levelIdx);
  }, [levelIdx]);

  const onDragStart = (e, val) => {
    e.dataTransfer.setData("text", val);
  };

  const onDrop = (idx, e) => {
    e.preventDefault();
    const val = e.dataTransfer.getData("text");
    if (!val) return;
    
    setAnswers(prev => ({ ...prev, [idx]: val }));
    setOptions(prev => prev.filter(o => o !== val));
  };

  const handleSubmit = () => {
    setShowResult(true);
    const correctCount = Object.entries(answers).filter(
      ([idx, val]) => val === level.questions[idx].answer
    ).length;
    const percent = Math.round((correctCount / level.questions.length) * 100);
    
    if (percent >= level.pass && levelIdx < LEVELS.length - 1) {
      const newUnlocked = [...unlocked];
      newUnlocked[levelIdx + 1] = true;
      setUnlocked(newUnlocked);
      localStorage.setItem("puzzleMatchUnlocked", JSON.stringify(newUnlocked));
    }
  };

  const handleRetry = () => {
    const shuffled = [...level.questions.map(q => q.answer)].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setAnswers({});
    setShowResult(false);
  };

  const allAnswered = Object.keys(answers).length === level.questions.length;
  const correctCount = Object.entries(answers).filter(
    ([idx, val]) => val === level.questions[idx].answer
  ).length;
  const percent = allAnswered ? Math.round((correctCount / level.questions.length) * 100) : 0;

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
            <Title>🧩 Puzzle Match - {level.name}</Title>
            <p style={{ color: theme.text, marginBottom: '1rem' }}>
              Drag answers from the left to match the definitions on the right!
            </p>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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

            <ProgressBar>
              <ProgressFill
                theme={theme}
                initial={{ width: 0 }}
                animate={{ width: `${(Object.keys(answers).length / level.questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </ProgressBar>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div>
                <h3 style={{ color: theme.accent, marginBottom: '1rem' }}>Available Answers</h3>
                {options.map(opt => (
                  <DraggableOption
                    key={opt}
                    theme={theme}
                    draggable
                    onDragStart={(e) => onDragStart(e, opt)}
                  >
                    {opt}
                  </DraggableOption>
                ))}
                {options.length === 0 && (
                  <p style={{ color: theme.text, opacity: 0.6, textAlign: 'center', padding: '2rem' }}>
                    All answers placed!
                  </p>
                )}
              </div>

              <div>
                <h3 style={{ color: theme.accent, marginBottom: '1rem' }}>Definitions</h3>
                {level.questions.map((q, idx) => (
                  <DropZone
                    key={idx}
                    theme={theme}
                    hasAnswer={!!answers[idx]}
                    isCorrect={answers[idx] === q.answer}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(idx, e)}
                  >
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: theme.text }}>
                      {q.definition}
                    </div>
                    <div style={{ 
                      color: answers[idx] === q.answer ? theme.correct : theme.accent, 
                      fontWeight: 600,
                      fontSize: '1.1rem'
                    }}>
                      {answers[idx] || '⬇️ Drop answer here'}
                    </div>
                    {showResult && answers[idx] && answers[idx] !== q.answer && (
                      <div style={{ color: theme.correct, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Correct: {q.answer}
                      </div>
                    )}
                  </DropZone>
                ))}
              </div>
            </div>

            {allAnswered && showResult && (
              <Card
                style={{ marginTop: '2rem', background: percent >= level.pass ? `${theme.correct}22` : `${theme.wrong}22` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 style={{ color: theme.accent, marginTop: 0 }}>
                  {percent >= level.pass ? '🎉 Level Complete!' : '😅 Try Again!'}
                </h3>
                <p style={{ color: theme.text, fontSize: '1.1rem' }}>
                  Score: <strong>{correctCount}/{level.questions.length}</strong> ({percent}%)
                </p>
                <p style={{ color: theme.text }}>
                  Pass requirement: {level.pass}%
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {percent >= level.pass ? (
                    <>
                      {levelIdx < LEVELS.length - 1 && (
                        <Button
                          variant="success"
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
                          🏆 All levels complete!
                        </div>
                      )}
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      theme={theme}
                      onClick={handleRetry}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Retry Level 🔄
                    </Button>
                  )}
                </div>
              </Card>
            )}

            {!showResult && allAnswered && (
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
          </Card>
        </Container>
      </FullScreen>
    </ThemeProvider>
  );
}