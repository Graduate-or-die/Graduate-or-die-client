import styled from "@emotion/styled";
export const DetailHeader = styled.div`
  width: 100%;
  height: 70px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 0 0 30px 30px;
  background: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  max-width: 430px;
`;
export const DetailHeaderBox = styled.div`
  width: 100%;
  flex-direction: row;
  display: inline-flex;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
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
