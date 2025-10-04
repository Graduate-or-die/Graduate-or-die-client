import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroPage from './src/pages/IntroPage';
import MyPage from './src/pages/MyPage';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{headerShown: false}}>
          <Stack.Screen name="Intro" component={IntroPage} />
        <Stack.Screen name="My" component={MyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
