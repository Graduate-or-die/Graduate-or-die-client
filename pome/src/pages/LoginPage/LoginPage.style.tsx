import styled from "@emotion/styled";
export const PomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 350px;
`;
export const PomeBox = styled.div`
  color: #006f8e;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const KakaoContainer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 330px;
  height: 46px;
  left: 50%;
  transform: translateX(-50%);
  flex-shrink: 0;
  border-radius: 50px;
  background: #fde500;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    position: absolute;
    left: 18px;
  }
`;
export const KakaoBox = styled.div`
  color: #313334;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 100%;
  justify-content: center;
`;
