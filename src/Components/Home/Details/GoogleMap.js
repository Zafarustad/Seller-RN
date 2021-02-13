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
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {width, height} = Dimensions.get('window');

const GoogleMap = ({addShopCoordinateDispatch}) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={{backgroundColor}}
        style={{
          width: width * 0.8,
          backgroundColor: '#08121C',
          padding: 15,
          margin: 10,
          position: 'absolute',
          bottom: 20,
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 14, textAlign: 'center'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addShopCoordinateDispatch,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(GoogleMap);

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
