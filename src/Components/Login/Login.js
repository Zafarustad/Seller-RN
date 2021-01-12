import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {
  isAuthenticatedAction,
  userLoginDispatch,
} from '../../Redux/Actions/authAction';
import {utilStyles} from '../../utils/styles';

const height = Dimensions.get('window').height;

const Login = ({auth, navigation, userLoginDispatch}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    userLoginDispatch(email, password);
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView>
          <Animatable.View
            animation="bounceIn"
            duration={900}
            useNativeDriver
            style={{
              backgroundColor: '#FFF',
              height: 100,
              borderRadius: 50,
              width: 100,
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
          <Animatable.View
            animation="fadeInUpBig"
            duration={600}
            useNativeDriver
            style={{
              height: height * 0.75,
              // flex: 1,
              backgroundColor: '#FFF',
              paddingTop: 80,
              marginTop: 50,
              marginHorizontal: 5,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
            }}>
            <Text style={styles.header}>Login</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter email"
              style={utilStyles.input}
            />
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter password"
              style={utilStyles.input}
            />
            <TouchableOpacity
              // onPress={() => onSubmit()}
              activeOpacity={0.75}
              style={utilStyles.button1}>
              <Text style={{fontSize: 17, color: '#FFF'}}>Login</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              style={styles.footer}>
              <Text>Create an Account!</Text>
            </Pressable>
          </Animatable.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      isAuthenticatedAction,
      userLoginDispatch,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#08121C',
  },
  header: {
    color: '#000',
    fontSize: 27,
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    marginRight: 15,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});
