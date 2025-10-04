import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
type StackParamList = {
  Intro: undefined;
  My: undefined;
};
export default function IntroPage() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('My')}>
        <Text>MyPage로 이동</Text>
      </TouchableOpacity>
    </>
  );
}
