import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { SplitScreen, LeftPanel, RightPanel } from "./GameSplitScreen";
import { levelThemes } from "../theme/levelThemes";

// --- Level data ---
const LEVELS = [
  {
    name: "Beginner",
    pass: 60,
    questions: [
      {
        question: "What is the main purpose of a firewall?",
        options: [
          "To store passwords",
          "To block unauthorized access",
          "To speed up the internet",
          "To encrypt files"
        ],
        correct: "To block unauthorized access"
      },
      {
        question: "Which type of firewall filters traffic based on IP address and port?",
        options: [
          "Packet-filtering firewall",
          "Proxy firewall",
          "Stateful firewall",
          "Application firewall"
        ],
        correct: "Packet-filtering firewall"
      },
      {
        question: "Which of these is NOT a firewall type?",
        options: [
          "Packet-filtering",
          "Circuit-level gateway",
          "Antivirus firewall",
          "Application-level gateway"
        ],
        correct: "Antivirus firewall"
      }
    ]
  },
  {
    name: "Intermediate",
    pass: 70,
    questions: [
      {
        question: "A firewall that tracks the state of active connections is called?",
        options: [
          "Stateless firewall",
          "Stateful firewall",
          "Proxy firewall",
          "Application firewall"
        ],
        correct: "Stateful firewall"
      },
      {
        question: "Which firewall can inspect traffic at the application layer?",
        options: [
          "Packet-filtering firewall",
          "Stateful firewall",
          "Application firewall",
          "Circuit-level gateway"
        ],
        correct: "Application firewall"
      },
      {
        question: "What does a proxy firewall do?",
        options: [
          "Blocks all traffic",
          "Acts as an intermediary between users and the internet",
          "Encrypts all data",
          "Stores passwords"
        ],
        correct: "Acts as an intermediary between users and the internet"
      }
    ]
  },
  {
    name: "Expert",
    pass: 80,
    questions: [
      {
        question: "Which is a limitation of packet-filtering firewalls?",
        options: [
          "Cannot filter based on IP address",
          "Cannot filter based on port",
          "Cannot inspect packet payload",
          "Cannot block traffic"
        ],
        correct: "Cannot inspect packet payload"
      },
      {
        question: "What is a DMZ in firewall terminology?",
        options: [
          "A type of malware",
          "A secure area inside the firewall",
          "A network segment that is exposed to the internet",
          "A VPN protocol"
        ],
        correct: "A network segment that is exposed to the internet"
      },
      {
        question: "Which firewall type is best for protecting web applications?",
        options: [
          "Packet-filtering firewall",
          "Web Application Firewall (WAF)",
          "Circuit-level gateway",
          "Stateful firewall"
        ],
        correct: "Web Application Firewall (WAF)"
      }
    ]
  }
];

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 18px;
  box-shadow: 0 4px 24px #0008;
  padding: 2rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 500px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const OptionButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.card};
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  margin: 0.5rem 0;
  font-size: 1.1rem;
  width: 100%;
  font-weight: bold;
  box-shadow: 0 2px 8px #0003;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => theme.correct};
    color: #fff;
  }
`;

const LevelButton = styled.button`
  background: ${({ theme, active }) => (active ? theme.accent : "#232b3e")};
  color: ${({ theme, active }) => (active ? theme.card : theme.text)};
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1.2rem;
  margin: 0 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  opacity: ${({ unlocked }) => (unlocked ? 1 : 0.5)};
  cursor: ${({ unlocked }) => (unlocked ? "pointer" : "not-allowed")};
  border: ${({ active, theme }) => (active ? `2px solid ${theme.correct}` : "none")};
`;

export default function FirewallQuizGame() {
  const [levelIdx, setLevelIdx] = useState(
    Number(localStorage.getItem("firewallQuizLevel")) || 0
  );
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Unlock logic
  const [unlocked, setUnlocked] = useState(
    JSON.parse(localStorage.getItem("firewallQuizUnlocked") || "[true,false,false]")
  );

  const level = LEVELS[levelIdx];
  const theme = levelThemes[levelIdx];
  const questions = level.questions;
  const current = questions[qIdx];

  useEffect(() => {
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setShowSummary(false);
  }, [levelIdx]);

  function handleOption(opt) {
    setSelected(opt);
    if (opt === current.correct) setScore(s => s + 1);
    setTimeout(() => {
      setSelected(null);
      if (qIdx < questions.length - 1) {
        setQIdx(q => q + 1);
      } else {
        setShowSummary(true);
      }
    }, 700);
  }

  function handleNextLevel() {
    const next = levelIdx + 1;
    setLevelIdx(next);
    localStorage.setItem("firewallQuizLevel", next);
    setUnlocked(prev => {
      const arr = [...prev];
      arr[next] = true;
      localStorage.setItem("firewallQuizUnlocked", JSON.stringify(arr));
      return arr;
    });
  }

  function handleRetry() {
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setShowSummary(false);
  }

  // Unlock next level if passed
  useEffect(() => {
    if (showSummary) {
      const percent = Math.round((score / questions.length) * 100);
      if (percent >= level.pass && levelIdx < LEVELS.length - 1) {
        setUnlocked(prev => {
          const arr = [...prev];
          arr[levelIdx + 1] = true;
          localStorage.setItem("firewallQuizUnlocked", JSON.stringify(arr));
          return arr;
        });
      }
    }
  }, [showSummary, score, questions.length, level.pass, levelIdx]);

  // Level selector
  const levelSelector = (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      {LEVELS.map((l, idx) => (
        <LevelButton
          key={l.name}
          theme={levelThemes[idx]}
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
      <SplitScreen>
        <LeftPanel>
          <h2 style={{ color: theme.accent }}>{level.name} Level</h2>
          <div style={{ margin: "1rem 0", color: theme.text }}>
            <b>Progress:</b> {qIdx + 1} / {questions.length}
            <br />
            <b>Score:</b> {score}
          </div>
          {levelSelector}
        </LeftPanel>
        <RightPanel>
          {showSummary ? (
            <Card
              theme={theme}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <h2>{level.name} Level Complete!</h2>
              <p>
                Score: <strong>{score} / {questions.length}</strong>
              </p>
              <p>
                Qualification: <strong>{score / questions.length * 100 >= level.pass ? "Passed 🎉" : "Try Again 😅"}</strong>
              </p>
              {score / questions.length * 100 >= level.pass && levelIdx < LEVELS.length - 1 && (
                <OptionButton theme={theme} onClick={handleNextLevel}>
                  Next Level ➡️
                </OptionButton>
              )}
              {score / questions.length * 100 < level.pass && (
                <OptionButton theme={theme} onClick={handleRetry}>
                  Retry Level 🔄
                </OptionButton>
              )}
              {score / questions.length * 100 >= level.pass && levelIdx === LEVELS.length - 1 && (
                <div style={{ marginTop: 12, fontWeight: 600, color: theme.accent }}>
                  All levels complete! 🏆
                </div>
              )}
            </Card>
          ) : (
            <Card
              theme={theme}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <h2 style={{ color: theme.accent }}>Firewall Quiz 🔥</h2>
              <h3 style={{ margin: "1rem 0" }}>{current.question}</h3>
              {current.options.map(opt => (
                <OptionButton
                  theme={theme}
                  key={opt}
                  disabled={selected !== null}
                  style={{
                    background:
                      selected === opt
                        ? opt === current.correct
                          ? theme.correct
                          : theme.wrong
                        : theme.accent,
                    color:
                      selected === opt
                        ? "#fff"
                        : theme.card
                  }}
                  onClick={() => handleOption(opt)}
                  aria-label={`Option: ${opt}`}
                >
                  {opt}
                </OptionButton>
              ))}
              {selected && (
                <div style={{ marginTop: "1rem" }}>
                  {selected === current.correct ? "✅ Correct!" : "❌ Incorrect."}
                </div>
              )}
            </Card>
          )}
        </RightPanel>
      </SplitScreen>
    </ThemeProvider>
  );
}