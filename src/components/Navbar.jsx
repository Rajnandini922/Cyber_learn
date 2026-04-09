import React, { useState } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

const Nav = styled.nav`
  background: linear-gradient(90deg, #020617, #020617 60%, #0b1120);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(148, 163, 184, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.accent};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
  }
`;

/* use React Router NavLink so active class is available */
const NavLink = styled(RouterNavLink)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 600;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-color 0.3s;

  &.active {
    color: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accent};
  }

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: #fff;
  }
`;

const UserName = styled.div`
  color: ${({ theme }) => theme.text};
  font-weight: 700;
`;

export default function Navbar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const userName = localStorage.getItem("cyberUserName");

  return (
    <Nav>
      <Logo href="/">🛡️ CyberLearn</Logo>
      <MenuButton onClick={() => setOpen(!open)}>☰</MenuButton>
      <NavLinks open={open}>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {userName && <UserName>{userName}</UserName>}
        {onLogout && (
          <LogoutButton type="button" onClick={onLogout}>
            Logout
          </LogoutButton>
        )}
      </div>
    </Nav>
  );
}
