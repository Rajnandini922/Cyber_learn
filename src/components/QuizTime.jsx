import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { SplitScreen, LeftPanel, RightPanel } from "./GameSplitScreen";
import { levelThemes } from "../theme/levelThemes";

// MERGED LEVELS - All cybersecurity + firewall questions combined
const LEVELS = [
  {
    name: "Beginner",
    pass: 60,
    questions: [
      // General Cybersecurity
      { question: "What is phishing?", options: ["Catching fish online", "A social engineering attack to steal credentials", "A firewall rule", "A type of malware"], correct: "A social engineering attack to steal credentials" },
      { question: "What does VPN stand for?", options: ["Virtual Protection Network", "Very Private Network", "Virtual Private Network", "Verified Personal Network"], correct: "Virtual Private Network" },
      { question: "Which is a strong password?", options: ["password123", "qwerty", "MyDog$2025!", "123456"], correct: "MyDog$2025!" },
      // Firewall Basics
      { question: "What is the main purpose of a firewall?", options: ["To store passwords", "To block unauthorized access", "To speed up the internet", "To encrypt files"], correct: "To block unauthorized access" },
      { question: "Which type of firewall filters traffic based on IP address and port?", options: ["Packet-filtering firewall", "Proxy firewall", "Stateful firewall", "Application firewall"], correct: "Packet-filtering firewall" },
      { question: "Which protocol uses port 443?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correct: "HTTPS" }
    ]
  },
  {
    name: "Intermediate",
    pass: 70,
    questions: [
      // General Cybersecurity
      { question: "What is two-factor authentication?", options: ["Using two passwords", "Authentication with two methods", "Logging in twice", "Two people approving"], correct: "Authentication with two methods" },
      { question: "What is ransomware?", options: ["Free software", "Malware that locks files for ransom", "A backup tool", "Antivirus software"], correct: "Malware that locks files for ransom" },
      { question: "Which protocol uses port 22?", options: ["FTP", "SSH", "SMTP", "DNS"], correct: "SSH" },
      // Firewall Intermediate
      { question: "A firewall that tracks the state of active connections is called?", options: ["Stateless firewall", "Stateful firewall", "Proxy firewall", "Application firewall"], correct: "Stateful firewall" },
      { question: "Which firewall can inspect traffic at the application layer?", options: ["Packet-filtering firewall", "Stateful firewall", "Application firewall", "Circuit-level gateway"], correct: "Application firewall" },
      { question: "What does a proxy firewall do?", options: ["Blocks all traffic", "Acts as an intermediary between users and the internet", "Encrypts all data", "Stores passwords"], correct: "Acts as an intermediary between users and the internet" }
    ]
  },
  {
    name: "Expert",
    pass: 80,
    questions: [
      // General Cybersecurity
      { question: "What is a DDoS attack?", options: ["Data deletion", "Distributed Denial of Service flooding", "Password cracking", "Phishing campaign"], correct: "Distributed Denial of Service flooding" },
      { question: "What is hashing?", options: ["Encrypting with a key", "One-way function for data integrity", "Compressing files", "Deleting data"], correct: "One-way function for data integrity" },
      { question: "What does HTTPS provide that HTTP does not?", options: ["Faster speed", "Encryption", "More ads", "Larger files"], correct: "Encryption" },
      // Firewall Expert
      { question: "Which is a limitation of packet-filtering firewalls?", options: ["Cannot filter based on IP address", "Cannot filter based on port", "Cannot inspect packet payload", "Cannot block traffic"], correct: "Cannot inspect packet payload" },
      { question: "What is a DMZ in firewall terminology?", options: ["A type of malware", "A secure area inside the firewall", "A network segment that is exposed to the internet", "A VPN protocol"], correct: "A network segment that is exposed to the internet" },
      { question: "Which firewall type is best for protecting web applications?", options: ["Packet-filtering firewall", "Web Application Firewall (WAF)", "Circuit-level gateway", "Stateful firewall"], correct: "Web Application Firewall (WAF)" }
    ]
  }
];

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 600px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

const QuestionText = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
  margin: 1.5rem 0;
  line-height: 1.6;
  font-weight: 600;
`;

const OptionButton = styled(motion.button)`
  background: ${({ selected, isCorrect, isWrong, theme }) =>
    selected && isCorrect ? theme.correct :
    selected && isWrong ? theme.wrong :
    theme.accent};
  color: ${({ selected }) => selected ? '#fff' : ({ theme }) => theme.card};
  border: none;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin: 0.6rem 0;
  font-size: 1.05rem;
  width: 100%;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const LevelButton = styled.button`
  background: ${({ theme, active }) => (active ? theme.accent : "transparent")};
  color: ${({ theme, active }) => (active ? theme.card : theme.text)};
  border: 2px solid ${({ theme }) => theme.accent};
  border-radius: 10px;
  padding: 0.6rem 1.4rem;
  margin: 0.4rem;
  font-weight: 700;
  font-size: 1rem;
  opacity: ${({ unlocked }) => (unlocked ? 1 : 0.4)};
  cursor: ${({ unlocked }) => (unlocked ? "pointer" : "not-allowed")};
  transition: all 0.3s;
  
  &:hover {
    ${({ unlocked, theme }) => unlocked && `
      background: ${theme.accent};
      color: ${theme.card};
      transform: translateY(-2px);
    `}
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

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid ${({ theme }) => theme.border};
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3rem;
  font-weight: 600;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.accent};
`;

export default function QuizTime() {
  const [levelIdx, setLevelIdx] = useState(
    Number(localStorage.getItem("quizTimeLevel")) || 0
  );
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [unlocked, setUnlocked] = useState(
    JSON.parse(localStorage.getItem("quizTimeUnlocked") || "[true,false,false]")
  );

  const level = LEVELS[levelIdx];
  const theme = levelThemes[levelIdx];
  const questions = level.questions;
  const current = questions[qIdx];

  // Reset when level changes
  useEffect(() => {
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setShowSummary(false);
  }, [levelIdx]);

  // Save progress
  useEffect(() => {
    localStorage.setItem("quizTimeLevel", levelIdx);
  }, [levelIdx]);

  function handleOption(opt) {
    setSelected(opt);
    const isCorrect = opt === current.correct;
    if (isCorrect) setScore(s => s + 1);
    
    setTimeout(() => {
      setSelected(null);
      if (qIdx < questions.length - 1) {
        setQIdx(q => q + 1);
      } else {
        setShowSummary(true);
        // Save best score
        const currentBest = Number(localStorage.getItem("quizTimeScore") || 0);
        const newScore = score + (isCorrect ? 1 : 0);
        if (newScore > currentBest) {
          localStorage.setItem("quizTimeScore", newScore);
        }
      }
    }, 1000);
  }

  function handleNextLevel() {
    const next = levelIdx + 1;
    if (next < LEVELS.length) {
      setLevelIdx(next);
      setUnlocked(prev => {
        const arr = [...prev];
        arr[next] = true;
        localStorage.setItem("quizTimeUnlocked", JSON.stringify(arr));
        return arr;
      });
    }
  }

  function handleRetry() {
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setShowSummary(false);
  }

  // Auto-unlock next level if passed
  useEffect(() => {
    if (showSummary) {
      const percent = Math.round((score / questions.length) * 100);
      if (percent >= level.pass && levelIdx < LEVELS.length - 1) {
        setUnlocked(prev => {
          const arr = [...prev];
          arr[levelIdx + 1] = true;
          localStorage.setItem("quizTimeUnlocked", JSON.stringify(arr));
          return arr;
        });
      }
    }
  }, [showSummary, score, questions.length, level.pass, levelIdx]);

  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= level.pass;

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <SplitScreen>
        <LeftPanel>
          <h2 style={{ color: theme.accent, marginTop: 0 }}>🎯 {level.name}</h2>
          <p style={{ color: theme.text, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Cybersecurity Quiz
          </p>

          {!showSummary && (
            <>
              <StatBox theme={theme}>
                <StatLabel>Question</StatLabel>
                <StatValue theme={theme}>{qIdx + 1} / {questions.length}</StatValue>
              </StatBox>

              <StatBox theme={theme}>
                <StatLabel>Current Score</StatLabel>
                <StatValue theme={theme}>{score}</StatValue>
              </StatBox>

              <ProgressBar>
                <ProgressFill
                  theme={theme}
                  initial={{ width: 0 }}
                  animate={{ width: `${((qIdx + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </ProgressBar>
            </>
          )}

          {showSummary && (
            <>
              <StatBox theme={theme}>
                <StatLabel>Final Score</StatLabel>
                <StatValue theme={theme}>{score} / {questions.length}</StatValue>
              </StatBox>

              <StatBox theme={theme}>
                <StatLabel>Percentage</StatLabel>
                <StatValue theme={theme} style={{ color: passed ? theme.correct : theme.wrong }}>
                  {percent}%
                </StatValue>
              </StatBox>

              <div style={{ 
                padding: '1rem', 
                background: passed ? `${theme.correct}22` : `${theme.wrong}22`,
                borderRadius: '8px',
                marginTop: '1rem',
                border: `2px solid ${passed ? theme.correct : theme.wrong}`
              }}>
                <div style={{ fontWeight: 700, color: passed ? theme.correct : theme.wrong }}>
                  {passed ? '✅ PASSED!' : '❌ TRY AGAIN'}
                </div>
                <div style={{ fontSize: '0.85rem', color: theme.text, marginTop: '0.5rem' }}>
                  Pass requirement: {level.pass}%
                </div>
              </div>
            </>
          )}

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: theme.accent, fontSize: '0.9rem', marginBottom: '0.75rem' }}>LEVELS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {LEVELS.map((l, idx) => (
                <LevelButton
                  key={l.name}
                  theme={theme}
                  active={idx === levelIdx}
                  unlocked={unlocked[idx]}
                  onClick={() => unlocked[idx] && setLevelIdx(idx)}
                >
                  {l.name} {unlocked[idx] ? '✓' : '🔒'}
                </LevelButton>
              ))}
            </div>
          </div>
        </LeftPanel>

        <RightPanel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%', justifyContent: 'center' }}>
            {showSummary ? (
              <Card
                theme={theme}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  {passed ? '🎉' : '😅'}
                </div>
                <h2 style={{ color: theme.accent, marginTop: 0 }}>
                  {level.name} Complete!
                </h2>
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: 800, 
                  color: passed ? theme.correct : theme.wrong,
                  margin: '1rem 0'
                }}>
                  {percent}%
                </div>
                <p style={{ color: theme.text, fontSize: '1.1rem' }}>
                  You got <strong>{score} out of {questions.length}</strong> correct!
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {!passed && (
                    <OptionButton
                      as="button"
                      theme={theme}
                      onClick={handleRetry}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ width: 'auto', background: theme.accent }}
                    >
                      🔄 Retry Level
                    </OptionButton>
                  )}
                  {passed && levelIdx < LEVELS.length - 1 && (
                    <OptionButton
                      as="button"
                      theme={theme}
                      onClick={handleNextLevel}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ width: 'auto', background: theme.correct }}
                    >
                      ➡️ Next Level
                    </OptionButton>
                  )}
                  {passed && levelIdx === LEVELS.length - 1 && (
                    <div style={{ 
                      color: theme.correct, 
                      fontWeight: 700, 
                      fontSize: '1.2rem',
                      padding: '1rem',
                      background: `${theme.correct}22`,
                      borderRadius: '8px'
                    }}>
                      🏆 All levels complete! You're a cybersecurity expert!
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <AnimatePresence mode="wait">
                <Card
                  key={qIdx}
                  theme={theme}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ 
                    fontSize: '2.5rem', 
                    marginBottom: '1rem',
                    filter: 'grayscale(20%)'
                  }}>
                    {qIdx % 2 === 0 ? '🔐' : '🛡️'}
                  </div>
                  
                  <QuestionText theme={theme}>{current.question}</QuestionText>

                  <div style={{ marginTop: '1.5rem' }}>
                    {current.options.map((opt, idx) => (
                      <OptionButton
                        key={opt}
                        theme={theme}
                        selected={selected === opt}
                        isCorrect={selected === opt && opt === current.correct}
                        isWrong={selected === opt && opt !== current.correct}
                        disabled={selected !== null}
                        onClick={() => handleOption(opt)}
                        whileHover={{ scale: selected ? 1 : 1.02 }}
                        whileTap={{ scale: selected ? 1 : 0.98 }}
                      >
                        <span style={{ 
                          minWidth: '24px', 
                          height: '24px', 
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.9rem'
                        }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                        {selected === opt && (
                          <span style={{ marginLeft: 'auto' }}>
                            {opt === current.correct ? '✓' : '✗'}
                          </span>
                        )}
                      </OptionButton>
                    ))}
                  </div>

                  {selected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ 
                        marginTop: '1.5rem',
                        padding: '1rem',
                        borderRadius: '8px',
                        background: selected === current.correct ? `${theme.correct}22` : `${theme.wrong}22`,
                        color: selected === current.correct ? theme.correct : theme.wrong,
                        fontWeight: 700,
                        border: `2px solid ${selected === current.correct ? theme.correct : theme.wrong}`
                      }}
                    >
                      {selected === current.correct ? '✅ Correct! Great job!' : '❌ Incorrect. The correct answer is: ' + current.correct}
                    </motion.div>
                  )}
                </Card>
              </AnimatePresence>
            )}
          </div>
        </RightPanel>
      </SplitScreen>
    </ThemeProvider>
  );
}