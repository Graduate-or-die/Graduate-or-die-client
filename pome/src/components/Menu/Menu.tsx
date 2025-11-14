import React, { useState, memo } from "react";
import * as S from "./Menu.style";
import { motion, AnimatePresence } from "framer-motion";
import { SwitchOff, SwitchOn, ToggleRight, ToggleDown } from "../../icons";

interface EducationCareerItem {
  school: string;
  major: string;
  degree: string;
}
interface ActivityItem {
  activityName: string;
  activityStartAt: string;
  activityEndAt: string;
}
interface AwardItem {
  awardName: string;
  awardGrade: string;
  awardOrganization: string;
}
interface CapacityItem {
  qualificationName: string;
  qualificationOrganization: string;
}
interface ProjectItem {
  projectName: string;
  projectRole: string;
}
interface EtcItem {
  link: string;
}
type MenuItem =
  | EducationCareerItem
  | ActivityItem
  | AwardItem
  | CapacityItem
  | ProjectItem
  | EtcItem;

interface MenuSectionProps {
  title: string;
  items?: MenuItem[];
}

const MenuSection = memo(({ title, items }: MenuSectionProps) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isSwitchOpen, setIsSwitchOpen] = useState(true);

  const toggleHandler = () => {
    setIsToggleOpen((prev) => !prev);
  };
  const switchHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSwitchOpen((prev) => !prev);
  };

  return (
    <S.MenuContainer>
      <S.MenuHeader onClick={toggleHandler}>
        <S.MenuTitleBox>
          {isToggleOpen ? <ToggleDown /> : <ToggleRight />}
          <span>{title}</span>
        </S.MenuTitleBox>
        <S.SwitchBox onClick={switchHandler}>
          {isSwitchOpen ? <SwitchOn /> : <SwitchOff />}
        </S.SwitchBox>
      </S.MenuHeader>
      <AnimatePresence>
        {isToggleOpen && (
          <>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <S.BorderLine />
                <S.Dropdown>
                  {title === "학력/경력" &&
                    (items as EducationCareerItem[])?.map((item, idx) => (
                      <S.DropBox key={idx}>
                        • {item.school} | {item.major} | {item.degree}
                      </S.DropBox>
                    ))}
                  {title === "대·내외 활동" &&
                    (items as ActivityItem[])?.map((item, idx) => (
                      <S.DropBox key={idx}>
                        • {item.activityName} | {item.activityStartAt} ~{" "}
                        {item.activityEndAt}
                      </S.DropBox>
                    ))}
                  {title === "수상경력" &&
                    (items as AwardItem[])?.map((item, idx) => (
                      <S.DropBox key={idx}>
                        • {item.awardName} | {item.awardGrade} |{" "}
                        {item.awardOrganization}
                      </S.DropBox>
                    ))}
                  {title === "자격증" &&
                    (items as CapacityItem[])?.map((item, idx) => (
                      <S.DropBox key={idx}>
                        • {item.qualificationName} |{" "}
                        {item.qualificationOrganization}
                      </S.DropBox>
                    ))}
                  {title === "프로젝트" &&
                    (items as ProjectItem[])?.map((item, idx) => (
                      <S.DropBox key={idx}>
                        • {item.projectName} | {item.projectRole}
                      </S.DropBox>
                    ))}
                  {title === "기타" &&
                    (items as EtcItem[])?.map((item, idx) => (
                      <S.DropBox key={idx}>• {item.link}</S.DropBox>
                    ))}
                </S.Dropdown>
              </motion.div>
          </>
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
        items={[
          {
            school: "숙명여자대학교",
            major: "데이터사이언스",
            degree: "학사",
          },
        ]}
      />
      <MenuSection
        title="대·내외 활동"
        items={[
          {
            activityName: "개발학회",
            activityStartAt: "2023-09-01",
            activityEndAt: "2024-12-31",
          },
          {
            activityName: "nn 봉사단",
            activityStartAt: "2025-03-02",
            activityEndAt: "2025-08-31",
          },
        ]}
      />
      <MenuSection
        title="수상경력"
        items={[
          {
            awardName: "많이먹기대회",
            awardGrade: "대상",
            awardOrganization: "숙명여대",
          },
          {
            awardName: "AI해커톤",
            awardGrade: "최우수상",
            awardOrganization: "숙명여대",
          },
        ]}
      />
      <MenuSection
        title="자격증"
        items={[
          {
            qualificationName: "정보처리기사",
            qualificationOrganization: "한국산업인력공단",
          },
          {
            qualificationName: "ADsP",
            qualificationOrganization: "한국데이터산업진흥원",
          },
        ]}
      />
      <MenuSection
        title="프로젝트"
        items={[
          { projectName: "졸못죽", projectRole: "프론트엔드 개발자" },
          { projectName: "챗봇", projectRole: "프롬프트 엔지니어" },
        ]}
      />
      <MenuSection
        title="기타"
        items={[
          { link: "https://github.com" },
          { link: "https://instragram.com" },
        ]}
      />
    </>
  );
}
