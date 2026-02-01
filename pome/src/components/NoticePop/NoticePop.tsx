import React from "react";
import * as S from "./NoticePop.style";
type NoticePopProps = {
  mateName: string;
  onClose: () => void;
};
export default function NoticePop({ mateName, onClose }: NoticePopProps) {
  return (
    <>
      <S.Overlay>
        <S.NoticeContainer>
          <S.NoticeBox>Notice</S.NoticeBox>
          <S.MateNameBox>
            {mateName}님은 이미 메이트가 존재합니다.
            <br />
            다른 메이트를 찾아보세요.
          </S.MateNameBox>
          <S.CloseContainer onClick={onClose}>
            <S.CloseBox>닫기</S.CloseBox>
          </S.CloseContainer>
        </S.NoticeContainer>
      </S.Overlay>
    </>
  );
}
