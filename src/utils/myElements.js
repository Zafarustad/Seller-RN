import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {utilStyles} from './styles';

export const MyTextInput = ({error, style, ...props}) => {
  return (
    <View style={{marginVertical: 10}}>
      <TextInput
        style={[utilStyles.input, {...style}]}
        {...props}
      />
      {error && (
        <Text
          style={{color: 'red', fontSize: 12, marginLeft: 33, marginTop: 5}}>
          {error}
        </Text>
      )}
    </View>
  );
};
