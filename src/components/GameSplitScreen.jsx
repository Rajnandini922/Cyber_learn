// GameSplitScreen.jsx
import styled from "styled-components";

export const SplitScreen = styled.div`
  min-height: calc(100vh - 64px);          /* under navbar */
  width: 100vw;
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  background: radial-gradient(circle at top, #450a0a 0%, #020617 55%, #020617 100%);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;           /* stack on small screens */
  }
`;

export const LeftPanel = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const RightPanel = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;                /* centers the card horizontally */
`;




export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
`;