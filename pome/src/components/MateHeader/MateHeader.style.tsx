import styled from "@emotion/styled";
export const Header = styled.div`
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
export const HeaderBox = styled.div`
  width: 100%;
  flex-direction: row;
  display: inline-flex;
  padding: 0 22px;
  justify-content: space-between;
  align-items: center;
`;
export const ProfileBox = styled.div`
  width: 39px;
  height: 39px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  svg {
    width: 100%;
    height: 100%;
  }
`;
export const AlarmBox = styled.div`
  width: 39px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
