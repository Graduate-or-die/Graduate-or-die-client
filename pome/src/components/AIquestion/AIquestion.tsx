import React, { useState, useEffect } from "react";
import * as S from "./AIquestion.style";
import { Star } from "../../icons";
import HomeBadge from "../HomeBadge";
import { postInterview } from "../../apis/interview";
type AIquestionProps = {
  onSelectQuestion: (text: string) => void;
};

export default function AIquestion({ onSelectQuestion }: AIquestionProps) {
  const [expanded, setExpanded] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await postInterview();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);
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
              {questions.length === 0 && <div>질문을 생성 중이에요...</div>}
              {questions.map((q, idx) => {
                return (
                  <S.HomeBageBox key={idx}>
                    <HomeBadge label={q} onClick={() => onSelectQuestion(q)} />
                  </S.HomeBageBox>
                );
              })}
            </S.AIBox>
          )}
        </S.AIContainer>
      </S.AiWrapper>
    </>
  );
}
