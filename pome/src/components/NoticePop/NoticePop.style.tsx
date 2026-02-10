import styled from "@emotion/styled";
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(101, 101, 101, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

export const NoticeContainer = styled.div`
  width: 367px;
  height: 219px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
export const NoticeBox = styled.div`
  color: #313334;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  margin: 28px auto;
  justify-content: center;
`;
export const MateNameBox = styled.div`
  color: #313334;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const CloseContainer = styled.div`
  width: 126px;
  height: 26px;
  border-radius: 20px;
  background: #313334;
  display: flex;
  margin: 24px auto;
  justify-content: center;
  cursor: pointer;
`;
export const CloseBox = styled.div`
  color: #fff;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
