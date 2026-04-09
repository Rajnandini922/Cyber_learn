import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
`;

const Card = styled(motion.div)`
  background: #020617;
  border-radius: 20px;
  padding: 3rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.9);
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.accent};
  margin: 0 0 0.5rem;
  font-size: 2.3rem;
  font-weight: 800;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0 0 2rem;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  margin-bottom: 1.25rem;
  background: #020617;
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.accent};
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.9rem;
  background: ${({ theme }) => theme.accent};
  color: #0b1120;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function LandingPage({ onNameSubmit }) {
  const [name, setName] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onNameSubmit?.(name.trim());
  }

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Title>🛡️ CyberLearn</Title>
        <Subtitle>Interactive cybersecurity learning — short lessons and fun games.</Subtitle>

        <form onSubmit={submit} aria-label="Enter your name">
          <Input
            aria-label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={!name.trim()}
            aria-disabled={!name.trim()}
          >
            Get Started
          </Button>
        </form>
      </Card>
    </Container>
  );
}