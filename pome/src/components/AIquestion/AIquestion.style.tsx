import styled from "@emotion/styled";
export const AIContainer = styled.div<{ expanded: boolean }>`
  pointer-events: auto;
  width: ${({ expanded }) => (expanded ? "360px" : "140px")};
  height: ${({ expanded }) => (expanded ? "120px" : "40px")};
  border-radius: 15px;
  background: rgba(154, 229, 255, 0.3);
  transition:
    width 0.25s ease,
    height 0.25s ease,
    box-shadow 0.25s ease;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-left: ${({ expanded }) => (expanded ? "auto" : "20px")};
  margin-right: ${({ expanded }) => (expanded ? "auto" : "0")};
`;
export const AiWrapper = styled.div`
  position: fixed;
  bottom: 97px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  pointer-events: none;
`;

export const Header = styled.div<{ expanded: boolean }>`
  height: 40px;
  display: flex;
  color: #313334;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
  justify-content: ${({ expanded }) => (expanded ? "flex-start" : "center")};
  flex-shrink: 0;
  padding: ${({ expanded }) => (expanded ? "20px" : 0)};
`;
export const AIBox = styled.div`
  flex: 1;
  padding: 12px 14px;
  display: flex;
  gap: 8px;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  align-items: center;
`;
export const HomeBageBox = styled.div`
  padding: 4px;
`;
