import styled from "@emotion/styled";
export const CommentContainer = styled.div<{
  $checked: boolean;
  $deleteMode: boolean;
}>`
  width: 100%;
  min-height: 62px;
  border-radius: 20px;
  display: flex;
  padding: 14px;
  cursor: ${({ $deleteMode }) => ($deleteMode ? "pointer" : "default")};
  background-color: ${({ $checked, $deleteMode }) =>
    $deleteMode && $checked
      ? "rgba(0, 111, 142, 0.15)"
      : "rgba(154, 229, 255, 0.3)"};

  box-shadow: ${({ $checked, $deleteMode }) =>
    $deleteMode && $checked
      ? "0 0 0 1px rgba(0, 111, 142, 0.25) inset"
      : "none"};
  * {
    pointer-events: none;
  }
`;
export const CommentRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

export const ProfileBox = styled.div`
  width: 39px;
  height: 39px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

export const CommentBox = styled.div`
  color: #555;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 10px;
  display: flex;
  align-items: center;
  min-height: 39px;
`;
