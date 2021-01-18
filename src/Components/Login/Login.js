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
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const height = Dimensions.get('window').height;

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
    const data = {
      email,
      password,
    };
    authLoadingAction(true);
    userLoginDispatch(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView>
          <Animatable.View
            animation="bounceIn"
            duration={900}
            useNativeDriver
            style={styles.logo}
          />
          <Animatable.View
            animation="fadeInUpBig"
            duration={600}
            useNativeDriver>
            <LinearGradient
              locations={[0.3, 0.8, 1]}
              colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
              style={styles.contentWrapper}>
              <Text style={styles.text}>Login</Text>
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
                <LottieView
                  source={require('../../utils/dataLoading.json')}
                  autoPlay
                  loop
                  style={{width: 80, height: 80, alignSelf: 'center'}}
                />
              )}
              <Pressable
                onPress={() => navigation.navigate('Register')}
                style={styles.footer}>
                <Text>Create an Account!</Text>
              </Pressable>
              {/* <LottieView
              source={require('../../utils/loading.json')}
              autoPlay
              loop
              style={{width: 130, height: 130, alignSelf: 'center'}}
            /> */}
            </LinearGradient>
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
  },
  logo: {
    backgroundColor: '#FFF',
    height: 100,
    borderRadius: 50,
    width: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  contentWrapper: {
    height: height * 0.8,
    backgroundColor: '#FFF',
    elevation: 10,
    paddingTop: 60,
    marginTop: 50,
    marginHorizontal: 5,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  text: {
    color: '#000',
    fontSize: 27,
    textAlign: 'center',
    marginBottom: 10,
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
