import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import basicQuestions from "../data/basicQuestions.json";
import mediumQuestions from "../data/mediumQuestions.json";
import hardQuestions from "../data/hardQuestions.json";

const levels = [
  {
    name: "Basic",
    questions: basicQuestions,
    passPercent: 50,
    color: "#B3E5FC",
    description: "Start with fundamental firewall concepts and port basics.",
  },
  {
    name: "Medium",
    questions: mediumQuestions,
    passPercent: 65,
    color: "#FFD600",
    description: "Intermediate firewall rules and network scenarios.",
  },
  {
    name: "Hard",
    questions: hardQuestions,
    passPercent: 80,
    color: "#FF8A65",
    description: "Advanced firewall logic and tricky security situations.",
  },
];

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(90deg, #e1f5fe 0%, #fffde7 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizCard = styled(motion.div)`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px #b3e5fc44;
  padding: 2rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 480px;
  text-align: center;
`;

const OptionButton = styled(motion.button)`
  background: ${({ selected, correct, wrong }) =>
    selected ? (correct ? "#A5D6A7" : wrong ? "#FF8A65" : "#B3E5FC") : "#E1F5FE"};
  color: #232b3e;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  margin: 0.5rem 0;
  font-size: 1.1rem;
  width: 100%;
  font-weight: bold;
  box-shadow: 0 2px 8px #b3e5fc55;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #b3e5fc;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 480px;
  height: 12px;
  background: #e0e0e0;
  border-radius: 8px;
  margin: 1rem 0;
  overflow: hidden;
  > div {
    height: 100%;
    background: #4f8cff;
    border-radius: 8px;
    transition: width 0.4s;
  }
`;

const ExplanationBox = styled.div`
  background: #e1f5fe;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  color: #232b3e;
  box-shadow: 0 2px 8px #b3e5fc33;
`;

function getPercent(score, total) {
  return Math.round((score / total) * 100);
}

export default function FirewallBuilderGame() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [selected, setSelected] = useState(null);

  const level = levels[levelIdx];
  const questions = level.questions;
  const current = questions[qIdx];

  useEffect(() => {
    setSelected(null);
  }, [qIdx, levelIdx]);

  function handleOption(option) {
    if (selected !== null) return;
    setSelected(option);
    const isCorrect = option === current.correct;
    setAnswers([
      ...answers,
      {
        ...current,
        userAnswer: option,
        correct: isCorrect,
      },
    ]);
    if (isCorrect) setScore((s) => s + 1);
    setTimeout(() => {
      if (qIdx < questions.length - 1) {
        setQIdx(qIdx + 1);
      } else {
        setShowSummary(true);
      }
    }, 700);
  }

  function handleNextLevel() {
    setLevelIdx(levelIdx + 1);
    setQIdx(0);
    setScore(0);
    setAnswers([]);
    setShowSummary(false);
  }

  function handleRetry() {
    setQIdx(0);
    setScore(0);
    setAnswers([]);
    setShowSummary(false);
  }

  // Progress bar percent
  const progress = ((qIdx + (showSummary ? 1 : 0)) / questions.length) * 100;

  // Summary logic
  if (showSummary) {
    const percent = getPercent(score, questions.length);
    const qualified = percent >= level.passPercent;
    return (
      <Container>
        <Navbar />
        <QuizCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 style={{ color: level.color }}>{level.name} Level Complete!</h2>
          <p>
            Score: <strong>{score} / {questions.length}</strong> ({percent}%)
          </p>
          <p>
            Qualification: <strong>{qualified ? "Passed 🎉" : "Try Again 😅"}</strong>
          </p>
          <ExplanationBox>
            <h3>Review & Explanations</h3>
            <ul style={{ textAlign: "left", paddingLeft: 0 }}>
              {answers.map((ans, idx) => (
                <li key={idx} style={{ marginBottom: "1rem", listStyle: "none" }}>
                  <strong>Q{idx + 1}: {ans.question}</strong><br />
                  <span>
                    <span style={{ color: ans.correct ? "#388e3c" : "#d32f2f" }}>
                      Your Answer: {ans.userAnswer}
                    </span>
                    {" | "}
                    <span style={{ color: "#1976d2" }}>
                      Correct: {ans.correct ? "✔️" : ans.correct === false ? ans.correct : ans.correct}
                    </span>
                  </span>
                  <br />
                  <em>{ans.explanation}</em>
                </li>
              ))}
            </ul>
          </ExplanationBox>
          {qualified && levelIdx < levels.length - 1 && (
            <button
              style={{
                background: "#FFD600",
                color: "#232B3E",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "0.8rem 1.5rem",
                fontSize: "1.1rem",
                margin: "1rem 0",
              }}
              onClick={handleNextLevel}
            >
              Next Level ➡️
            </button>
          )}
          {!qualified && (
            <button
              style={{
                background: "#FF8A65",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "0.8rem 1.5rem",
                fontSize: "1.1rem",
                margin: "1rem 0",
              }}
              onClick={handleRetry}
            >
              Retry Level 🔄
            </button>
          )}
        </QuizCard>
      </Container>
    );
  }

  // Quiz question UI
  return (
    <Container>
      <Navbar />
      <QuizCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: level.color }}>{level.name} Level</h2>
        <p>{level.description}</p>
        <ProgressBar>
          <div style={{ width: `${progress}%` }} />
        </ProgressBar>
        <h3>
          Question {qIdx + 1} / {questions.length}
        </h3>
        <p style={{ fontWeight: "bold", fontSize: "1.15rem" }}>{current.question}</p>
        <div>
          {current.options.map((opt) => (
            <OptionButton
              key={opt}
              selected={selected === opt}
              correct={selected === opt && opt === current.correct}
              wrong={selected === opt && opt !== current.correct}
              onClick={() => handleOption(opt)}
              whileTap={{ scale: 0.96 }}
            >
              {opt}
            </OptionButton>
          ))}
        </div>
        {selected && (
          <ExplanationBox>
            {selected === current.correct ? "✅ Correct!" : "❌ Incorrect."}
            <br />
            <span>{current.explanation}</span>
          </ExplanationBox>
        )}
      </QuizCard>
    </Container>
  );
}