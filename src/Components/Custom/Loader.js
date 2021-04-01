import React from 'react';
import {View, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}>
      <LottieView
        source={require('../../utils/loading.json')}
        autoPlay
        loop
        style={{width: 130, height: 130}}
      />
    </View>
  );
};

export default Loader;
