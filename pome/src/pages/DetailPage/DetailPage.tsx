import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./DetailPage.style";
import { Trash, Plus } from "../../icons";
import DetailForm from "../../components/DetailForm";
import DetailHeader from "../../components/DetailHeader";
import { CategoryKey } from "../../constants/categories";
import TabBar from "../../components/TabBar";
import { DetailItem } from "../../types/detail";
import {
  getPortfolio,
  patchEducations,
  postExperiences,
  patchExperiences,
} from "../../apis/portfolio";

type ExperienceWithKey = DetailItem & {
  localId: string;
  experienceId?: number;
};

export default function DetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const navigate = useNavigate();
  const safeCategory = category as CategoryKey;

  const [isEditing] = useState(true);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [education, setEducation] = useState<DetailItem>({
    school: "",
    major: "",
    degree: "",
  });

  const [experiences, setExperiences] = useState<ExperienceWithKey[]>([]);
  const [originalExperiences, setOriginalExperiences] = useState<
    ExperienceWithKey[]
  >([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const eduData = await getPortfolio(1);
        const expData = await getPortfolio(2);

        const eduItems = eduData?.item?.items ?? [];
        if (eduItems.length > 0) {
          const edu = eduItems[0];
          setEducation({
            school: String(edu.school ?? ""),
            major: String(edu.major ?? ""),
            degree: String(edu.degree ?? ""),
          });
        }

        const expItems = expData?.item?.items ?? [];
        const mapped = expItems.map((exp: any) => ({
          experienceId: exp.experienceId,
          localId: `srv-${exp.experienceId}`,
          workplace: String(exp.workplace ?? ""),
          spot: String(exp.spot ?? ""),
          experienceStartAt: String(exp.experienceStartAt ?? ""),
          experienceEndAt: String(exp.experienceEndAt ?? ""),
        }));
        setExperiences(mapped);
        setOriginalExperiences(mapped);
      } catch (err) {
        console.error("포트폴리오 조회 실패", err);
      }
    };

    fetchPortfolio();
  }, []);

  const handleEducationChange = (value: DetailItem) => setEducation(value);

  const handleExperienceChange = (key: string, value: DetailItem) => {
    setExperiences((prev) =>
      prev.map((item) => (item.localId === key ? { ...item, ...value } : item)),
    );
  };

  const handleAdd = () => {
    const newExp: ExperienceWithKey = {
      localId: `tmp-${Date.now()}`,
      workplace: "",
      spot: "",
      experienceStartAt: "",
      experienceEndAt: "",
    };
    setExperiences((prev) => [...prev, newExp]);
  };

  const handleSelectMode = () => {
    setIsSelectMode(true);
    setSelectedIds([]);
  };

  const toggleSelect = (key: string) => {
    setSelectedIds((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key],
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      setIsSelectMode(false);
      return;
    }
    setExperiences((prev) =>
      prev.filter((item) => !selectedIds.includes(item.localId)),
    );
    setSelectedIds([]);
    setIsSelectMode(false);
  };

  const isValidDateFormat = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const handleDone = async () => {
    for (const exp of experiences) {
      if (
        exp.experienceStartAt &&
        !isValidDateFormat(String(exp.experienceStartAt))
      ) {
        alert("시작일은 YYYY-MM-DD 형식으로 입력해주세요.");
        return;
      }

      if (
        exp.experienceEndAt &&
        !isValidDateFormat(String(exp.experienceEndAt))
      ) {
        alert("종료일은 YYYY-MM-DD 형식으로 입력해주세요.");
        return;
      }
    }
    try {
      if (safeCategory === "education") {
        await patchEducations({
          school: String(education.school ?? ""),
          major: String(education.major ?? ""),
          degree: String(education.degree ?? ""),
        });

        const validExperiences = experiences.filter(
          (exp) =>
            exp.workplace ||
            exp.spot ||
            exp.experienceStartAt ||
            exp.experienceEndAt,
        );

        const updated = await Promise.all(
          validExperiences.map(async (exp) => {
            const original = originalExperiences.find(
              (o) => o.experienceId === exp.experienceId,
            );
            const payload = {
              workplace: String(exp.workplace),
              spot: String(exp.spot),
              experienceStartAt: String(exp.experienceStartAt),
              experienceEndAt: String(exp.experienceEndAt),
            };

            if (exp.experienceId) {
              if (
                original &&
                original.workplace === exp.workplace &&
                original.spot === exp.spot &&
                original.experienceStartAt === exp.experienceStartAt &&
                original.experienceEndAt === exp.experienceEndAt
              ) {
                return exp;
              }
              await patchExperiences(exp.experienceId, payload);
              return exp;
            } else {
              const res = await postExperiences(payload);
              return {
                ...exp,
                experienceId: res.result.experienceId,
                localId: `srv-${res.result.experienceId}`,
              };
            }
          }),
        );

        setExperiences(updated);
        setOriginalExperiences(updated);
      }

      navigate("/home");
    } catch (error) {
      console.error("저장 실패", error);
    }
  };

  return (
    <>
      <DetailHeader category={safeCategory} />

      <S.DoneTrashContainer>
        <S.DoneBox onClick={handleDone}>완료</S.DoneBox>
        {!isSelectMode ? (
          <S.DoneBox onClick={handleSelectMode}>선택</S.DoneBox>
        ) : (
          <S.TrashIconWrapper>
            <Trash
              onClick={handleDeleteSelected}
              style={{ cursor: "pointer" }}
            />
          </S.TrashIconWrapper>
        )}
      </S.DoneTrashContainer>

      <S.FormContainer>
        {safeCategory === "education" && (
          <>
            <DetailForm
              category="education"
              value={education}
              isEditing={isEditing}
              onChange={handleEducationChange}
            />
            {experiences.map((item) => (
              <DetailForm
                key={item.localId}
                category="experience"
                value={item}
                isEditing={isEditing}
                isSelectMode={isSelectMode}
                isSelected={selectedIds.includes(item.localId)}
                onToggleSelect={() => toggleSelect(item.localId)}
                onChange={(v) => handleExperienceChange(item.localId, v)}
              />
            ))}
          </>
        )}
      </S.FormContainer>

      {safeCategory === "education" && (
        <S.PlusBox onClick={handleAdd}>
          <Plus style={{ color: "#0086AB" }} />
        </S.PlusBox>
      )}

      <TabBar />
    </>
  );
}
