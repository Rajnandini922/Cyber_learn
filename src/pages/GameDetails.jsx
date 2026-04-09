import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { levelThemes } from "../theme/levelThemes";

/* Red / black background */
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #450a0a 0%, #020617 55%, #020617 100%);
`;

/* Card */
const Card = styled(motion.div)`
  background: #020617;
  border: 1px solid rgba(248, 113, 113, 0.5);
  border-radius: 18px;
  padding: 1.8rem 2rem;
  width: 520px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.9);
`;

const Title = styled.h2`
  color: #f97373;
  margin: 0 0 0.5rem 0;
`;

const Desc = styled.p`
  color: #e5e7eb;
  margin: 0 0 1.2rem 0;
`;

const Button = styled.button`
  background: ${({ variant }) =>
    variant === "secondary"
      ? "#374151"
      : "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)"};
  color: ${({ variant }) => (variant === "secondary" ? "#e5e7eb" : "#f9fafb")};
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 0.2rem;
  box-shadow: 0 0 0 rgba(248, 113, 113, 0);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ variant }) =>
      variant === "secondary"
        ? "0 0 0"
        : "0 0 18px rgba(248, 113, 113, 0.6)"};
  }
`;

const GAME_META = {
  flashcards: {
    title: "Flashcards",
    desc: "Review key cybersecurity terms.",
    route: "/flashcards"
  },
  puzzlematch: {
    title: "Puzzle Match",
    desc: "Match terms and definitions.",
    route: "/puzzlematch"
  },
  quiztime: {
    title: "Quiz Time",
    desc: "Timed multiple-choice quizzes.",
    route: "/quiztime"
  },
  spottheattack: {
    title: "Spot the Attack",
    desc: "Identify suspicious scenarios.",
    route: "/spottheattack"
  },
  memorymatch: {
    title: "Memory Match",
    desc: "Match cybersecurity term pairs.",
    route: "/memorymatch"
  }
};

export default function GameDetails() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const meta =
    GAME_META[gameId] || { title: "Game", desc: "Start the game", route: "/" };

  // levelThemes still used by children if needed
  const theme = levelThemes[0];

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Title>{meta.title}</Title>
        <Desc>{meta.desc}</Desc>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => navigate(meta.route)}>Start Game</Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </Card>
    </Container>
  );
}
