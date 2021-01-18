import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {utilStyles} from './styles';

export const MyTextInput = ({
  value,
  placeholder,
  style,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType,
  maxLength,
}) => {
  return (
    <View style={{marginVertical: 10}}>
      <TextInput
        value={value}
        style={[utilStyles.input, {...style}]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry ? true : false}
        keyboardType={keyboardType ? keyboardType : null}
        maxLength={maxLength ? maxLength : null}
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
