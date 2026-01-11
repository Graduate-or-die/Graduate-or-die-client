import styled from "@emotion/styled";
export const TabBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  height: 82px;
  width: 100%;
  max-width: 430px;
  border-radius: 30px 30px 0 0;
  background: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  z-index: 1000;
`;
export const TextLabel = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#0086AB" : "#CED6D8")};
  font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 16px;
  &:active {
    opacity: 0.7;
  }
  flex-direction: column;
`;
