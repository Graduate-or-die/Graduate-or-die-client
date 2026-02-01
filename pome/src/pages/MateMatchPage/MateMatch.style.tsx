import styled from "@emotion/styled";
export const PageContainer = styled.div`
  position: relative;
  min-height: 100dvh;
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
`;
export const MatchWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const MateMatchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
export const MateMatchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 18px;
  position: relative;
`;
export const MatchEffectImg = styled.img`
  position: relative;
  z-index: 1;
  animation: pop 0.4s ease-out forwards;

  @keyframes pop {
    0% {
      transform: scale(0.85);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const PomeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PomeLeft = styled.div`
  transform: scaleX(-1);
`;
export const PomeEffect = styled.div`
  animation: popIn 0.6s ease-out forwards;

  @keyframes popIn {
    0% {
      opacity: 1;
      transform: translateY(6px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
export const MatchPhrase = styled.div`
  color: #313334;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
`;
