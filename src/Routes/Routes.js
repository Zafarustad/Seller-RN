import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../Components/Login/Login';
import Register from '../Components/Login/Register';
import Splash from '../Components/Splash';
import Home from '../Components/Home/Home';
import SInfo from 'react-native-sensitive-info';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Routes = ({auth}) => {
  const {isAuthenticated} = auth;

  useEffect(() => {
    // const getItem = async () => {
    //   const token = await SInfo.getItem('token', {
    //     sharedPreferencesName: 'JwtToken',
    //     keychainService: 'JWT',
    //   });
    //   console.log('tokensjdgsh', token);
    // };
    // getItem();
    // const deleteItem = async () => {
    //   await SInfo.deleteItem('token', {
    //     sharedPreferencesName: 'JwtToken',
    //     keychainService: 'JWT',
    //   });
    // };
    // deleteItem();
  }, []);

  return isAuthenticated === null ? (
    <AuthStack.Navigator initialRouteName="Splash" headerMode="none">
      <AuthStack.Screen name="Splash" component={Splash} />
    </AuthStack.Navigator>
  ) : isAuthenticated === false ? (
    <LoginStack.Navigator initialRouteName="Login" headerMode="none">
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen
        name="Register"
        component={Register}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </LoginStack.Navigator>
  ) : isAuthenticated ? (
    <HomeStack.Navigator initialRouteName="Home" headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  ) : null;
};

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, null)(Routes);
