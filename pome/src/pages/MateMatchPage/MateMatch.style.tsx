import styled from "@emotion/styled";
export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 20px;
  padding-top: 20px;
`;
export const MateMatchContainer = styled.div`
  display: flex;
  justify-constent: center;
  margin: 0 auto;
  margin-top: 155px;
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
