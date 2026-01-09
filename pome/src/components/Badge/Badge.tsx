import React from "react";
import * as S from "./Badge.style";
interface BadgeProps {
  label: string;
  height?: number;
  fontSize?: number;
}
export default function Badge({ label, height, fontSize }: BadgeProps) {
  return (
    <S.BadgeTag height={height}>
      <S.BadgeText fontSize={fontSize}>#{label}</S.BadgeText>
    </S.BadgeTag>
  );
}
