import styled from "@emotion/styled";
export const MateHomeWrapper = styled.div`
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const BadgeContainer = styled.div`
  width: 100%;
  max-width: 364px;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  pointer: cursor;
`;
export const TabBadge = styled.div`
  width: 88px;
  height: 28px;
  border-radius: 25.672px;
  background: rgba(178, 232, 255, 0.5);
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;
export const BadgeText = styled.span`
  color: #006f8e;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  display: flex;
  justify-content: center;
  text-align: center;
`;
export const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
`;

export const ContentWrapper = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  padding-bottom: 150px;
`;
