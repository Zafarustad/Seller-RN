import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  userRegisterDispatch,
  setErrorsAction,
  authLoadingAction,
} from '../../Redux/Actions/authAction';
import {utilStyles} from '../../utils/styles';
import * as Animatable from 'react-native-animatable';
import {MyTextInput} from '../../utils/myElements';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

const ShopDetails = ({
  navigation,
  auth,
  userRegisterDispatch,
  authLoadingAction,
}) => {
  const [shopName, setShopName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [gstin, setGstin] = useState('');

  const {errors, authLoading} = auth;

  useEffect(() => {
    setTimeout(() => setErrorsAction(null), 5000);
  }, [errors]);

  const onSubmit = () => {
    const data = {
      shopName,
      category,
      address,
      city,
      pincode,
      gstin,
    };
    authLoadingAction(true);
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
                placeholder="Enter Shop Name"
              />
              <MyTextInput
                value={category}
                onChangeText={(text) => setCategory(text)}
                placeholder="Pick Shop Category"
                secureTextEntry
              />
              <MyTextInput
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Enter Your Shop Address"
                multiline={true}
              />
              <MyTextInput
                value={city}
                onChangeText={(text) => setCity(text)}
                placeholder="Enter City"
              />
              <MyTextInput
                value={pincode}
                maxLength={5}
                keyboardType="number-pad"
                onChangeText={(text) => setPincode(text)}
                placeholder="Enter Area Pincode"
              />
              <MyTextInput
                value={gstin}
                maxLength={15}
                onChangeText={(text) => setGstin(text)}
                placeholder="GSTIN"
              />
              {!authLoading ? (
                <TouchableOpacity
                  //   onPress={() => onSubmit()}
                  activeOpacity={0.75}
                  style={utilStyles.button1}>
                  <Text style={{fontSize: 17, color: '#FFF'}}>Submit</Text>
                </TouchableOpacity>
              ) : (
                <LottieView
                  source={require('../../utils/dataLoading.json')}
                  autoPlay
                  loop
                  style={{width: 80, height: 80, alignSelf: 'center'}}
                />
              )}
            </LinearGradient>
          </Animatable.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userRegisterDispatch,
      setErrorsAction,
      authLoadingAction,
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
