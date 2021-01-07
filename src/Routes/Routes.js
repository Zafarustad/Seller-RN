import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Components/Login/Login';
import Register from '../Components/Login/Register';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

const Routes = () => {
  return (
    <LoginStack.Navigator initialRouteName="Login" headerMode="none">
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Register" component={Register} />
    </LoginStack.Navigator>
  );
};

export default Routes;
