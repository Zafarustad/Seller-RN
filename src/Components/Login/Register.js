import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import {utilStyles} from '../../utils/styles';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [number, setNumber] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register Your Shop!</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter email"
        style={utilStyles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter password"
        style={utilStyles.input}
      />
      <TextInput
        value={ownerName}
        onChangeText={(text) => setOwnerName(text)}
        placeholder="Enter shop owner name"
        style={utilStyles.input}
      />
      <TextInput
        value={number}
        onChangeText={(text) => setNumber(text)}
        keyboardType="number-pad"
        maxLength={10}
        placeholder="Enter your mobile number"
        style={utilStyles.input}
      />
      <TouchableOpacity activeOpacity={0.75} style={utilStyles.button1}>
        <Text style={{fontSize: 17, color: '#FFF'}}>Submit</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={styles.footer}>
        <Text>Have an Account!</Text>
      </Pressable>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    color: '#000',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 27,
    marginBottom: 20,
  },
  footer: {
    padding: 10,
    marginRight: 15,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});
