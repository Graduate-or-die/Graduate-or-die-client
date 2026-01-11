import styled from "@emotion/styled";
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

export const HomeMenu = styled.div`
  margin-top: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
`;
export const AiTagContainer = styled.div`
  width: 100%;
  padding: 0 34px;
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
