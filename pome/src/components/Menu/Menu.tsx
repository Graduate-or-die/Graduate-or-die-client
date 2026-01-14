import React, { useState, memo } from "react";
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

interface MenuSectionProps {
  title: string;
  category: CategoryKey;
  items?: Record<string, any>[];
  basePath: "home" | "mate";
  isOwner?: boolean;
  isPublic: boolean;
}
interface MenuProps {
  data: Record<CategoryKey, Record<string, any>[]>;
  basePath: "home" | "mate";
  isOwner: boolean;
}
const MENU_DISPLAY_FIELDS: Partial<
  Record<CategoryKey, (item: Record<string, any>) => string>
> = {
  education: (item) => `${item.school} | ${item.major} | ${item.degree}`,

  experience: (item) =>
    `${item.place} | ${item.state} | ${item.periodStart} ~ ${item.periodEnd}`,

  activity: (item) => `${item.name} | ${item.period}`,

  award: (item) => `${item.title} | ${item.grade} | ${item.organization}`,

  certificate: (item) => `${item.name} | ${item.issuer}`,

  project: (item) => `${item.name} | ${item.role}`,
};
const renderItem = (item: Record<string, any>, category: CategoryKey) => {
  return MENU_DISPLAY_FIELDS[category]?.(item) ?? "";
};

const MenuSection = memo(
  ({
    title,
    items,
    category,
    basePath,
    isOwner,
    isPublic,
  }: MenuSectionProps) => {
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const [isSwitchOpen, setIsSwitchOpen] = useState(true);
    const navigate = useNavigate();
    if (!isPublic && !isOwner) {
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
      navigate(`/${basePath}/detail/${category}`);
    };
    return (
      <S.MenuContainer>
        <S.MenuHeader>
          <S.MenuTitleBox>
            <S.ToggleBox onClick={() => setIsToggleOpen((p) => !p)}>
              {isToggleOpen ? <ToggleDown /> : <ToggleRight />}
            </S.ToggleBox>
            <span onClick={goToDetail}>{title}</span>
          </S.MenuTitleBox>
          {isOwner && (
            <S.SwitchBox
              onClick={(e) => {
                e.stopPropagation();
                setIsSwitchOpen((p) => !p);
              }}
            >
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
                {category === "etc"
                  ? items?.flatMap((item) =>
                      Array.isArray(item.content)
                        ? item.content.map((link: string) => (
                            <S.DropBox key={link}>• {link}</S.DropBox>
                          ))
                        : []
                    )
                  : items?.map((item) => (
                      <S.DropBox key={item.id}>
                        • {renderItem(item, category)}
                      </S.DropBox>
                    ))}
              </S.Dropdown>
            </motion.div>
          )}
        </AnimatePresence>
      </S.MenuContainer>
    );
  }
);

export default function Menu({ data, basePath, isOwner }: MenuProps) {
  return (
    <>
      <MenuSection
        title="학력/경력"
        category="education"
        items={data.education}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={false}
      />

      <MenuSection
        title="대·내외 활동"
        category="activity"
        items={data.activity}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={true}
      />

      <MenuSection
        title="수상경력"
        category="award"
        items={data.award}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={true}
      />

      <MenuSection
        title="자격증"
        category="certificate"
        items={data.certificate}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={true}
      />

      <MenuSection
        title="프로젝트"
        category="project"
        items={data.project}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={true}
      />

      <MenuSection
        title="기타"
        category="etc"
        items={data.etc}
        basePath={basePath}
        isOwner={isOwner}
        isPublic={false}
      />
    </>
  );
}
