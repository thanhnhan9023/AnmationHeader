import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigateScreen} from '../navigation/navigation-service';
import {MODAL_SCREEN} from '../navigation/screen-types';

export type Props = {};

const Home: React.FC<Props> = ({}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <TouchableOpacity
        onPress={() => navigateScreen(MODAL_SCREEN.HEADERANAIMATION)}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
