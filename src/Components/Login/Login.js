import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {incrementAction} from '../../Actions/authAction';
import {utilStyles} from '../../utils/styles';

const Login = ({auth, navigation, incrementAction}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => incrementAction()}
        style={utilStyles.button1}>
        <Text style={{fontSize: 17, color: '#FFF'}}>Login</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => navigation.navigate('Register')}
        style={styles.footer}>
        <Text>Create an Account!</Text>
      </Pressable>
    </View>
  );
};

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      incrementAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
