import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./DetailPage.style";
import { Trash, Plus } from "../../icons";
import DetailForm from "../../components/DetailForm";
import DetailHeader from "../../components/DetailHeader";
import { CategoryKey } from "../../constants/categories";
import TabBar from "../../components/TabBar";
import { DetailItem } from "../../types/detail";
import { defaultItems } from "../../constants/defaultItems";

import {
  getPortfolio,
  deletePortfolio,
  postEducations,
  patchEducations,
  postExperiences,
  patchExperiences,
  postActivities,
  patchActivities,
  postProjects,
  patchProjects,
  postAwards,
  patchAwards,
  postCapacities,
  patchCapacities,
  postEtc,
  patchEtc,
  deleteAttachment,
} from "../../apis/portfolio";

export default function DetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const navigate = useNavigate();
  const safeCategory = category as CategoryKey;

  const [education, setEducation] = useState<DetailItem | null>(null);
  const [experiences, setExperiences] = useState<DetailItem[]>([]);
  const [items, setItems] = useState<DetailItem[]>([]);
  const [etc, setEtc] = useState<DetailItem | null>(null);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const portfolioMap: Record<CategoryKey, number> = {
    education: 1,
    experience: 2,
    activity: 3,
    award: 4,
    qualification: 5,
    project: 6,
    etc: 7,
  };

  const portfolioType = portfolioMap[safeCategory];

  const apiMap = {
    education: { post: postEducations, patch: patchEducations },
    experience: { post: postExperiences, patch: patchExperiences },
    activity: { post: postActivities, patch: patchActivities },
    project: { post: postProjects, patch: patchProjects },
    award: { post: postAwards, patch: patchAwards },
    qualification: { post: postCapacities, patch: patchCapacities },
    etc: { post: postEtc, patch: patchEtc },
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (safeCategory === "education") {
          const [eduRes, expRes] = await Promise.all([
            getPortfolio(1),
            getPortfolio(2),
          ]);

          const eduItems = eduRes?.item?.items ?? [];
          const expItems = expRes?.item?.items ?? [];

          setEducation(eduItems[0] ?? defaultItems.education);
          setExperiences(expItems);
          return;
        }

        const data = await getPortfolio(portfolioType);
        const rawItems = data?.item?.items ?? [];

        if (safeCategory === "etc") {
          setEtc(rawItems[0] ?? defaultItems.etc);
        } else {
          setItems(rawItems);
        }
      } catch (err) {
        console.error("포트폴리오 조회 실패", err);
      }
    };

    fetchPortfolio();
  }, [safeCategory]);

  const toggleSelect = (blockId: number) => {
    setSelectedIds((prev) =>
      prev.includes(blockId)
        ? prev.filter((id) => id !== blockId)
        : [...prev, blockId],
    );
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedIds.length === 0) return;

      // education 페이지 → experience 삭제
      if (safeCategory === "education") {
        await Promise.all(
          selectedIds.map((blockId) => deletePortfolio(2, blockId)),
        );

        setExperiences((prev) =>
          prev.filter((item) => !selectedIds.includes(item.blockId ?? -1)),
        );
      } else {
        await Promise.all(
          selectedIds.map((blockId) => deletePortfolio(portfolioType, blockId)),
        );

        setItems((prev) =>
          prev.filter((item) => !selectedIds.includes(item.blockId ?? -1)),
        );
      }

      setSelectedIds([]);
      setIsSelectMode(false);
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleAdd = () => {
    if (safeCategory === "education") {
      setExperiences((prev) => [...prev, defaultItems.experience]);
    } else if (safeCategory !== "etc") {
      setItems((prev) => [...prev, defaultItems[safeCategory]]);
    }
  };
  const handleDeleteFile = async (blockId: number) => {
    try {
      await deleteAttachment(portfolioType, blockId);
    } catch (err) {
      console.error(err);
      alert("파일 삭제 실패");
    }
  };

  const handleDone = async () => {
    try {
      if (safeCategory === "education") {
        if (education) {
          if (education.blockId) {
            await patchEducations(education.blockId, education as any);
          } else {
            await postEducations(education as any);
          }
        }

        await Promise.all(
          experiences.map(async (exp) => {
            if (exp.blockId) {
              await patchExperiences(exp.blockId, exp as any);
            } else {
              await postExperiences(exp as any);
            }
          }),
        );
      } else if (safeCategory === "etc") {
        if (!etc) return;

        if (etc.blockId) {
          await patchEtc(etc.blockId, etc as any);
        } else {
          await postEtc(etc as any);
        }
      } else {
        const { post, patch } = apiMap[safeCategory];

        await Promise.all(
          items.map(async (item) => {
            if (item.blockId) {
              await patch(item.blockId, item as any);
            } else {
              await post(item as any);
            }
          }),
        );
      }

      navigate("/home");
    } catch (err) {
      console.error("저장 실패", err);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <>
      <DetailHeader category={safeCategory} />

      <S.DoneTrashContainer>
        <S.DoneBox onClick={handleDone}>완료</S.DoneBox>

        {!isSelectMode ? (
          <S.DoneBox onClick={() => setIsSelectMode(true)}>선택</S.DoneBox>
        ) : (
          <S.TrashBox>
            <Trash onClick={handleDeleteSelected} />
          </S.TrashBox>
        )}
      </S.DoneTrashContainer>

      <S.FormContainer>
        {safeCategory === "education" && education && (
          <>
            <DetailForm
              category="education"
              value={education}
              isEditing
              onChange={(v) => setEducation(v)}
            />

            {experiences.map((item, index) => (
              <DetailForm
                key={item.blockId ?? `exp-${index}`}
                category="experience"
                value={item}
                isEditing
                isSelectMode={isSelectMode}
                isSelected={selectedIds.includes(item.blockId ?? -1)}
                onToggleSelect={() =>
                  item.blockId && toggleSelect(item.blockId)
                }
                onChange={(v) =>
                  setExperiences((prev) =>
                    prev.map((it, i) => (i === index ? v : it)),
                  )
                }
              />
            ))}
          </>
        )}

        {safeCategory === "etc" && etc && (
          <DetailForm
            category="etc"
            value={etc}
            isEditing
            onChange={(v) => setEtc(v)}
          />
        )}

        {safeCategory !== "education" &&
          safeCategory !== "etc" &&
          items.map((item, index) => (
            <DetailForm
              key={item.blockId ?? `new-${index}`}
              category={safeCategory}
              value={item}
              isEditing
              isSelectMode={isSelectMode}
              isSelected={selectedIds.includes(item.blockId ?? -1)}
              onDeleteFile={handleDeleteFile}
              onToggleSelect={() => item.blockId && toggleSelect(item.blockId)}
              onChange={(v) =>
                setItems((prev) => prev.map((it, i) => (i === index ? v : it)))
              }
            />
          ))}
      </S.FormContainer>

      {safeCategory !== "etc" && (
        <S.PlusBox onClick={handleAdd}>
          <Plus style={{ color: "#0086AB" }} />
        </S.PlusBox>
      )}

      <TabBar />
    </>
  );
}
