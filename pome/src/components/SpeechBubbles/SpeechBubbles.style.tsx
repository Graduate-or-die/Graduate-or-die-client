import styled from "@emotion/styled";
export const Wrapper = styled.div<{ $isMine: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isMine }) => ($isMine ? "flex-end" : "flex-start")};
  gap: 6px;
`;
export const Bubble = styled.div<{ $isMine: boolean,$selcted:boolean }>`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: ${({ $isMine }) =>
    $isMine ? " 20px 20px 0 20px" : "20px 20px 20px 0"};

  background-color: ${({ $isMine }) =>
    $isMine ? "rgba(154, 229, 255, 0.30)" : "#0086AB"};
   background-color: ${({ $isMine, $selcted }) => {
    if ($selcted) {
      return $isMine
        ? "rgba(137, 197, 217, 0.30)"
        : "#006783";
    }
    return $isMine
      ? "rgba(154, 229, 255, 0.30)"
      : "#0086AB";
  }};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`;
export const Contents = styled.div<{ $isMine: boolean }>`
  color: ${({ $isMine }) => ($isMine ? "#313334" : "#FFF")};
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  pointer-events: none;
`;
export const EtcBox = styled.div<{ $isMine: boolean }>`
  width: 39px;
  height: 39px;
  display: flex;
  justify-content: ${({ $isMine }) => ($isMine ? "flex-end" : "flex-start")};
  align-items: center;
`;
export const ProfileBox = styled.div`
  width: 39px;
  height: 39px;
  aspect-ratio: 1/1;
`;
export const PopBox = styled.div``;
