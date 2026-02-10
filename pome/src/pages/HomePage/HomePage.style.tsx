import styled from "@emotion/styled";
export const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
`;

export const CenterWrapper = styled.div`
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  padding-top: 90px;
  padding-bottom: 150px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HomeMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 18px 15px;
`;

export const AiTagContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const AiTagBox = styled.div`
  color: #313334;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 3px;
`;

export const TabBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 10;
  height: 56px;
`;
