import React from "react";
import * as S from "./DoneTrash.style";
import { Trash } from "../../icons";
export default function DoneTrash() {
  return (
    <>
      <S.DoneTrashContainer>
        <S.DoneBox>완료</S.DoneBox>
        <Trash />
      </S.DoneTrashContainer>
    </>
  );
}
