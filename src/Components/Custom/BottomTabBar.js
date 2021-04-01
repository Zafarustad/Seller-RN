import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const totalWidth = Dimensions.get('window').width;

const BottomMenuItem = ({label, isCurrent, icon}) => {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {label === 'Open' || label === 'Completed' ? (
        <Feather
          name="list"
          size={22}
          style={{color: isCurrent ? '#000' : '#AAAAAA'}}
        />
      ) : label === 'Inventory' ? (
        <MaterialIcon
          name="inventory"
          size={22}
          style={{color: isCurrent ? '#000' : '#AAAAAA'}}
        />
      ) : (
        <Feather
          name="home"
          size={22}
          style={{color: isCurrent ? '#000' : '#AAAAAA'}}
        />
      )}
      <Text style={{color: isCurrent ? '#000' : '#AAAAAA'}}>{label}</Text>
    </View>
  );
};

export const CustomTabBar = ({state, descriptors, navigation}) => {
  const [translateValue] = useState(new Animated.Value(0));

  const tabWidth = totalWidth / state.routes.length;

  const animateSlider = (index) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 40,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateSlider(state.index);
  }, [state.index]);

  return (
    <Animatable.View
      animation="slideInUp"
      duration={500}
      useNativeDriver
      style={[styles.tabContainer, {width: totalWidth}]}>
      <View style={{flexDirection: 'row'}}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{translateX: translateValue}],
              width: tabWidth - 40,
            },
          ]}
        />
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            animateSlider(index);
          };
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              accessibilityRole="button"
              accessibilityStates={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}
              key={index}>
              <BottomMenuItem
                label={label}
                isCurrent={isFocused}
                icon={options.tabBarIcon ? options.tabBarIcon : null}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 60,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: '#FFF',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    borderRadius: 40,
    elevation: 10,
    position: 'absolute',
    bottom: 15,
  },
  slider: {
    height: 5,
    position: 'absolute',
    top: 0,
    left: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    width: 25,
  },
});
