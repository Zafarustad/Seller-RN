import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addShopCoordinateDispatch} from '../../../Redux/Actions/shopAction';
import {authLoadingAction} from '../../../Redux/Actions/authAction';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {utilStyles} from '../../../utils/styles';
import Loader from '../../Custom/Loader';

const {width, height} = Dimensions.get('window');

const GoogleMap = ({
  auth,
  shop,
  addShopCoordinateDispatch,
  authLoadingAction,
  route,
}) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // console.log(route);

  const {userData, authLoading} = auth;
  const {shopData} = shop;

  const onSubmit = () => {
    let data = {
      shopOwnerId: userData._id,
      shopId: shopData._id,
      latititude: lat,
      longitude: lng,
    };
    authLoadingAction(true);
    addShopCoordinateDispatch(data);
  };

  return (
    <View style={styles.container}>
      {!route || !route.params ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: lat ? lat : 19.076,
            longitude: lng ? lng : 72.8777,
            latitudeDelta: 0.015 * 0.1,
            longitudeDelta: 0.0121 * 0.1,
          }}>
          {lat && lng && (
            <Marker
              draggable={true}
              coordinate={{latitude: lat, longitude: lng}}
              onDragEnd={(e) => {
                setLat(e.nativeEvent.coordinate.latitude);
                setLng(e.nativeEvent.coordinate.longitude);
              }}
              isPreselected
            />
          )}
        </MapView>
      ) : route && route.params ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: route.params.shopCoordinate.latititude,
            longitude: route.params.shopCoordinate.longitude,
            latitudeDelta: 0.015 * 0.1,
            longitudeDelta: 0.0121 * 0.1,
          }}>
          <Marker
            coordinate={{
              latitude: route.params.shopCoordinate.latititude,
              longitude: route.params.shopCoordinate.longitude,
            }}
            isPreselected
          />
        </MapView>
      ) : null}
      {!route || !route.params  && (
        <>
          <GooglePlacesAutocomplete
            placeholder="Search Your Shop"
            onPress={(data, details = null) => {
              const lat = details.geometry.location.lat;
              const lng = details.geometry.location.lng;
              setLat(lat);
              setLng(lng);
            }}
            styles={{
              container: {
                width: '90%',
                marginVertical: 10,
              },
              textInput: {
                elevation: 10,
                height: 55,
                borderRadius: 10,
              },
            }}
            fetchDetails
            query={{
              key: 'AIzaSyAu_ntAHBQh0xjvwKWvDGhgJWdfWdbeAJA',
              language: 'en',
            }}
          />
          {!authLoading ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{backgroundColor: '#FFF'}}
              onPress={() => onSubmit()}
              style={[utilStyles.button1, {position: 'absolute', bottom: 20}]}>
              <Text
                style={{color: '#FFFFFF', fontSize: 14, textAlign: 'center'}}>
                Submit
              </Text>
            </TouchableOpacity>
          ) : (
            <Loader />
          )}
        </>
      )}
    </View>
  );
};

const mapStateToProps = ({auth, shop}) => ({auth, shop});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addShopCoordinateDispatch,
      authLoadingAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
