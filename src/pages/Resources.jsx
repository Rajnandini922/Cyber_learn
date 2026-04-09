import React from "react";
import styled, { ThemeProvider } from "styled-components";
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
  max-width: 640px;
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
  margin: 0 0 1.8rem;
  text-align: center;
  font-size: 2rem;
`;

// Resource link with red hover glow
const ResourceLink = styled.a`
  display: block;
  padding: 1.1rem 1.2rem;
  background: #020617;
  border-radius: 12px;
  text-decoration: none;
  margin-bottom: 0.9rem;
  border: 1px solid rgba(75, 85, 99, 0.7);
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;

  &:hover {
    background: rgba(248, 113, 113, 0.12);
    border-color: rgba(248, 113, 113, 0.9);
    box-shadow: 0 0 24px rgba(248, 113, 113, 0.45);
    transform: translateY(-1px);
  }
`;

const ResourceTitle = styled.h3`
  margin: 0 0 0.4rem;
  color: #fca5a5;
  font-size: 1.05rem;
`;

const ResourceDesc = styled.p`
  margin: 0;
  color: #e5e7eb;
  opacity: 0.85;
  font-size: 0.9rem;
`;

const resources = [
  {
    title: "OWASP Top 10",
    desc: "Learn about the most critical web application security risks",
    url: "https://owasp.org/www-project-top-ten/"
  },
  {
    title: "Cybrary",
    desc: "Free cybersecurity training courses and certifications",
    url: "https://www.cybrary.it/"
  },
  {
    title: "HackTheBox",
    desc: "Practice penetration testing in a legal environment",
    url: "https://www.hackthebox.com/"
  },
  {
    title: "SANS Cyber Aces",
    desc: "Free tutorials covering key cybersecurity concepts",
    url: "https://www.cyberaces.org/"
  },
  {
    title: "NIST Cybersecurity Framework",
    desc: "Industry standards for managing cybersecurity risks",
    url: "https://www.nist.gov/cyberframework"
  }
];

export default function Resources() {
  return (
    // ThemeProvider still needs a theme object; page styling uses hard-coded red/black
    <ThemeProvider theme={lightTheme}>
      <Page>
        <Navbar />
        <Content>
          <Card>
            <Title>📚 Learning Resources</Title>
            {resources.map((resource, idx) => (
              <ResourceLink
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceDesc>{resource.desc}</ResourceDesc>
              </ResourceLink>
            ))}
          </Card>
        </Content>
      </Page>
    </ThemeProvider>
  );
}
