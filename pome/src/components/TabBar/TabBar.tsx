import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./TabBar.style";
import {
  TabHomeOn,
  TabHomeOff,
  TabChatOn,
  TabChatOff,
  TabMateOn,
  TabMateOff,
  TabMyOn,
  TabMyOff,
} from "../../icons";
type Tab = "home" | "chat" | "mate" | "my";
const tabItems: {
  key: Tab;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}[] = [
  {
    key: "home",
    label: "Home",
    icon: <TabHomeOff width={32} height={32} />,
    activeIcon: <TabHomeOn width={32} height={32} />,
    path: "/home",
  },
  {
    key: "chat",
    label: "Mate Chat",
    icon: <TabChatOff width={32} height={32} />,
    activeIcon: <TabChatOn width={32} height={32} />,
    path: "/chat",
  },
  {
    key: "mate",
    label: "Mate",
    icon: <TabMateOff width={32} height={32} />,
    activeIcon: <TabMateOn width={32} height={32} />,
    path: "/mate",
  },
  {
    key: "my",
    label: "MyPage",
    icon: <TabMyOff width={32} height={32} />,
    activeIcon: <TabMyOn width={32} height={32} />,
    path: "/my",
  },
];

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    tabItems.find((tab) => location.pathname.startsWith(tab.path))?.key ||
    "home";

  const handleClick = (tab: (typeof tabItems)[number]) => {
    if (tab.path !== location.pathname) {
      navigate(tab.path);
    }
  };
  return (
    <S.TabBar>
      {tabItems.map((tab) => (
        <S.Icons key={tab.key} onClick={() => handleClick(tab)}>
          {activeTab === tab.key ? tab.activeIcon : tab.icon}
          <S.TextLabel isActive={activeTab === tab.key}>
            {tab.label}
          </S.TextLabel>
        </S.Icons>
      ))}
    </S.TabBar>
  );
}
