import React from "react";
import * as S from "./HomeBadge.style";
interface BadgeProps {
  label: string;
  onClick?: (label: string) => void;
}
export default function HomeBadge({ label, onClick }: BadgeProps) {
  return (
    <S.BadgeTag onClick={() => onClick?.(label)}>
      <S.BadgeText>{label}</S.BadgeText>
    </S.BadgeTag>
  );
}
