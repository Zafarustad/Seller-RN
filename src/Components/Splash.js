import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleSplash, isAuthenticatedAction} from '../Redux/Actions/authAction';
import * as Animatable from 'react-native-animatable';

const Splash = ({toggleSplash, isAuthenticatedAction}) => {
  useEffect(() => {
    setTimeout(() => {
      isAuthenticatedAction(false);
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#08121C',
      }}>
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        useNativeDriver
        style={{
          backgroundColor: '#FFF',
          height: 100,
          borderRadius: 50,
          width: 100,
          alignSelf: 'center',
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Text style={{fontSize: 45, color: '#000', fontWeight: 'bold'}}>
          L.ly
        </Text> */}
      </Animatable.View>
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
