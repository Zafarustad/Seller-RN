import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleSplash, isAuthenticatedAction} from '../Redux/Actions/authAction';

const Splash = ({toggleSplash, isAuthenticatedAction}) => {
  console.log('msnjdvsh');
  useEffect(() => {
    setTimeout(() => {
      isAuthenticatedAction(false);
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, color: '#000'}}>Splash</Text>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleSplash,
      isAuthenticatedAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Splash);
