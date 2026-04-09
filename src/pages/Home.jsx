// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>🚀 Cybersecurity Learning Platform</h1>
      <p>Test your knowledge with the Firewall Builder Game!</p>
      <Link to="/firewall-game-basic" style={{
        background: "#4F8CFF",
        color: "#fff",
        padding: "1rem 2rem",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "bold",
        display: "inline-block",
        marginTop: "1rem"
      }}>
        Start Basic Firewall Game
      </Link>
    </div>
  );
}
