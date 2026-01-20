import styled from "@emotion/styled";
export const MateHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 14px;
`;
export const CenterWrapper = styled.div`
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
export const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
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
  padding-top: 90px;
  padding-bottom: 150px;
`;

export const HomeMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 14px;
`;
