/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TabBar, TabView} from 'react-native-tab-view';
import {images} from '../assets/image';
import { goBack } from '../navigation/navigation-service';

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
    <Text>Second Tab Content</Text>
  </View>
);

const HeaderAnimated = () => {
  const insets = useSafeAreaInsets();

  const dummyData = [
    'Text',
    'Input',
    'Button',
    'Card',
    'CheckBox',
    'Divider',
    'Header',
    'List Item',
    'Pricing',
    'Rating',
    'Search Bar',
    'Slider',
    'Tile',
    'Icon',
    'Avatar',
  ];

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Tab 1'},
    {key: 'second', title: 'Tab 2'},
    {key: 'third', title: 'Tab 3'},
  ]);

  const scrollY = useSharedValue(0);

  const Header_Maximum_Height = 200;

  const Header_Minimum_Height = 50;

  // Correctly define scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const colorIconBack = useAnimatedStyle(() => {
    const tintColor = interpolateColor(
      scrollY.value,
      [0, Header_Maximum_Height],
      ['white', 'black'], // From blue to cyan
    );

    return {
      tintColor,
      // transform: [{ scale }], // Add the zoom effect here
    };
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, Header_Maximum_Height],
      [Header_Maximum_Height + insets.top, Header_Minimum_Height + insets.top],
      Extrapolate.CLAMP,
    );

    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, Header_Maximum_Height - 50, Header_Maximum_Height],
      ['#1F2C8D', 'rgba(31, 44, 141, 0.5)', 'white'], // From blue to cyan
    );

    return {
      height,
      backgroundColor,
      // transform: [{ scale }], // Add the zoom effect here
    };
  });

  const animatedTextHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, Header_Maximum_Height - 50, Header_Maximum_Height],
      [0, 0.3, 1],
    );

    return {opacity};
  });

  const imageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, Header_Maximum_Height - 50, Header_Maximum_Height],
      [1, 0.5, 0],
    );

    const translateY = interpolate(
      scrollY.value,
      [0, Header_Maximum_Height],
      [0, -100],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <Animated.FlatList
            style={{flexGrow: 1}}
            nestedScrollEnabled={true}
            scrollEventThrottle={16}
            data={dummyData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Text style={styles.textStyle}>{item}</Text>
            )}
            onScroll={scrollHandler} // Pass the scroll handler here
          />
        );
      case 'second':
        return <SecondRoute />;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, animatedHeaderStyle, {paddingTop: insets.top}]}>
        <Animated.Text
          style={[
            styles.headerText,
            animatedTextHeaderStyle,
            {color: 'black', textAlign: 'center'},
          ]}>
          Header
        </Animated.Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: insets.top,
            right: 0,
            left: 20,
            bottom: 0,
            zIndex: 99,
          }}
          onPress={goBack}>
          <Animated.Image
            source={images.icArrowLeft}
            resizeMode="contain"
            style={[
              colorIconBack,
              {
                height: 30,
                width: 30,
              },
            ]}
          />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.headerText,
            styles.imgView,
            {
              top: insets.top,
            },
            imageStyle,
          ]}>
          <Image
            source={images.imgHeader}
            style={{height: 100, width: 100, borderRadius: 100}}
          />
        </Animated.View>
      </Animated.View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: 'black'}}
            renderLabel={({route, focused}) => (
              <Text
                style={{
                  color: focused ? '#1F2C8D' : 'white', // Selected tab red, unselected tab black
                  fontSize: 20,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: '#1F2C8D', height: 5}} // Indicator matches selected tab
          />
        )}
      />
    </View>
  );
};

export default HeaderAnimated;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2C8D',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    padding: 20,
  },
  imgView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
