import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  userRegisterDispatch,
  setErrorsAction,
  authLoadingAction,
} from '../../Redux/Actions/authAction';
import {utilStyles} from '../../utils/styles';
import * as Animatable from 'react-native-animatable';
import {MyTextInput} from '../../utils/myElements';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const Register = ({
  navigation,
  auth,
  userRegisterDispatch,
  authLoadingAction,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopOwnerName, setOwnerName] = useState('');
  const [number, setNumber] = useState('');

  const {errors, authLoading} = auth;

  useEffect(() => {
    setTimeout(() => setErrorsAction(null), 5000);
  }, [errors]);

  const onSubmit = () => {
    const data = {
      email,
      password,
      shopOwnerName,
      number,
    };
    authLoadingAction(true);
    userRegisterDispatch(data);
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
              <Text style={styles.text}>Register Your Shop!</Text>
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
              <MyTextInput
                value={shopOwnerName}
                onChangeText={(text) => setOwnerName(text)}
                placeholder="Enter shop owner name"
                error={
                  errors && errors.shopOwnerName ? errors.shopOwnerName : null
                }
              />
              <MyTextInput
                value={number}
                onChangeText={(text) => setNumber(text)}
                keyboardType="number-pad"
                maxLength={10}
                placeholder="Enter your mobile number"
                error={errors && errors.number ? errors.number : null}
              />
              {!authLoading ? (
                <TouchableOpacity
                  onPress={() => onSubmit()}
                  activeOpacity={0.75}
                  style={utilStyles.button1}>
                  <Text style={{fontSize: 17, color: '#FFF'}}>Submit</Text>
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
                onPress={() => navigation.navigate('Login')}
                style={styles.footer}>
                <Text>Have an Account!</Text>
              </Pressable>
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
      userRegisterDispatch,
      setErrorsAction,
      authLoadingAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);

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
    backgroundColor: '#FFF',
    flex: 1,
    paddingBottom: 80,
    marginTop: 50,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    marginTop: 80,
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
