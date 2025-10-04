import {ViewProps, TouchableOpacityProps, Text} from 'react-native';
import styled from 'styled-components/native';
export const TabBar = styled.View<ViewProps>`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  height: 88px;
  width: 100%;
  border-radius: 30px 30px 0 0;
  background: #fff;
  box-shadow: 0 0 10px 5px  rgba(0, 0, 0, 0.1);
`;
export const Icons = styled.TouchableOpacity<TouchableOpacityProps>``;
export const TextLabel = styled.Text<{isActive: boolean}>`
  color: ${(props: { isActive: any; }) => (props.isActive ? '#0086AB' : '#CED6D8')};
  font-family: 'Pretendard Variable';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
