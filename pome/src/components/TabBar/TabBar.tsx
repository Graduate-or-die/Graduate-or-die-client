import React, {useState} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import * as S from './TabBar.style';
import {
  TabHomeOn,
  TabHomeOff,
  TabChatOn,
  TabChatOff,
  TabMateOn,
  TabMateOff,
  TabMyOn,
  TabMyOff,
} from '../../icons';
type RootStackParamList = {
  MyPage: undefined;
};

type Tab = 'home' | 'chat' | 'mate' | 'my';
type TabBarNavigationProp = NavigationProp<RootStackParamList>;
const tabItems: {
  key: Tab;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <TabHomeOff width={26} height={26} />,
    activeIcon: <TabHomeOn width={26} height={26} />,
  },
  {
    key: 'chat',
    label: 'Mate Chat',
    icon: <TabChatOff width={26} height={26} />,
    activeIcon: <TabChatOn width={26} height={26} />,
  },
  {
    key: 'mate',
    label: 'Mate',
    icon: <TabMateOff width={26} height={26} />,
    activeIcon: <TabMateOn width={26} height={26} />,
  },
  {
    key: 'my',
    label: 'MyPage',
    icon: <TabMyOff width={26} height={26} />,
    activeIcon: <TabMyOn width={26} height={26} />,
  },
];
export default function TabBar() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const navigation = useNavigation<TabBarNavigationProp>();
  const handlePress = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'my') {
      navigation.navigate('MyPage');
    }
  };

  return (
    <S.TabBar>
      {tabItems.map(tab => (
        <S.Icons key={tab.key} onPress={() => handlePress(tab.key)}>
          {activeTab === tab.key ? tab.activeIcon : tab.icon}
        </S.Icons>
      ))}
    </S.TabBar>
  );
}
