import styled from "@emotion/styled";
export const SearchContainer = styled.div`
  width: 330px;
  min-height: 32px;
  border-radius: 20px;
  border: 0.7px solid #006f8e;
  background: rgba(206, 214, 216, 0.3);
  margin: 10px auto;
  padding: 0 30px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

export const SearchBox = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: #5b5b5b;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 300px;
  text-align: center;
`;
export const RecommendContainer = styled.div`
  width: 315px;
  min-height: 630px;
  margin: 0 auto;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 100px;
  position: relative;
`;
export const HeartBox = styled.div`
  width: 60px;
  display: flex;
  gap: 7px;
  margin: 20px 26px 0 240px;
`;
export const HeartCounter = styled.div`
  color: #5b5b5b;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 3px;
`;
export const ProfileImageBox = styled.div`
  display: flex;
  margin: 0 80px 20px;
`;
export const NickNameBox = styled.div`
  color: #313334;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 30px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  height: 25px;
  margin: 0 auto 36px;
`;
export const SlideBox = styled.div<{ isHidden: boolean }>`
  display: flex;
  gap: 260px;
  align-items: center;
  justify-content: center;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};
  pointer-events: ${({ isHidden }) => (isHidden ? "none" : "auto")};
`;
export const SlideIcon = styled.div``;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px;
  gap: 6px;
  flex: 1;
`;
export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 30px;
`;
export const KeyBox = styled.div`
  color: #5b5b5b;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const ValueBox = styled.div`
  color: #313334;
  font-family: "Pretendard Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  white-space: normal;
`;
export const MatchingButton = styled.button`
  width: 126px;
  height: 26px;
  border-radius: 20px;
  background: #313334;
  color: #fff;
  font-family: "Pretendard Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 35px;
  align-self: center;
`;
