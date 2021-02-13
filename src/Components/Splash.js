import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  isAuthenticatedAction,
  setUserDetailsAction,
} from '../Redux/Actions/authAction';
import * as Animatable from 'react-native-animatable';
import {getData, getJwtToken} from '../utils/utils';

const Splash = ({isAuthenticatedAction, setUserDetailsAction}) => {
  useEffect(() => {
    setTimeout(() => {
      getAuthState();
    }, 2000);
  }, []);

  const getAuthState = async () => {
    const token = await getJwtToken();
    if (token) {
      console.log('logged in');
      const userData = await getData('userData');
      if (userData) {
        let parseJsonData = JSON.parse(userData);
        setUserDetailsAction(parseJsonData);
        isAuthenticatedAction(true);
      }
    } else {
      console.log('not logged in');
      isAuthenticatedAction(false);
    }
  };

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
      isAuthenticatedAction,
      setUserDetailsAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Splash);
