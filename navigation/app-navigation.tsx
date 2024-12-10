import React from 'react';
import {StatusBar} from 'react-native';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import {NavigationService} from './navigation-service';
import {RootNavigation} from './root-navigator';

export const AppContainer = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
        },
      }}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        <RootNavigation />
        <NavigationService />
      </>
    </NavigationContainer>
  );
};
