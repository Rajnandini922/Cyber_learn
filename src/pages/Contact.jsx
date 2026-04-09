import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { lightTheme } from "../theme/levelThemes";

// Dark red background
const Page = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at top, #450a0a 0%, #020617 55%, #020617 100%);
`;

// Centered content
const Content = styled.div`
  max-width: 540px;
  margin: 4rem auto 3rem auto;
  padding: 0 1.5rem;
`;

// Main card
const Card = styled.div`
  background: #020617;
  border-radius: 20px;
  padding: 2rem 2.4rem;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(248, 113, 113, 0.5);
`;

// Title
const Title = styled.h1`
  color: #f97373;
  margin: 0 0 0.5rem;
  text-align: center;
`;

// Form layout
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

// Inputs with red focus
const Input = styled.input`
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid rgba(75, 85, 99, 0.7);
  background: #020617;
  color: #e5e7eb;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #f97373;
    box-shadow: 0 0 0 1px #f97373;
  }
`;

const TextArea = styled.textarea`
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  border: 1px solid rgba(75, 85, 99, 0.7);
  background: #020617;
  color: #e5e7eb;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #f97373;
    box-shadow: 0 0 0 1px #f97373;
  }
`;

// Red gradient button with glow on hover
const Button = styled(motion.button)`
  padding: 0.95rem;
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  color: #f9fafb;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(248, 113, 113, 0.0);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 24px rgba(248, 113, 113, 0.6);
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 0.9rem;
  background: rgba(22, 163, 74, 0.15);
  color: #bbf7d0;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  border: 1px solid rgba(34, 197, 94, 0.5);
`;

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    // ThemeProvider still needs a theme object; visual styling uses red/black values above
    <ThemeProvider theme={lightTheme}>
      <Page>
        <Navbar />
        <Content>
          <Card>
            <Title>📧 Contact Us</Title>
            <p
              style={{
                textAlign: "center",
                color: "#e5e7eb",
                opacity: 0.8,
                marginBottom: "1.5rem"
              }}
            >
              Have feedback or suggestions? We&apos;d love to hear from you.
            </p>

            {submitted ? (
              <Message>✅ Thank you! Your message has been received.</Message>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <TextArea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
                <Button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </Button>
              </Form>
            )}
          </Card>
        </Content>
      </Page>
    </ThemeProvider>
  );
}
