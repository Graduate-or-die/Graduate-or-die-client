import styled from "@emotion/styled";
export const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ChatContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  padding: 90px 25px 200px;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;
export const BottomArea = styled.div`
  width: 100%;
  position: fixed;
  bottom: env(safe-area-inset-bottom);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: env(safe-area-inset-bottom);
`;
export const AIArea = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  display: flex;
`;
