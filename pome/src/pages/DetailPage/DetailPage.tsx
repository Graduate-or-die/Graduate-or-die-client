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
  deletePortfolio,
  postEducations,
  patchEducations,
  postExperiences,
  patchExperiences,
} from "../../apis/portfolio";

type ExperienceWithKey = DetailItem & {
  blockId?: number;
};

export default function DetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const navigate = useNavigate();
  const safeCategory = category as CategoryKey;

  const [isEditing] = useState(true);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [education, setEducation] = useState<DetailItem>({
    school: "",
    major: "",
    degree: "",
    file: undefined,
  });

  const [experiences, setExperiences] = useState<ExperienceWithKey[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const eduData = await getPortfolio(1);
        const expData = await getPortfolio(2);

        const eduItems = eduData?.item?.items ?? [];
        if (eduItems.length > 0) {
          const edu = eduItems[0];
          setEducation({
            blockId: edu.blockId,
            school: String(edu.school ?? ""),
            major: String(edu.major ?? ""),
            degree: String(edu.degree ?? ""),
            file: edu.file ?? null,
          });
        }

        const expItems = expData?.item?.items ?? [];
        const mapped = expItems.map((exp: any) => ({
          blockId: exp.blockId,
          workplace: String(exp.workplace ?? ""),
          spot: String(exp.spot ?? ""),
          experienceStartAt: String(exp.experienceStartAt ?? ""),
          experienceEndAt: String(exp.experienceEndAt ?? ""),
          file: exp.file ?? null,
        }));
        setExperiences(mapped);
      } catch (err) {
        console.error("포트폴리오 조회 실패", err);
      }
    };

    fetchPortfolio();
  }, []);

  const handleEducationChange = (value: DetailItem) => setEducation(value);

  const handleExperienceChange = (index: number, value: DetailItem) => {
    setExperiences((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...value } : item)),
    );
  };

  const handleAdd = () => {
    setExperiences((prev) => [
      ...prev,
      {
        workplace: "",
        spot: "",
        experienceStartAt: "",
        experienceEndAt: "",
        file: null,
      },
    ]);
  };

  const handleSelectMode = () => {
    setIsSelectMode(true);
    setSelectedIds([]);
  };

  const toggleSelect = (blockId: number) => {
    if (!blockId) return;

    setSelectedIds((prev) =>
      prev.includes(blockId)
        ? prev.filter((id) => id !== blockId)
        : [...prev, blockId],
    );
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedIds.length === 0) return;

      await Promise.all(
        selectedIds.map((blockId) => deletePortfolio(2, blockId)),
      );
      setExperiences((prev) =>
        prev.filter((item) => !selectedIds.includes(item.blockId ?? -1)),
      );

      setSelectedIds([]);
      setIsSelectMode(false);
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  const isValidDateFormat = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const handleDone = async () => {
    for (const exp of experiences) {
      if (
        (exp.experienceStartAt || exp.experienceEndAt) &&
        (!isValidDateFormat(String(exp.experienceStartAt)) ||
          !isValidDateFormat(String(exp.experienceEndAt)))
      ) {
        alert("기간은 YYYY-MM-DD 형식으로 입력해주세요.");
        return;
      }
    }
    try {
      if (education.blockId) {
        await patchEducations(education.blockId, {
          school: String(education.school ?? ""),
          major: String(education.major ?? ""),
          degree: String(education.degree ?? ""),
          file: education.file instanceof File ? education.file : null,
        });
      } else {
        const res = await postEducations({
          school: String(education.school ?? ""),
          major: String(education.major ?? ""),
          degree: String(education.degree ?? ""),
          file: education.file instanceof File ? education.file : null,
        });
        education.blockId = res.result.blockId;
        setEducation({ ...education });
      }

      const updated = await Promise.all(
        experiences.map(async (exp) => {
          const payload = {
            workplace: String(exp.workplace ?? ""),
            spot: String(exp.spot ?? ""),
            experienceStartAt: String(exp.experienceStartAt ?? ""),
            experienceEndAt: String(exp.experienceEndAt ?? ""),
            file: exp.file instanceof File ? exp.file : null,
          };

          if (exp.blockId) {
            await patchExperiences(exp.blockId, payload);
            return exp;
          } else {
            const res = await postExperiences(payload);

            return {
              ...exp,
              blockId: res.result.blockId,
            };
          }
        }),
      );

      setExperiences(updated);
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
          <S.TrashBox>
            <Trash
              onClick={handleDeleteSelected}
              style={{ cursor: "pointer" }}
            />
          </S.TrashBox>
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
            {experiences.map((item, index) => (
              <DetailForm
                key={item.blockId ?? index}
                category="experience"
                value={item}
                isEditing={isEditing}
                isSelectMode={isSelectMode}
                isSelected={selectedIds.includes(item.blockId ?? -1)}
                onToggleSelect={() =>
                  item.blockId && toggleSelect(item.blockId)
                }
                onChange={(v) => handleExperienceChange(index, v)}
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
