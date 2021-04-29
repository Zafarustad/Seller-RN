import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SInfo from 'react-native-sensitive-info';
import LinearGradient from 'react-native-linear-gradient';
import ImagePickerModal from './ImagePickerModal';
import {axiosInstance, showFlashMessage} from '../../utils/utils';
import {
  authLoadingAction,
  isAuthenticatedAction,
} from '../../Redux/Actions/authAction';
import {updateShopImageDispatch} from '../../Redux/Actions/shopAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShopImg from '../../assests/images/shop.png';
import ActionSheet from 'react-native-actions-sheet';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {utilStyles} from '../../utils/styles';
import Loader from '../Custom/Loader';

const {height, width} = Dimensions.get('screen');

const actionSheetRef = createRef();

const MyShop = ({
  shop,
  auth,
  isAuthenticatedAction,
  navigation,
  updateShopImageDispatch,
  authLoadingAction,
}) => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {shopData} = shop;
  const {authLoading} = auth;

  // console.log('shopData', shopData)

  const logout = async () => {
    isAuthenticatedAction(false);
    await SInfo.deleteItem('token', {
      sharedPreferencesName: 'JwtToken',
      keychainService: 'JWT',
    });
    await AsyncStorage.clear();
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  const uploadImage = () => {
    const data = {shopImage: image, shopId: shopData._id};
    if (!image) {
      showFlashMessage('Upload an Image', 'error');
    } else {
      authLoadingAction(true);
      updateShopImageDispatch(data);
      setImage(null);
    }
  };

  return (
    <LinearGradient
      locations={[0.3, 0.9, 1]}
      colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
      style={styles.container}>
      <View style={styles.topCont}>
        <View style={styles.topWrapper}>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
            }}
            activeOpacity={0.7}
            style={{position: 'absolute', right: 20, top: 20}}>
            <SimpleLineIcon name="options-vertical" size={22} color="#FFF" />
          </TouchableOpacity>
          <View>
            <Image
              source={
                !image && shopData.shopImage
                  ? {uri: `data:image/png;base64,${shopData.shopImage}`}
                  : image && !shopData.shopImage
                  ? {uri: `data:image/png;base64,${image}`}
                  : image && shopData.shopImage
                  ? {uri: `data:image/png;base64,${image}`}
                  : ShopImg
              }
              style={styles.img}
            />
          </View>
          <Text style={styles.shopName}>{shopData.shopName}</Text>
          <Text style={styles.category}>{shopData.category}</Text>
        </View>
      </View>
      <ScrollView style={{marginBottom: 10}}>
        <View style={styles.bottomCont}>
          <Text style={styles.text}>Address: {shopData.address}</Text>
          <Text style={styles.text}>City: {shopData.city}</Text>
          <Text style={styles.text}>Pin Code: {shopData.pincode}</Text>
          <Text style={styles.text}>GSTIN: {shopData.gstin}</Text>
          {shopData.upiId ? (
            <Text style={styles.text}>UPI: {shopData.upiId}</Text>
          ) : (
            <Text style={styles.text}>UPI: --</Text>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('GoogleMap', {
              shopCoordinate: shopData.shopCoordinate,
            })
          }
          style={styles.mapBtn}>
          <Feather name="map" size={17} color="#000" style={{marginLeft: 10}} />
          <Text style={styles.text2}>Check on map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => logout()}
          style={styles.logoutBtn}>
          <AntDesign
            name="poweroff"
            size={17}
            color="red"
            style={{marginLeft: 10}}
          />
          <Text style={styles.text2}>Logout</Text>
        </TouchableOpacity>
        {image && (
          <TouchableOpacity
            onPress={() => uploadImage()}
            activeOpacity={0.75}
            style={[utilStyles.button1, {marginTop: 30}]}>
            <Text style={{fontSize: 17, color: '#FFF'}}>Update Image</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <ActionSheet ref={actionSheetRef} gestureEnabled indicatorColor="#000">
        <View
          style={{
            height: height * 0.5,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
              navigation.navigate('ShopDetails');
            }}
            style={styles.actionSheetBtn}>
            <AntDesign
              name="edit"
              size={17}
              color="#000"
              style={styles.actionSheetIcon}
            />
            <Text style={styles.text2}>Change Shop Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.hide();
              navigation.navigate('GoogleMap');
            }}
            activeOpacity={0.5}
            style={styles.actionSheetBtn}>
            <AntDesign
              name="edit"
              size={17}
              color="#000"
              style={styles.actionSheetIcon}
            />
            <Text style={styles.text2}>Change Shop Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.hide();
              setModalVisible(true);
            }}
            activeOpacity={0.5}
            style={styles.actionSheetBtn}>
            <AntDesign
              name="edit"
              size={17}
              color="#000"
              style={styles.actionSheetIcon}
            />
            <Text style={styles.text2}>Upload/Change Shop Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.hide();
              navigation.navigate('Contact');
            }}
            activeOpacity={0.5}
            style={styles.actionSheetBtn}>
            <Feather
              name="message-square"
              size={17}
              color="#000"
              style={styles.actionSheetIcon}
            />
            <Text style={styles.text2}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      <ImagePickerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setImage={setImage}
      />
      {authLoading && <Loader />}
    </LinearGradient>
  );
};

const mapStateToProps = ({auth, shop}) => ({auth, shop});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      isAuthenticatedAction,
      updateShopImageDispatch,
      authLoadingAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyShop);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topCont: {
    backgroundColor: '#08121C',
    width: width,
    height: height * 0.3,
    elevation: 10,
  },
  topWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    marginVertical: 15,
    alignSelf: 'center',
    borderRadius: 100,
  },
  shopName: {
    color: '#AAA',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  category: {
    color: '#FFF',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  bottomCont: {
    backgroundColor: '#FFF',
    width: width,
    height: height * 0.25,
    marginTop: 20,
    elevation: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
  },
  text: {
    fontSize: 17,
    marginLeft: 20,
    marginTop: 10,
  },
  mapBtn: {
    backgroundColor: '#FFF',
    width: width,
    height: height * 0.08,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
  },
  logoutBtn: {
    backgroundColor: '#FFF',
    width: width,
    height: height * 0.08,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text2: {
    fontSize: 17,
    marginLeft: 10,
  },
  actionSheetBtn: {
    backgroundColor: '#FFF',
    width: width * 0.8,
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
    marginTop: 20,
  },
  actionSheetIcon: {
    marginLeft: 10,
    marginRight: 20,
  },
});
