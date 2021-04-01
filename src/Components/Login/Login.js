import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {
  userLoginDispatch,
  setErrorsAction,
  authLoadingAction,
} from '../../Redux/Actions/authAction';
import {utilStyles} from '../../utils/styles';
import {MyTextInput} from '../../utils/myElements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons';
import {showFlashMessage} from '../../utils/utils';

const {height, width} = Dimensions.get('screen');

const Login = ({
  auth,
  navigation,
  userLoginDispatch,
  setErrorsAction,
  authLoadingAction,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {errors, authLoading} = auth;

  useEffect(() => {
    setTimeout(() => setErrorsAction(null), 5000);
  }, [errors]);

  const onSubmit = () => {
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0 || password.length === 0) {
      showFlashMessage('Fields are empty', 'danger');
    } else if (!emailregex.test(email)) {
      showFlashMessage('Email is not valid', 'danger');
    } else {
      const data = {
        email,
        password,
      };
      authLoadingAction(true);
      userLoginDispatch(data);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled style={{flexGrow: 1, height: '100%'}}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Animatable.View
            animation="fadeIn"
            duration={1500}
            useNativeDriver
            style={styles.header}>
            <Text style={{fontSize: 25, color: '#AAAAAA'}}>Login</Text>
            <Text style={{fontSize: 30, color: '#FFFFFF'}}>
              Welcome to Local.ly Seller!
            </Text>
          </Animatable.View>
          <Animatable.View
            animation="fadeInUpBig"
            duration={600}
            useNativeDriver>
            <LinearGradient
              locations={[0.3, 0.9, 1]}
              colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
              style={styles.contentWrapper}>
              <Pressable
                onPress={() => navigation.navigate('Register')}
                style={styles.navigationCont}>
                <Text style={{fontSize: 14}}>Create an Account</Text>
                <Icon name="chevron-right" color="#000" size={30} />
              </Pressable>
              {errors && errors.general && (
                <Animatable.Text
                  animation="shake"
                  duration={1000}
                  useNativeDriver
                  style={styles.errorText}>
                  {errors.general}
                </Animatable.Text>
              )}
              <MyTextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter Email"
                error={errors && errors.email ? errors.email : null}
              />
              <MyTextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter Password"
                secureTextEntry
                error={errors && errors.password ? errors.password : null}
              />
              {!authLoading ? (
                <TouchableOpacity
                  onPress={() => onSubmit()}
                  activeOpacity={0.75}
                  style={utilStyles.button1}>
                  <Text style={{fontSize: 17, color: '#FFF'}}>Login</Text>
                </TouchableOpacity>
              ) : (
                <ActivityIndicator
                  color="#08121C"
                  size={30}
                  style={{marginTop: 15}}
                />
              )}
            </LinearGradient>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userLoginDispatch,
      setErrorsAction,
      authLoadingAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#08121C',
    flex: 1,
  },
  header: {
    marginTop: 40,
    marginLeft: 15,
  },
  contentWrapper: {
    height: height * 0.8,
    width: width * 0.99,
    flex: 1,
    backgroundColor: '#FFF',
    elevation: 10,
    paddingBottom: 150,
    justifyContent: 'center',
    marginTop: 50,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  navigationCont: {
    position: 'absolute',
    top: 20,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    padding: 10,
    marginRight: 15,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginVertical: 5,
    textAlign: 'center',
  },
});
