import styled from "@emotion/styled";
export const BadgeTag = styled.div<{ height?: number }>`
  display: inline-flex;
  height: ${({ height }) => (height ? `${height}px` : "33px")};
  padding: 0 16px;
  flex-shrink: 0;
  border-radius: 30px;
  background: rgba(178, 232, 255, 0.5);
  justify-content: center;
  align-items: center;
`;

export const BadgeText = styled.span<{ fontSize?: number }>`
  color: #006f8e;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "20px")};
  font-weight: 500;
  line-height: 24px;
  display: flex;
  justify-content: center;
  text-align: center;
`;
