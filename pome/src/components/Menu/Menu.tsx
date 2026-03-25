import React, { useState, useEffect, memo } from "react";
import * as S from "./Menu.style";
import { motion, AnimatePresence } from "framer-motion";
import {
  SwitchOff,
  SwitchOn,
  ToggleRight,
  ToggleDown,
  Lock,
} from "../../icons";
import { CategoryKey } from "../../constants/categories";
import { useNavigate } from "react-router-dom";
import { postVisibility } from "../../apis/portfolio";

const CATEGORY_TYPE_ID = {
  education: 1,
  experience: 2,
  activity: 3,
  award: 4,
  qualification: 5,
  project: 6,
  etc: 7,
} as const;

interface MenuSectionProps {
  title: string;
  typeIds: number[];
  category: CategoryKey[];
  basePath: "home" | "mate" | "my";
  isOwner?: boolean;
  isPublic: boolean;
  previewMap: Record<number, any[]>;
  onToggleVisibility: (typeId: number, visible: boolean) => void;
  mateId?: number | null;
}

interface MenuProps {
  previewMap: Record<number, any[]>;
  basePath: "home" | "mate" | "my";
  isOwner: boolean;
  visibilityMap: Record<number, boolean>;
  onToggleVisibility: (typeId: number, visible: boolean) => void;
  mateId?: number | null;
}

const MenuSection = memo(
  ({
    title,
    typeIds,
    category,
    basePath,
    isOwner,
    isPublic,
    previewMap,
    onToggleVisibility,
    mateId,
  }: MenuSectionProps) => {
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const [isSwitchOpen, setIsSwitchOpen] = useState(isPublic);
    const navigate = useNavigate();

    useEffect(() => {
      setIsSwitchOpen(isPublic);
    }, [isPublic]);

    const handleToggle = async (e: React.MouseEvent) => {
      e.stopPropagation();

      try {
        const res = await postVisibility(typeIds[0]);
        setIsSwitchOpen(res.visible);
        onToggleVisibility(typeIds[0], res.visible);
      } catch (err) {
        console.error(err);
      }
    };

    if (!isPublic && (!isOwner || basePath === "my")) {
      return (
        <S.LockedContainer>
          <S.MenuHeader>
            <S.MenuTitleBox>
              <S.ToggleBox>
                <Lock />
              </S.ToggleBox>
              <span>{title}</span>
            </S.MenuTitleBox>
          </S.MenuHeader>
        </S.LockedContainer>
      );
    }

    const goToDetail = () => {
      if (basePath === "mate" && !mateId) {
        return;
      }

      navigate(`/${basePath}/detail/${category[0]}`, {
        state: basePath === "mate" ? { mateId } : undefined,
      });
    };

    const mergedItems = typeIds.flatMap((id) => previewMap[id] || []);
    return (
      <S.MenuContainer>
        <S.MenuHeader>
          <S.MenuTitleBox>
            <S.ToggleBox onClick={() => setIsToggleOpen((p) => !p)}>
              {isToggleOpen ? <ToggleDown /> : <ToggleRight />}
            </S.ToggleBox>
            <span onClick={goToDetail}>{title}</span>
          </S.MenuTitleBox>

          {isOwner && basePath !== "my" && (
            <S.SwitchBox onClick={handleToggle}>
              {isSwitchOpen ? <SwitchOn /> : <SwitchOff />}
            </S.SwitchBox>
          )}
        </S.MenuHeader>

        <AnimatePresence>
          {isToggleOpen && isSwitchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <S.BorderLine />
              <S.Dropdown>
                {mergedItems.map((item, index) => (
                  <S.DropBox key={`${item.id}-${index}`}>
                    • {item.title}
                    {item.awardGrade && ` | ${item.awardGrade}`}
                  </S.DropBox>
                ))}
              </S.Dropdown>
            </motion.div>
          )}
        </AnimatePresence>
      </S.MenuContainer>
    );
  },
);

export default function Menu({
  previewMap,
  basePath,
  isOwner,
  visibilityMap,
  onToggleVisibility,
  mateId,
}: MenuProps) {
  return (
    <>
      <MenuSection
        title="학력/경력"
        typeIds={[1, 2]}
        category={["education", "experience"]}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={visibilityMap[1] ?? true}
        previewMap={previewMap}
        onToggleVisibility={onToggleVisibility}
        mateId={mateId}
      />

      <MenuSection
        title="대·내외 활동"
        typeIds={[3]}
        category={["activity"]}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={visibilityMap[3] ?? true}
        previewMap={previewMap}
        onToggleVisibility={onToggleVisibility}
        mateId={mateId}
      />

      <MenuSection
        title="수상경력"
        typeIds={[4]}
        category={["award"]}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={visibilityMap[4] ?? true}
        previewMap={previewMap}
        onToggleVisibility={onToggleVisibility}
        mateId={mateId}
      />

      <MenuSection
        title="자격증"
        typeIds={[5]}
        category={["qualification"]}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={visibilityMap[5] ?? true}
        previewMap={previewMap}
        onToggleVisibility={onToggleVisibility}
        mateId={mateId}
      />

      <MenuSection
        title="프로젝트"
        typeIds={[6]}
        category={["project"]}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={visibilityMap[6] ?? true}
        previewMap={previewMap}
        onToggleVisibility={onToggleVisibility}
        mateId={mateId}
      />

      <MenuSection
        title="기타"
        typeIds={[7]}
        category={["etc"]}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={visibilityMap[7] ?? true}
        previewMap={previewMap}
        onToggleVisibility={onToggleVisibility}
        mateId={mateId}
      />
    </>
  );
}
