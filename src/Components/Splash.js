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
import {setShopDataAction} from '../Redux/Actions/shopAction';

const Splash = ({
  isAuthenticatedAction,
  setUserDetailsAction,
  setShopDataAction,
}) => {
  useEffect(() => {
    setTimeout(() => {
      getAuthState();
    }, 2000);
  }, []);

  const getAuthState = async () => {
    const token = await getJwtToken();
    if (token) {
      try {
        const userData = await getData('userData');
        if (userData) {
          let parseJsonData = JSON.parse(userData);
          setUserDetailsAction(parseJsonData);
        }
        const shopData = await getData('shopData');
        if (shopData) {
          let parseJsonData = JSON.parse(shopData);
          setShopDataAction(parseJsonData);
        }
      } catch (error) {
        //no error handling
      } finally {
        isAuthenticatedAction(true);
      }
    } else {
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
        <Text style={{fontSize: 35, color: '#000', fontFamily: 'monospace'}}>
          L.ly
        </Text>
      </Animatable.View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      isAuthenticatedAction,
      setUserDetailsAction,
      setShopDataAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Splash);
