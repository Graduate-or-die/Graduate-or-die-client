import styled from "@emotion/styled";
export const Header = styled.div`
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
export const HeaderBox = styled.div`
  width: 100%;
  flex-direction: row;
  display: inline-flex;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
  transform: rotate(180deg);
`;
export const EmptyBox = styled.div`
  width: 52px;
`;
export const IconBox = styled.div`
  width: 52px;
  display: inline-flex;
  gap: 10px;
`;
