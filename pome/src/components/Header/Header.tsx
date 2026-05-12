import React from "react";
import * as S from "./Header.style";
import { ArrowLeft, PomeLogo, Down } from "../../icons";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  showDownload?: boolean;
  handleDownload?: () => void;
};

export default function Header({
  showDownload = false,
  handleDownload,
}: HeaderProps) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <S.Header>
        <S.HeaderBox>
          <S.LeftBox>
            <button onClick={goBack}>
              <ArrowLeft />
            </button>
          </S.LeftBox>
          <PomeLogo />
          <S.RightBox>
            {showDownload && <Down onClick={handleDownload} />}
          </S.RightBox>
        </S.HeaderBox>
      </S.Header>
    </>
  );
}
