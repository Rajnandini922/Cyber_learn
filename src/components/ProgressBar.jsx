import styled from "styled-components";
const Bar = styled.div`
  width: 80%;
  height: 16px;
  background: #eee;
  border-radius: 8px;
  margin: 1rem 0;
  overflow: hidden;
`;
const Fill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.progress};
  width: ${({ progress }) => progress}%;
  transition: width 0.5s;
`;

export default function ProgressBar({ progress }) {
  return (
    <Bar>
      <Fill progress={progress} />
    </Bar>
  );
}
