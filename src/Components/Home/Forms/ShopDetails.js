import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authLoadingAction} from '../../../Redux/Actions/authAction';
import {
  addShopDetailDispatch,
  updateShopDataDispatch,
} from '../../../Redux/Actions/shopAction';
import {utilStyles} from '../../../utils/styles';
import * as Animatable from 'react-native-animatable';
import {MyTextInput} from '../../../utils/myElements';
import LinearGradient from 'react-native-linear-gradient';
import {axiosInstance, showFlashMessage} from '../../../utils/utils';
import Loader from '../../Custom/Loader';
import {Picker} from '@react-native-picker/picker';
import Ionicon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');

const ShopDetails = ({
  navigation,
  auth,
  shop,
  addShopDetailDispatch,
  authLoadingAction,
  updateShopDataDispatch,
}) => {
  const [shopName, setShopName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [upi, setUpi] = useState('');
  const [otherText, setOtherText] = useState(false);

  const {
    errors,
    authLoading,
    userData: {_id},
  } = auth;

  useEffect(() => {
    if (shop.shopData) {
      setShopName(shop.shopData.shopName.toString());
      setCategory(shop.shopData.category.toString());
      setAddress(shop.shopData.address.toString());
      setCity(shop.shopData.city.toString());
      setPincode(shop.shopData.pincode.toString());
      if (shop.shopData.upiId) {
        setUpi(shop.shopData.upiId.toString());
      }
    }
  }, []);

  const onSubmit = async () => {
    if (
      shopName.length === 0 ||
      category.length === 0 ||
      address.length === 0 ||
      city.length === 0 ||
      pincode.length === 0
    ) {
      showFlashMessage('Fields are empty', 'danger');
    } else {
      const data =
        shop.shopData && upi.length === 0
          ? {
              shopId: shop.shopData._id,
              shopName,
              category,
              address,
              city,
              pincode,
            }
          : shop.shopData && upi.length > 0
          ? {
              shopId: shop.shopData._id,
              shopName,
              category,
              address,
              city,
              pincode,
              upiId: upi,
            }
          : !shop.shopData && upi.length === 0
          ? {
              shopOwnerId: _id,
              shopName,
              category,
              address,
              city,
              pincode,
            }
          : {
              shopOwnerId: _id,
              shopName,
              category,
              address,
              city,
              pincode,
              upiId: upi,
            };
      apiCall(data);
    }
  };

  const apiCall = (data) => {
    authLoadingAction(true);
    if (shop.shopData) {
      updateShopDataDispatch(data);
    } else {
      addShopDetailDispatch(data);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView>
          <Animatable.View
            animation="slideInLeft"
            duration={700}
            useNativeDriver>
            <LinearGradient
              locations={[0.3, 0.9, 1]}
              colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
              style={styles.contentWrapper}>
              <Text style={styles.header}>Enter Your Shop Details</Text>
              <MyTextInput
                value={shopName}
                onChangeText={(text) => setShopName(text)}
                placeholder="Enter Shop Name*"
              />
              {!otherText ? (
                <Picker
                  style={{width: width * 0.9, alignSelf: 'center'}}
                  selectedValue={category}
                  onValueChange={(value, index) => {
                    if (value === 'Pick Shop Category') {
                      setCategory('');
                    } else if (value === 'Other') {
                      setCategory('');
                      setOtherText(true);
                    } else {
                      setCategory(value);
                    }
                  }}>
                  <Picker.Item
                    label="Pick Shop Category"
                    value="Pick Shop Category"
                  />
                  <Picker.Item label="Grocery" value="Grocery" />
                  <Picker.Item label="Electronics" value="Electronics" />
                  <Picker.Item label="Clothing" value="Clothing" />
                  <Picker.Item label="Baby & Kids" value="Baby & Kids" />
                  <Picker.Item
                    label="Home & Furniture"
                    value="Home & Furniture"
                  />
                  <Picker.Item label="Medical Store" value="Medical Store" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              ) : (
                <View>
                  <Ionicon
                    name="close"
                    color="#000"
                    onPress={() => {
                      setCategory('');
                      setOtherText(false);
                    }}
                    size={15}
                    style={{position: 'absolute', right: 30, zIndex: 999}}
                  />
                  <MyTextInput
                    value={category}
                    style={{marginTop: 12}}
                    onChangeText={(text) => setCategory(text)}
                    placeholder="Enter Shop Category*"
                  />
                </View>
              )}
              <MyTextInput
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Enter Your Shop Address*"
                multiline={true}
              />
              <MyTextInput
                value={city}
                onChangeText={(text) => setCity(text)}
                placeholder="Enter City*"
              />
              <MyTextInput
                value={pincode}
                maxLength={6}
                keyboardType="number-pad"
                onChangeText={(text) => setPincode(text)}
                placeholder="Enter Area Pincode*"
              />
              <MyTextInput
                value={upi}
                onChangeText={(text) => setUpi(text)}
                placeholder="Enter UPI ID"
              />
              {!authLoading ? (
                <TouchableOpacity
                  onPress={() => onSubmit()}
                  activeOpacity={0.75}
                  style={utilStyles.button1}>
                  <Text style={{fontSize: 17, color: '#FFF'}}>Submit</Text>
                </TouchableOpacity>
              ) : (
                <Loader />
              )}
            </LinearGradient>
          </Animatable.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({auth, shop}) => ({auth, shop});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addShopDetailDispatch,
      authLoadingAction,
      updateShopDataDispatch,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08121C',
    alignItems: 'center',
  },
  header: {
    marginVertical: 45,
    marginLeft: 15,
    fontSize: 23,
    textAlign: 'center',
  },
  contentWrapper: {
    height: height,
    width: width,
    backgroundColor: '#FFF',
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
