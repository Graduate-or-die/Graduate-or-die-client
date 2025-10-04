import React from 'react';
import * as S from './Header.style';
import {Alarm, ArrowLeft, PomeLogo} from '../../icons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export default function Header() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <S.Header>
      <S.HeaderBox>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft
            style={{width: 16, height: 5, transform: [{rotate: '-90deg'}]}}
          />
        </TouchableOpacity>
         <PomeLogo
          style={{
            width: 96,
            height: 31,
            flexShrink: 0,
          }}
        />
        <Alarm
          style={{
            width: 21,
            height: 24,
            flexShrink: 0,
          }}
        />
      </S.HeaderBox>
    </S.Header>
  );
}
