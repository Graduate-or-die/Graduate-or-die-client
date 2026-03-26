import styled from "@emotion/styled";
export const PopContainer = styled.div`
  width: 93px;
  height: 57px;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const PopBox = styled.div<{ $cancel?: boolean }>`
  color: #555;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: ${({ $cancel }) => ($cancel ? "#9E9E9E" : "#222")};
  cursor: pointer;
`;
