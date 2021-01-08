import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Components/Login/Login';
import Register from '../Components/Login/Register';
import Splash from '../Components/Splash';
import Home from '../Components/Home/Home';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Routes = ({auth}) => {
  const {isAuthenticated} = auth;

  return isAuthenticated === null ? (
    <AuthStack.Navigator initialRouteName="Splash" headerMode="none">
      <AuthStack.Screen name="Splash" component={Splash} />
    </AuthStack.Navigator>
  ) : isAuthenticated === false ? (
    <LoginStack.Navigator initialRouteName="Login" headerMode="none">
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Register" component={Register} />
    </LoginStack.Navigator>
  ) : isAuthenticated ? (
    <HomeStack.Navigator initialRouteName="Home" headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  ) : null;
};

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, null)(Routes);
