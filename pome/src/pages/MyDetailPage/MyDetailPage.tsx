import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./MyDetailPage.style";
import MyDetailForm from "../../components/MyDetailForm";
import DetailHeader from "../../components/DetailHeader";
import TabBar from "../../components/TabBar";
import { CategoryKey } from "../../constants/categories";
import { DetailItem } from "../../types/detail";
import { getPortfolio } from "../../apis/portfolio";
import { postFieldsUnread } from "../../apis/comment";

const portfolioMap: Record<CategoryKey, number> = {
  education: 1,
  experience: 2,
  activity: 3,
  award: 4,
  qualification: 5,
  project: 6,
  etc: 7,
};

type FieldUnread = {
  typeId: number;
  blockId: number;
  fieldKey: string;
  hasUnread: boolean;
};

export default function MyDetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const navigate = useNavigate();

  const safeCategory = category as CategoryKey;

  const [education, setEducation] = useState<DetailItem | null>(null);
  const [experiences, setExperiences] = useState<DetailItem[]>([]);
  const [items, setItems] = useState<DetailItem[]>([]);
  const [unreadMap, setUnreadMap] = useState<Set<string>>(new Set());

  const myUserId = Number(localStorage.getItem("userId"));
  const makeKey = useCallback(
    (typeId: number, blockId: number, fieldKey: string) =>
      `${typeId}-${blockId}-${fieldKey}`,
    [],
  );

  const fetchUnread = useCallback(async () => {
    try {
      const typeId = portfolioMap[safeCategory];
      const res: FieldUnread[] = await postFieldsUnread(myUserId, { typeId });

      const map = new Set<string>();

      (res || []).forEach((item) => {
        if (!item.hasUnread) return;

        const isPeriodField =
          item.fieldKey.includes("StartAt") || item.fieldKey.includes("EndAt");

        if (isPeriodField) {
          map.add(`${item.typeId}-${item.blockId}-period`);
        } else {
          map.add(makeKey(item.typeId, item.blockId, item.fieldKey));
        }
      });

      setUnreadMap(map);
    } catch (e) {
      console.error(e);
    }
  }, [safeCategory, myUserId, makeKey]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (safeCategory === "education") {
        const [eduRes, expRes] = await Promise.all([
          getPortfolio(portfolioMap.education),
          getPortfolio(portfolioMap.experience),
        ]);

        setEducation(eduRes?.item?.items?.[0] ?? null);
        setExperiences(expRes?.item?.items ?? []);
        return;
      }

      const data = await getPortfolio(portfolioMap[safeCategory]);
      setItems(data?.item?.items ?? []);
    };

    fetchPortfolio();
  }, [safeCategory]);

  useEffect(() => {
    fetchUnread();
  }, [fetchUnread]);

  const handleFieldClick = useCallback(
    (blockId: number | undefined, fieldKey: string) => {
      if (!blockId) return;
      navigate(`/comment/${safeCategory}/${blockId}/${fieldKey}`);
    },
    [navigate, safeCategory],
  );
  if (!category) return null;
  return (
    <>
      <DetailHeader category={safeCategory} />

      <S.FormContainer>
        {safeCategory === "education" && education && (
          <>
            <MyDetailForm
              category="education"
              value={education}
              isEditing={false}
              unreadMap={unreadMap}
              onFieldClick={(fieldKey) =>
                handleFieldClick(education.blockId, fieldKey)
              }
              isMyPage
            />

            {experiences.map((item) => (
              <MyDetailForm
                key={item.blockId}
                category="experience"
                value={item}
                isEditing={false}
                unreadMap={unreadMap}
                onFieldClick={(fieldKey) =>
                  handleFieldClick(item.blockId, fieldKey)
                }
                isMyPage
              />
            ))}
          </>
        )}

        {safeCategory !== "education" &&
          items.map((item) => (
            <MyDetailForm
              key={item.blockId}
              category={safeCategory}
              value={item}
              isEditing={false}
              unreadMap={unreadMap}
              onFieldClick={(fieldKey) =>
                handleFieldClick(item.blockId, fieldKey)
              }
              isMyPage
            />
          ))}
      </S.FormContainer>

      <TabBar />
    </>
  );
}
