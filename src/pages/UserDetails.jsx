import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.bgLeft} 50%, ${({ theme }) => theme.colors.bgRight} 50%);
`;

const Centered = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px #0003;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  font-size: 1rem;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.accentAlt};
  }
`;

export default function UserDetails() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("cybersecUserName", name.trim());
      navigate("/choose-topic");
    }
  };

  return (
    <Container>
      <Navbar />
      <Centered>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">Enter your preferred name:</Label>
          <Input
            id="username"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Alex, CyberNinja"
            required
          />
          <Button type="submit">Next</Button>
        </Form>
      </Centered>
    </Container>
  );
}
