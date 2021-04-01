import React from 'react';
import {View, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const Hr = ({styles}) => (
  <View
    style={[
      {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        marginVertical: 15,
        width: width * 0.8,
      },
      {...styles},
    ]}
  />
);

export default Hr;
