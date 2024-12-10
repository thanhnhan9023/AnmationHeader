import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, APP_SCREEN, MODAL_SCREEN} from './screen-types';
import Home from '../screens/Home';
import HeaderAnimated from '../screens/HeaderAnimated';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        navigationBarColor: 'transparent',
      }}
      initialRouteName={APP_SCREEN.HOME}>
      <RootStack.Group>
        <RootStack.Screen
          options={{
            presentation: 'fullScreenModal',
          }}
          name={APP_SCREEN.HOME}
          component={Home}
        />
        <RootStack.Screen
          options={{
            presentation: 'fullScreenModal',
          }}
          name={MODAL_SCREEN.HEADERANAIMATION}
          component={HeaderAnimated}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
