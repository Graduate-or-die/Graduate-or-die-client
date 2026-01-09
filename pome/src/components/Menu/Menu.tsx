import React, { useState, memo } from "react";
import * as S from "./Menu.style";
import { motion, AnimatePresence } from "framer-motion";
import { SwitchOff, SwitchOn, ToggleRight, ToggleDown } from "../../icons";
import { CategoryKey } from "../../constants/categories";
import { DETAIL_DEFAULT_BY_CATEGORY } from "../../constants/defaultDetailItem";
import { useNavigate } from "react-router-dom";

interface MenuSectionProps {
  title: string;
  category: CategoryKey;
  items?: Record<string, any>[];
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

const MenuSection = memo(({ title, items, category }: MenuSectionProps) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isSwitchOpen, setIsSwitchOpen] = useState(true);
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${category}`);
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
        <S.SwitchBox
          onClick={(e) => {
            e.stopPropagation();
            setIsSwitchOpen((p) => !p);
          }}
        >
          {isSwitchOpen ? <SwitchOn /> : <SwitchOff />}
        </S.SwitchBox>
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
});

export default function Menu() {
  return (
    <>
      <MenuSection
        title="학력/경력"
        category="education"
        items={DETAIL_DEFAULT_BY_CATEGORY.education}
      />

      <MenuSection
        title="대·내외 활동"
        category="activity"
        items={DETAIL_DEFAULT_BY_CATEGORY.activity}
      />

      <MenuSection
        title="수상경력"
        category="award"
        items={DETAIL_DEFAULT_BY_CATEGORY.award}
      />

      <MenuSection
        title="자격증"
        category="certificate"
        items={DETAIL_DEFAULT_BY_CATEGORY.certificate}
      />

      <MenuSection
        title="프로젝트"
        category="project"
        items={DETAIL_DEFAULT_BY_CATEGORY.project}
      />

      <MenuSection
        title="기타"
        category="etc"
        items={DETAIL_DEFAULT_BY_CATEGORY.etc}
      />
    </>
  );
}
