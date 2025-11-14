import React from "react";
import * as S from "./HomeBadge.style";
interface BadgeProps {
  label: string;
}
export default function HomeBadge({ label }: BadgeProps) {
  return (
    <S.BadgeTag>
      <S.BadgeText>#{label}</S.BadgeText>
    </S.BadgeTag>
  );
}
