import React from 'react';
import * as S from './Badge.style';
interface BadgeProps {
  label: string;
}
export default function Badge({label}: BadgeProps) {
  return (
    <S.BadgeTag>
      <S.BadgeText>{label}</S.BadgeText>
    </S.BadgeTag>
  );
}
