import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppContainer} from './navigation/app-navigation';

export type Props = {};

const App: React.FC<Props> = ({}) => {
  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  );
};

export default App;
