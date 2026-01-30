import React, { useState } from "react";
import * as S from "./AIquestion.style";
import { Star } from "../../icons";
import HomeBadge from "../HomeBadge";
type AIquestionProps = {
  onSelectQuestion: (text: string) => void;
};

export default function AIquestion({ onSelectQuestion }: AIquestionProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <S.AiWrapper>
        <S.AIContainer expanded={expanded}>
          <S.Header
            expanded={expanded}
            onClick={() => setExpanded((prev) => !prev)}
          >
            <Star />
            AI 면접 질문 리스트
          </S.Header>

          {expanded && (
            <S.AIBox>
              <S.HomeBageBox>
                <HomeBadge
                  label="프로젝트 중 힘들었던 점"
                  onClick={onSelectQuestion}
                ></HomeBadge>
              </S.HomeBageBox>
              <S.HomeBageBox>
                <HomeBadge
                  label="평소에도 이러한 활동을 주체적으로 하나요?"
                  onClick={onSelectQuestion}
                ></HomeBadge>
              </S.HomeBageBox>
              <S.HomeBageBox>
                <HomeBadge
                  label="성격의 장단점과 고치고 싶은 부분?"
                  onClick={onSelectQuestion}
                ></HomeBadge>
              </S.HomeBageBox>
            </S.AIBox>
          )}
        </S.AIContainer>
      </S.AiWrapper>
    </>
  );
}
