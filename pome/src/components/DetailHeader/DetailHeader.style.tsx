import styled from "@emotion/styled";
export const DetailHeader = styled.div`
  width: 100%;
  height: 70px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 30px 30px 0 0;
  background: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  transform: rotate(180deg);
  position: fixed;
`;
export const DetailHeaderBox = styled.div`
  width: 100%;
  flex-direction: row;
  display: inline-flex;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
  transform: rotate(180deg);
`;
export const LeftBox = styled.div`
  display: flex;
  align-items: center;
  color: #313334;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  gap: 10px;
  svg {
    position: relative;
    top: 4px;
  }
`;
