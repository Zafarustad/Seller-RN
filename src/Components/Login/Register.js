import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
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
import Icon from 'react-native-vector-icons/EvilIcons';

const {height, width} = Dimensions.get('screen');

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
      mobileNumber: number,
    };
    authLoadingAction(true);
    userRegisterDispatch(data);
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
            <Text style={{fontSize: 25, color: '#AAAAAA'}}>Sign Up</Text>
            <Text style={{fontSize: 30, color: '#FFFFFF'}}>
              Register Your Shop!
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
                onPress={() => navigation.navigate('Login')}
                style={styles.navigationCont}>
                <Icon name="chevron-left" color="#000" size={30} />
                <Text style={{fontSize: 14}}>Create an Account</Text>
              </Pressable>
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
    flex: 1,
  },
  header: {
    marginTop: 40,
    marginLeft: 15,
  },
  contentWrapper: {
    height: height * 0.8,
    width: width * 0.99,
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginHorizontal: 5,
  },
  navigationCont: {
    position: 'absolute',
    top: 20,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    padding: 10,
    marginRight: 15,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});
