import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./DetailPage.style";
import { Trash, Plus } from "../../icons";
import DetailForm from "../../components/DetailForm";
import DetailHeader from "../../components/DetailHeader";
import { CategoryKey } from "../../constants/categories";
import { TabBar } from "../../components/TabBar/TabBar.style";
import { DETAIL_DEFAULT_BY_CATEGORY } from "../../constants/defaultDetailItem";
import { DetailItem } from "../../types/detail";
import { v4 as uuid } from "uuid";

export default function DetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const navigate = useNavigate();

  const safeCategory = category as CategoryKey;

  const [isEditing] = useState(true);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [education, setEducation] = useState<DetailItem>({
    id: uuid(),
    ...DETAIL_DEFAULT_BY_CATEGORY.education,
  });
  const [experiences, setExperiences] = useState<DetailItem[]>([]);
  const [items, setItems] = useState<DetailItem[]>([]);

  useEffect(() => {
    switch (safeCategory) {
      case "education":
        setEducation({ ...DETAIL_DEFAULT_BY_CATEGORY.education, id: uuid() });
        setExperiences(
          DETAIL_DEFAULT_BY_CATEGORY.experience.map((e: DetailItem) => ({
            ...e,
            id: uuid(),
          }))
        );
        break;

      case "etc":
        setItems([{ ...DETAIL_DEFAULT_BY_CATEGORY.etc, id: uuid() }]);
        break;

      default:
        const defaultData = DETAIL_DEFAULT_BY_CATEGORY[safeCategory];
        if (Array.isArray(defaultData)) {
          setItems(defaultData.map((e) => ({ ...e, id: uuid() })));
        } else {
          setItems([{ ...defaultData, id: uuid() }]);
        }
        break;
    }
  }, [safeCategory]);

  const handleItemChange = (id: string, value: DetailItem) => {
    setItems((prev) => prev.map((item) => (item.id === id ? value : item)));
  };

  const handleEducationChange = (value: DetailItem) => {
    setEducation(value);
  };

  const handleExperienceChange = (id: string, value: DetailItem) => {
    setExperiences((prev) =>
      prev.map((item) => (item.id === id ? value : item))
    );
  };
  const handleAdd = () => {
    if (safeCategory === "education") {
      setExperiences((prev) => [...prev, { id: uuid() }]);
    } else {
      setItems((prev) => [...prev, { id: uuid() }]);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectMode = () => {
    setIsSelectMode(true);
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      setIsSelectMode(false);
      return;
    }

    if (safeCategory === "education") {
      setExperiences((prev) =>
        prev.filter((item) => !selectedIds.includes(item.id))
      );
    } else {
      setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    }
    setSelectedIds([]);
    setIsSelectMode(false);
  };

  const normalizeItem = (item: DetailItem): DetailItem => {
    const next = { ...item };

    if (Array.isArray(next.links)) {
      const cleaned = next.links.map((l) => l.trim()).filter(Boolean);

      if (cleaned.length > 0) {
        next.links = cleaned;
      } else {
        delete next.links;
      }
    }

    return next;
  };

  const handleDone = () => {
    if (safeCategory === "education") {
      console.log("저장될 데이터:", {
        education: normalizeItem(education),
        experiences: experiences.map(normalizeItem),
      });
    } else {
      console.log("저장될 데이터:", items.map(normalizeItem));
    }
    navigate("/home");
  };

  const showPlus = safeCategory !== "etc";

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
        {safeCategory === "education" ? (
          <>
            <DetailForm
              category="education"
              value={education}
              isEditing={isEditing}
              onChange={handleEducationChange}
            />

            {experiences.map((item) => (
              <DetailForm
                key={item.id}
                category="experience"
                value={item}
                isEditing={isEditing}
                isSelectMode={isSelectMode}
                isSelected={selectedIds.includes(item.id)}
                onToggleSelect={() => toggleSelect(item.id)}
                onChange={(v) => handleExperienceChange(item.id, v)}
              />
            ))}
          </>
        ) : (
          items.map((item) => (
            <DetailForm
              key={item.id}
              category={safeCategory}
              value={item}
              isEditing={isEditing}
              isSelectMode={isSelectMode}
              isSelected={selectedIds.includes(item.id)}
              onToggleSelect={() => toggleSelect(item.id)}
              onChange={(v) => handleItemChange(item.id, v)}
            />
          ))
        )}
      </S.FormContainer>

      {showPlus && (
        <S.PlusBox onClick={handleAdd}>
          <Plus style={{ color: "#0086AB" }} />
        </S.PlusBox>
      )}

      <TabBar />
    </>
  );
}
